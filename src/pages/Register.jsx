import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiMail,
  FiLock,
  FiUploadCloud,
} from "react-icons/fi";
import { use, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useImageUploadMutations from "../hooks/useImageUploadMutations";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register: registerUser,
    googleLogin,
    loading,
    setUser,
  } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { mutateAsync, isPending } = useImageUploadMutations();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const selectedFile = watch("image");
  const overallLoading = loading || isPending;

  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    try {
      const imageURL = await mutateAsync(image[0]);
      const result = await registerUser(email, password, name, imageURL);
      const token = await result.user.getIdToken();

      const response = await axiosSecure.get("/users/role", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userRole = response?.data?.role || "user";

      if (setUser) {
        setUser({ ...result.user, displayName: name, photoURL: imageURL });
      }

      toast.success("Signup Successful");
      navigate(`/dashboard/${userRole}/home`, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Registration Failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleLogin();

      const token = await result.user.getIdToken();

      const response = await axiosSecure.get("/users/role", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userRole = response?.data?.role || "user";

      toast.success("Signup Successful");

      navigate(`/dashboard/${userRole}/home`, { replace: true });
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center py-12 px-4 transition-colors duration-300">
      {/* Background Decor from Global Styles */}
      <div className="plaid-bg absolute inset-0 opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card rounded-2xl border-standard shadow-xl overflow-hidden">
          <div className="p-8 md:p-10">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h2 className="!text-4xl !mb-2 leading-tight">
                Join <span className="not-italic">ClubSphere</span>
              </h2>
              <p className="text-text-body font-medium opacity-70 text-sm">
                Create your account to get started
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-heading ml-1 opacity-60">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-text-body/40">
                    <FiUser size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className={`input-field-custom w-full pl-12 ${
                      errors.name ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    {...register("name", { required: "Name is required" })}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-[10px] font-bold mt-1 uppercase ml-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Profile Image Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-heading ml-1 opacity-60">
                  Profile Image
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    {...register("image", { required: "Image is required" })}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    accept="image/*"
                  />
                  <div
                    className={`p-5 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 
                                        ${
                                          errors.image
                                            ? "border-red-500 bg-red-500/5"
                                            : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 group-hover:border-primary/50 group-hover:bg-primary/5"
                                        }`}
                  >
                    <FiUploadCloud
                      className={`text-2xl ${
                        errors.image
                          ? "text-red-500"
                          : "text-primary animate-pulse"
                      }`}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-tight text-text-body/60 text-center">
                      {selectedFile?.[0]
                        ? selectedFile[0].name
                        : "Click to upload photo"}
                    </span>
                  </div>
                </div>
                {errors.image && (
                  <p className="text-red-500 text-[10px] font-bold mt-1 uppercase text-center">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-heading ml-1 opacity-60">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-text-body/40">
                    <FiMail size={18} />
                  </span>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className={`input-field-custom w-full pl-12 ${
                      errors.email ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-[10px] font-bold mt-1 uppercase ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-heading ml-1 opacity-60">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-text-body/40">
                    <FiLock size={18} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`input-field-custom w-full pl-12 pr-12 ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Min 6 characters" },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-text-body/40 hover:text-primary transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[10px] font-bold mt-1 uppercase ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary-gradient w-full flex items-center justify-center gap-2 mt-4"
                disabled={overallLoading}
              >
                {overallLoading ? (
                  <TbFidgetSpinner className="animate-spin text-xl" />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="relative my-8 text-center">
              <hr className="border-primary/50" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-[10px] font-black uppercase tracking-[0.3em] text-text-body/40">
                OR
              </span>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border-standard font-bold text-text-heading transition-all shadow-sm disabled:opacity-50"
              disabled={overallLoading}
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>

            <p className="text-center mt-10 text-sm font-bold text-text-body/60">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline underline-offset-4 decoration-2 transition-all"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
