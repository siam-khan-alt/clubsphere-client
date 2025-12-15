import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast'; 

const Login = () => {
    const { login, googleLogin, loading: authLoading } = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const from = location.state?.from?.pathname || '/';

    const onSubmit = async (data) => {
        setError('');
        setLoading(true);
        
        try {
            await login(data.email, data.password);
            toast.success("Login Successful!");
            navigate(from, { replace: true });
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('No user found with this email');
            } else if (error.code === 'auth/wrong-password') {
                setError('Incorrect password');
            } else if (error.code === 'auth/invalid-email') {
                setError('Invalid email address');
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        
        try {
            await googleLogin();
            toast.success("Login Successful!");
            navigate(from, { replace: true });
        } catch {
            setError('Google login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = loading || authLoading;

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-[var(--color-bg-light)]">
            <div className="card w-full max-w-md shadow-2xl bg-[var(--color-card-bg)] text-[var(--color-text-light)]">
                <div className="card-body">
                    <div className="text-center mb-6">
                        <h2 >Welcome Back!</h2>
                        <p className="text-[var(--color-text-muted)] mt-2">Login to continue to ClubSphere</p>
                    </div>
                    {error && (
                        <div className="alert bg-[var(--color-error)] border-0 text-white mb-4">
                            <span>{error}</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-[var(--color-text-light)]">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className={`input input-bordered w-full bg-[var(--color-card-bg)] border border-gray-300 text-[var(--color-text-light)] ${errors.email ? 'input-error' : ''}`}
                                {...register('email', { 
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                            />
                            {errors.email && (
                                <label className="label">
                                    <span className="label-text-alt text-[var(--color-error)]">{errors.email.message}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-[var(--color-text-light)]">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className={`input input-bordered w-full pr-10 bg-[var(--color-card-bg)] border border-gray-300 text-[var(--color-text-light)] ${errors.password ? 'input-error' : ''}`}
                                    {...register('password', { 
                                        required: 'Password is required'
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle text-[var(--color-text-muted)]"
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <label className="label">
                                    <span className="label-text-alt text-[var(--color-error)]">{errors.password.message}</span>
                                </label>
                            )}
                        </div>

                        <div className="text-right">
                            <a href="#" className="text-sm link text-[var(--color-primary-accent)]">
                                Forgot Password?
                            </a>
                        </div>

                        <button 
                            type="submit" 
                            className={`btn w-full text-white bg-[var(--color-primary-accent)] hover:bg-[#1E40AF] border-0 ${isDisabled ? 'loading' : ''}`}
                            disabled={isDisabled}
                        >
                            {isDisabled ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="divider text-[var(--color-text-muted)]">OR</div>

                    <button 
                        onClick={handleGoogleLogin} 
                        className="btn btn-outline w-full border-gray-300 text-[var(--color-text-light)] hover:bg-[var(--color-secondary-action)]/10 hover:border-[var(--color-secondary-action)]"
                        disabled={isDisabled}
                    >
                        <FcGoogle className="text-2xl" />
                        Continue with Google
                    </button>

                    <p className="text-center mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="link text-[var(--color-primary-accent)] font-semibold">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;