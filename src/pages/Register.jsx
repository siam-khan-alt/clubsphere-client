import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock, FiUploadCloud } from "react-icons/fi";
import { use, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useImageUploadMutations from "../hooks/useImageUploadMutations";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register: registerUser, googleLogin, loading, setUser } = use(AuthContext);
    const { mutateAsync, isPending } = useImageUploadMutations();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const selectedFile = watch("image");
    const overallLoading = loading || isPending;

    const onSubmit = async (data) => {
        const { name, image, email, password } = data;
        try {
            const imageURL = await mutateAsync(image[0]);
            const result = await registerUser(email, password, name, imageURL); 
            if (result.user && setUser) {
                 setUser({ ...result.user, displayName: name, photoURL: imageURL });
            }
            toast.success("Signup Successful");
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(err?.message || "Registration Failed");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleLogin();
            navigate(from, { replace: true });
            toast.success("Signup Successful");
        } catch (err) {
            toast.error(err?.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-base-200 dark:bg-base-300 transition-colors duration-300">
            <div className="card w-full max-w-md shadow-2xl bg-base-100 dark:bg-slate-900 border border-base-content/5">
                <div className="card-body p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-black text-base-content tracking-tight">Join ClubSphere</h2>
                        <p className="text-base-content/60 text-sm mt-2 font-medium">Create your account to get started</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="label py-1">
                                <span className="text-xs font-black uppercase tracking-widest text-base-content/50">Full Name</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center text-base-content/30"><FiUser /></span>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className={`input input-bordered w-full pl-10 rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-primary/20 ${errors.name ? 'border-error' : 'border-base-content/10'}`}
                                    {...register("name", { required: "Name is required" })}
                                />
                            </div>
                            {errors.name && <p className="text-error text-[10px] font-bold mt-1 uppercase">{errors.name.message}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="text-xs font-black uppercase tracking-widest text-base-content/50">Profile Image</span>
                            </label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    {...register("image", { required: "Image is required" })}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    accept="image/*"
                                />
                                <div className={`p-4 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-1 ${errors.image ? 'border-error bg-error/5' : 'border-base-content/10 bg-base-200/30 group-hover:border-primary/40 group-hover:bg-primary/5'}`}>
                                    <FiUploadCloud className={`text-xl ${errors.image ? 'text-error' : 'text-primary animate-bounce'}`} />
                                    <span className="text-[10px] font-black uppercase tracking-tighter text-base-content/60 text-center">
                                        {selectedFile?.[0] ? selectedFile[0].name : "Click to upload photo"}
                                    </span>
                                </div>
                            </div>
                            {errors.image && <p className="text-error text-[10px] font-bold mt-1 uppercase text-center">{errors.image.message}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="text-xs font-black uppercase tracking-widest text-base-content/50">Email Address</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center text-base-content/30"><FiMail /></span>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className={`input input-bordered w-full pl-10 rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-error' : 'border-base-content/10'}`}
                                    {...register("email", { required: "Email is required" })}
                                />
                            </div>
                            {errors.email && <p className="text-error text-[10px] font-bold mt-1 uppercase">{errors.email.message}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="text-xs font-black uppercase tracking-widest text-base-content/50">Password</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center text-base-content/30"><FiLock /></span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className={`input input-bordered w-full pl-10 pr-12 rounded-xl bg-base-200/50 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-primary/20 ${errors.password ? 'border-error' : 'border-base-content/10'}`}
                                    {...register("password", { 
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Min 6 characters" }
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-base-content/40 hover:text-primary transition-colors"
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-error text-[10px] font-bold mt-1 uppercase">{errors.password.message}</p>}
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary w-full rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 mt-4"
                            disabled={overallLoading}
                        >
                            {overallLoading ? <TbFidgetSpinner className="animate-spin text-xl" /> : 'Create Account'}
                        </button>
                    </form>

                    <div className="divider text-[10px] font-black uppercase tracking-[0.3em] text-base-content/30 my-6">OR</div>

                    <button 
                        onClick={handleGoogleSignIn} 
                        className="btn btn-outline w-full rounded-xl border-base-content/10 font-bold hover:bg-base-content/5 text-base-content shadow-sm"
                        disabled={overallLoading}
                    >
                        <FcGoogle size={22} />
                        Continue with Google
                    </button>

                    <p className="text-center mt-8 text-sm font-bold text-base-content/60">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:underline underline-offset-4 decoration-2">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;