import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { use, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useImageUploadMutations from "../hooks/useImageUploadMutations";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { 
        register: registerUser, 
        googleLogin,             
        loading,
        setUser
    } = use(AuthContext);
    
    const imageMotation = useImageUploadMutations();
    const { mutateAsync, isPending } = imageMotation;

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const overallLoading = loading || isPending;

    const onSubmit = async (data) => {
        const { name, image, email, password } = data;
        const imagefile = image[0];

        try {
            const imageURL = await mutateAsync(imagefile);
            const result = await registerUser(email, password, name, imageURL); 

            if (result.user && setUser) {
                 setUser({
                    ...result.user,
                    displayName: name,
                    photoURL: imageURL,
                });
            }

            toast.success("Signup Successful");
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err);
            toast.error(err?.message || "Registration Failed");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleLogin();
            navigate(from, { replace: true });
            toast.success("Signup Successful");
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen py-12 px-4 bg-[var(--color-bg-light)] text-[var(--color-text-light)]">
            <div className="card w-full max-w-md shadow-2xl bg-[var(--color-card-bg)]">
                <div className="card-body">
                    <div className="mb-8 text-center">
                        <h2 >
                            Join ClubSphere
                        </h2>
                        <p className="text-sm text-[var(--color-text-muted)]">
                            Create your account to get started
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate=""
                        action=""
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm text-[var(--color-text-light)] font-semibold"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autocomplete="name"
                                    {...register("name", {
                                        required: "Name is required",
                                        maxLength: {
                                            value: 20,
                                            message: "Name maximum 20 characters",
                                        },
                                    })}
                                    placeholder="Enter Your Name Here"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[var(--color-primary-accent)] bg-[var(--color-card-bg)] text-[var(--color-text-light)]"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-[var(--color-error)] text-sm">{errors.name?.message}</p>
                            )}

                            <div>
                                <label
                                    htmlFor="image"
                                    className="block mb-2 text-sm font-semibold text-[var(--color-text-light)]"
                                >
                                    Profile Image
                                </label>
                                <input
                                    name="image"
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    {...register("image", {
                                        required: "Profile image is required",
                                    })}
                                    className="block w-full text-sm text-[var(--color-text-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-primary-accent)]/10 file:text-[var(--color-primary-accent)] hover:file:bg-[var(--color-primary-accent)]/20 bg-[var(--color-card-bg)] border border-dashed border-[var(--color-primary-accent)]/50 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-accent)] py-2"
                                />
                                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                    PNG, JPG or JPEG (max 2MB)
                                </p>
                            </div>
                            {errors.image && (
                                <p className="text-[var(--color-error)] text-sm">
                                    {errors.image?.message}
                                </p>
                            )}

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm text-[var(--color-text-light)] font-semibold"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    autocomplete="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Email must be valid",
                                        },
                                    })}
                                    placeholder="Enter Your Email Here"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[var(--color-primary-accent)] bg-[var(--color-card-bg)] text-[var(--color-text-light)]"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-[var(--color-error)] text-sm">
                                    {errors.email?.message}
                                </p>
                            )}

                            <div>
                                <div className="flex justify-between">
                                    <label
                                        htmlFor="password"
                                        className="text-sm mb-2 text-[var(--color-text-light)] font-semibold"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        autoComplete="new-password"
                                        id="password"
                                        placeholder="*******"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters",
                                            },
                                            pattern: {
                                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/,
                                                message:
                                                    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                                            },
                                        })}
                                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[var(--color-primary-accent)] bg-[var(--color-card-bg)] text-[var(--color-text-light)] pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-primary-accent)]"
                                    >
                                        {showPassword ? (
                                            <FiEyeOff size={18} />
                                        ) : (
                                            <FiEye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {errors.password && (
                                <p className="text-[var(--color-error)] text-sm">
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={overallLoading}
                                className="w-full rounded-md py-3 text-white bg-[var(--color-primary-accent)] hover:bg-[#1E40AF] disabled:opacity-50 flex items-center justify-center transition"
                            >
                                {overallLoading ? (
                                    <TbFidgetSpinner className="animate-spin text-xl" />
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center pt-4 space-x-1">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <p className="px-3 text-sm text-[var(--color-text-muted)]">
                            Signup with social accounts
                        </p>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
                    <div
                        onClick={handleGoogleSignIn}
                        className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded-md cursor-pointer hover:bg-[var(--color-secondary-action)]/10 transition"
                    >
                        <FcGoogle size={32} />
                        <p>Continue with Google</p>
                    </div>
                    <p className="px-6 text-sm text-center text-[var(--color-text-muted)]">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-[var(--color-primary-accent)] font-semibold hover:underline transition"
                        >
                            Login
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;