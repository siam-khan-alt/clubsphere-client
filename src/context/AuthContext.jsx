import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const idToken = await firebaseUser.getIdToken();
          setToken(idToken);

          // Fetch user role from backend
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/role`, {
            headers: { Authorization: `Bearer ${idToken}` }
          });
          setRole(response.data.role);
        } catch (error) {
          console.error("Error fetching user role:", error);
          setRole("member"); // Default to member if role fetch fails
        }
      } else {
        setUser(null);
        setRole(null);
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getFirebaseToken = async () => {
    if (!user) return null;
    try {
      const idToken = await user.getIdToken(true); // Force refresh
      setToken(idToken);
      return idToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  const refreshRole = async () => {
    if (user) {
      try {
        const idToken = await user.getIdToken();
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/role`, {
          headers: { Authorization: `Bearer ${idToken}` }
        });
        setRole(response.data.role);
      } catch (error) {
        console.error("Error refreshing role:", error);
      }
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setRole(null);
      setToken(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Helper functions for role checking
  const isAdmin = role === "admin";
  const isManager = role === "clubManager";
  const isMember = role === "member";

  const value = {
    user,
    role,
    loading,
    token,
    logout,
    getFirebaseToken,
    refreshRole,
    isAdmin,
    isManager,
    isMember,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthContext;



