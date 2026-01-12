import React, { use, useEffect, useState } from "react";
import { FiGrid, FiLogOut, FiMenu, FiMoon, FiSun, FiUser, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = use(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from the dashboard.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();

        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
    setIsOpen(false);
  };

  const goDashboardRoute = () => {
    const role = user?.role || "member";
    return `/dashboard/${role}/home`;
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold underline underline-offset-8 transition-all"
              : "hover:text-primary transition-all"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/clubs"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold underline underline-offset-8 transition-all"
              : "hover:text-primary transition-all"
          }
        >
          Clubs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold underline underline-offset-8 transition-all"
              : "hover:text-primary transition-all"
          }
        >
          Events
        </NavLink>
      </li>
        <li><NavLink to="/about"  className={({ isActive }) =>
            isActive
              ? "text-primary font-bold underline underline-offset-8 transition-all"
              : "hover:text-primary transition-all"
          }>About</NavLink></li>
          <li><NavLink to="/contact"  className={({ isActive }) =>
            isActive
              ? "text-primary font-bold underline underline-offset-8 transition-all"
              : "hover:text-primary transition-all"
          }>Contact</NavLink></li>
      {user && (
        <>
        
          <li><NavLink  to={goDashboardRoute()}  className={({ isActive }) =>
            isActive
              ? "text-primary font-bold underline underline-offset-8 transition-all"
              : "hover:text-primary transition-all"
          }>Dashboard</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar-glass sticky top-0 z-50  transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 overflow-visible ">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-black tracking-tighter text-primary"
            >
              Club<span className="text-secondary">Sphere</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8 items-center font-medium">{navLinks}</ul>
            <div className="flex items-center gap-4">
              <button onClick={toggleTheme} className="p-2 rounded-full bg-base-200 dark:bg-slate-800 text-xl transition-all active:scale-90">
                {theme === "light" ? <FiMoon className="text-slate-700" /> : <FiSun className="text-yellow-400" />}
              </button>
              {user ? (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-2 ring-offset-base-100"
                  >
                    <div className="w-10 rounded-full ">
                      <img
                        src={
                          user?.photoURL || "https://via.placeholder.com/150"
                        }
                        alt={user?.displayName || "User"}
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content absolute z-[110] menu p-2 shadow-2xl bg-base-100 rounded-xl w-60 mt-4 border border-base-content/10"
                  >
                    <li className="px-4 py-3 border-b border-base-content/10 mb-2">
                      <p className="font-bold text-primary truncate">{user?.displayName}</p>
                      <p className="text-xs opacity-60 truncate">{user?.email}</p>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/profile"
                        className="py-3 flex gap-3"
                      >
                        <FiUser className="text-lg" /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={goDashboardRoute()}
                        className="flex py-3 gap-3 "
                      >
                        <FiGrid /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex py-3 gap-3"
                      >
                        <FiLogOut /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-ghost btn-sm text-primary"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary-gradient btn-sm border-none shadow-lg"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          

        <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 text-xl">
              {theme === "light" ? <FiMoon /> : <FiSun className="text-yellow-400" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost btn-circle">
              {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-6 animate-in slide-in-from-top duration-300">
            <ul className="menu bg-base-200 rounded-2xl p-4 gap-2 font-semibold">
              {navLinks}
              {!user ? (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Link to="/login" className="btn btn-outline btn-primary btn-sm" onClick={() => setIsOpen(false)}>Login</Link>
                  <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setIsOpen(false)}>Register</Link>
                </div>
              ) : (
                <div className="mt-4 border-t border-base-content/10 pt-4">
                  <li><Link to={goDashboardRoute()} onClick={() => setIsOpen(false)}>Go to Dashboard</Link></li>
                  <li><button onClick={handleLogout} className="text-error">Logout</button></li>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
