import { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FiMoon, FiSun } from "react-icons/fi";

const DashboardNavbar = ({ theme, toggleTheme }) => {
  const { user, logout } = use(AuthContext);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from the dashboard.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, logout!",
      background: "var(--color-background)",
      color: "var(--color-text-body)",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "Logged Out!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "var(--color-background)",
          color: "var(--color-text-body)",
        });
      }
    });
  };

  return (
    <header className="h-20 bg-card  flex items-center justify-between px-6 sticky top-0 z-40 transition-colors duration-300">
      
      {/* --- Left Side --- */}
      <div className="flex items-center">
        {/* Mobile View Logo (Hidden on Desktop) */}
        <Link to="/" className=" lg:hidden flex items-center gap-2 group">
                   
                    <span className="text-2xl font-black tracking-tighter text-primary">
                      Club<span className="text-secondary">Sphere</span>
                    </span>
                  </Link>

        {/* Desktop View Welcome Message (Hidden on Mobile) */}
        <div className="hidden lg:block">
          <h4 className="text-text-heading text-primary font-bold text-lg leading-tight">
            Hello, {user?.displayName?.split(' ')[0] || "User"}!
          </h4>
          <p className="text-[10px] uppercase tracking-widest text-secondary text-text-body opacity-60 font-black">
            Welcome back to workspace
          </p>
        </div>
      </div>

      {/* --- Right Side: Actions --- */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Theme Toggle */}
        <button onClick={toggleTheme}
                        style={{ backgroundColor: "var(--color-accent-plaid)" }}
                        className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary transition-all active:scale-95">
                       {theme === "light" ? <FiMoon size={22} /> : <FiSun size={22} className="text-yellow-400" />}
                     </button>

        {/* User & Logout Section */}
        <div className="flex items-center gap-3 border-l border-primary/50 pl-3 sm:pl-4">
          <div className="hidden sm:block text-right">
             <p className="text-[11px] font-black text-primary uppercase tracking-tighter leading-none mb-1">
               {user?.role || 'Member'}
             </p>
          </div>
          <Link to="/dashboard/profile">
          <img
            src={user?.photoURL || "https://i.ibb.co/PB957Xh/user.png"}
            alt="Profile"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-primary/20 shadow-sm"
          /></Link>
          
          <button
            onClick={handleLogout}
            className="p-2.5 sm:p-3 rounded-xl bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition-all duration-300 shadow-sm group"
            title="Logout"
          >
            <FaSignOutAlt
              size={18}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;