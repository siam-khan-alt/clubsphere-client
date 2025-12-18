import { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserRoleAndSet = async (currentUser) => {
        if (!currentUser) return;
        
        try {
            const token = await currentUser.getIdToken(); 
            
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/role`, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                },
            });

            const userWithRole = { 
                ...currentUser, 
                role: response.data.role 
            };

            setUser(userWithRole);

        } catch (error) {
            console.error("Error fetching user role:", error.response?.data || error.message);
            
            setUser(currentUser); 
        } finally {
            setLoading(false); 
        }
    };
    const getFirebaseToken = async () => {
        const firebaseUser = auth.currentUser;
        if (firebaseUser) {
            return await firebaseUser.getIdToken();
        }
        return null;
    }
    const register = async (email, password, name, photoURL) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            
            await updateProfile(result.user, {
                displayName: name,
                photoURL: photoURL
            });
            const userInfo = {
                name: name,
                email: email,
                photoURL: photoURL,
            };
            await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, userInfo);

            return result;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    };
        
    const updateUser = async (name, photoURL) => {
    setLoading(true);
    try {
        await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        });

        await axios.patch(`${import.meta.env.VITE_API_URL}/users/update`, {
            email: user?.email, 
            name: name,
            photoURL: photoURL
        });

        setUser(prev => ({
            ...prev,
            displayName: name,
            photoURL: photoURL
        }));

    } catch (error) {
        console.error("Update error:", error);
        throw error;
    } finally {
        setLoading(false);
    }
};
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
           await fetchUserRoleAndSet(currentUser); }
           else{
            setUser(null);
            setLoading(false);}
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        register,
        login,
        googleLogin,
        logout,
        setUser,
        getFirebaseToken,
        updateUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};