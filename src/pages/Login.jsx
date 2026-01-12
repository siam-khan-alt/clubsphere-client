import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiUser, FiShield } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast'; 
import { TbFidgetSpinner } from 'react-icons/tb';

const Login = () => {
    const { login, googleLogin, loading: authLoading } = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const from = location.state?.from?.pathname || '/';

    const handleDemoLogin = (role) => {
        if (role === 'user') {
            setValue('email', 'adnan@gmail.com');
            setValue('password', 'Siam12');
        } else if (role === 'manager') {
            setValue('email', 'sifatkhan@gmail.com');
            setValue('password', 'Siam12');
        }
        toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} credentials applied!`);
    };

    const onSubmit = async (data) => {
        setError('');
        setLoading(true);
        try {
            await login(data.email, data.password);
            toast.success("Login Successful!");
            navigate(from, { replace: true });
        } catch (error) {
            setError(error.message || 'Login failed. Please try again.');
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
        <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-base-200 dark:bg-base-300 transition-colors duration-300">
            <div className="card w-full max-w-md shadow-2xl bg-base-100 dark:bg-slate-900 border border-base-content/5">
                <div className="card-body p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-black text-base-content tracking-tight">Welcome Back!</h2>
                        <p className="text-base-content/60 text-sm mt-2 font-medium">Login to continue to ClubSphere</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button 
                            onClick={() => handleDemoLogin('user')}
                            className="flex flex-col items-center gap-1 py-3 px-2 rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary hover:bg-primary/5 transition-all group"
                        >
                            <FiUser className="text-primary group-hover:scale-110 transition-transform" size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-base-content/70">User Demo</span>
                        </button>
                        <button 
                            onClick={() => handleDemoLogin('manager')}
                            className="flex flex-col items-center gap-1 py-3 px-2 rounded-2xl border-2 border-dashed border-secondary/30 hover:border-secondary hover:bg-secondary/5 transition-all group"
                        >
                            <FiShield className="text-secondary group-hover:scale-110 transition-transform" size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-base-content/70">Manager Demo</span>
                        </button>
                    </div>

                    {error && (
                        <div className="p-3 rounded-xl bg-error/10 border border-error/20 text-error text-xs font-bold mb-4 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="label py-1">
                                <span className="text-xs font-black uppercase tracking-widest text-base-content/50">Email Address</span>
                            </label>
                            <input
                                type="email"
                                placeholder="demo@example.com"
                                className={`input input-bordered w-full rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-error' : 'border-base-content/10'}`}
                                {...register('email', { required: 'Email is required' })}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="text-xs font-black uppercase tracking-widest text-base-content/50">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className={`input input-bordered w-full rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold pr-12 focus:ring-2 focus:ring-primary/20 ${errors.password ? 'border-error' : 'border-base-content/10'}`}
                                    {...register('password', { required: 'Password is required' })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-base-content/40 hover:text-primary transition-colors"
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary w-full rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 mt-2"
                            disabled={isDisabled}
                        >
                            {isDisabled ? <TbFidgetSpinner className="animate-spin text-xl" /> : 'Sign In'}
                        </button>
                    </form>

                    <div className="divider text-[10px] font-black uppercase tracking-[0.3em] text-base-content/30 my-6">OR</div>

                    <button 
                        onClick={handleGoogleLogin} 
                        className="btn btn-outline w-full rounded-xl border-base-content/10 font-bold hover:bg-base-content/5 text-base-content shadow-sm"
                        disabled={isDisabled}
                    >
                        <FcGoogle size={22} />
                        Continue with Google
                    </button>

                    <p className="text-center mt-8 text-sm font-bold text-base-content/60">
                        New to ClubSphere?{' '}
                        <Link to="/register" className="text-primary hover:underline underline-offset-4 decoration-2">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;