import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiUser, FiShield, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Login = () => {
  const { login, googleLogin, loading: authLoading } = use(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleDemoLogin = (role) => {
    if (role === "user") {
      setValue("email", "adnan@gmail.com");
      setValue("password", "Siam12");
    } else if (role === "manager") {
      setValue("email", "sifatkhan@gmail.com");
      setValue("password", "Siam12");
    } else if (role === "admin") {
      setValue("email", "spsiam99@gmail.com");
      setValue("password", "Sp999999");
    }
    toast.success(
      `${role.charAt(0).toUpperCase() + role.slice(1)} credentials applied!`
    );
  };

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      const result = await login(data.email, data.password);

      const token = await result.user.getIdToken();

      const response = await axiosSecure.get("/users/role", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userRole = response?.data?.role;

      if (userRole) {
        toast.success("Login Successful!");
        navigate(`/dashboard/${userRole}/home`, { replace: true });
      } else {
        setError("User role not found in database.");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await googleLogin();
      const token = await result.user.getIdToken();

      const response = await axiosSecure.get("/users/role", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userRole = response?.data?.role;

      if (userRole) {
        toast.success("Login Successful!");

        const dynamicPath = `/dashboard/${userRole}/home`;
        const destination = location.state?.from?.pathname || dynamicPath;
        navigate(destination, { replace: true });
      } else {
        setError("Role not assigned to this Google account.");
      }
    } catch {
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || authLoading;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center py-12 px-4 transition-colors duration-300">
      {/* Global Background Decoration */}
      <div className="plaid-bg absolute inset-0 opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card rounded-2xl border-standard shadow-xl overflow-hidden">
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="!text-4xl !mb-2 !text-left md:!text-center leading-tight">
                Welcome <span className="not-italic">Back!</span>
              </h2>
              <p className="text-text-body font-medium opacity-70 text-sm">
                Login to continue to ClubSphere
              </p>
            </div>

            {/* Demo Credentials Section */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { role: "user", icon: FiUser, label: "User", color: "primary" },
                {
                  role: "manager",
                  icon: FiShield,
                  label: "Manager",
                  color: "secondary",
                },
                {
                  role: "admin",
                  icon: FiLock,
                  label: "Admin",
                  color: "primary",
                },
              ].map((item) => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => handleDemoLogin(item.role)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border border-dashed border-${item.color}/30 hover:border-${item.color} hover:bg-${item.color}/5 transition-all group`}
                >
                  <item.icon
                    className={`text-${item.color} group-hover:scale-110 transition-transform`}
                    size={18}
                  />
                  <span className="text-[9px] font-black uppercase tracking-widest text-text-heading/70">
                    {item.label} Demo
                  </span>
                </button>
              ))}
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold mb-6 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-heading ml-1 opacity-60">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="demo@example.com"
                  className={`input-field-custom ${
                    errors.email ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-[10px] text-red-500 font-bold ml-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-heading ml-1 opacity-60">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`input-field-custom w-full pr-12 ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-body/40 hover:text-primary transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-[10px] text-red-500 font-bold ml-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="btn-primary-gradient w-full flex items-center justify-center gap-2 mt-2"
                disabled={isDisabled}
              >
                {isDisabled ? (
                  <TbFidgetSpinner className="animate-spin text-xl" />
                ) : (
                  "Sign In"
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
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border-standard font-bold text-text-heading  transition-all shadow-sm"
              disabled={isDisabled}
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>

            <p className="text-center mt-10 text-sm font-bold text-text-body/60">
              New to ClubSphere?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline underline-offset-4 decoration-2 transition-all"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
