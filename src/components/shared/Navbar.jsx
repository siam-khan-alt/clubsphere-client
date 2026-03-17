import React, { use, useEffect, useState } from "react";
import {
  FiGrid,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSun,
  FiUser,
  FiX,
} from "react-icons/fi";
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

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const role = user?.role || "member";

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Logout",
      background: "var(--color-background)",
      color: "var(--color-text-body)",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        setIsOpen(false);
      }
    });
  };

  const navLinks = (
    <>
      {["Home", "Clubs", "Events", "About", "Contact"].map((item) => (
        <li key={item}>
          <NavLink
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `relative px-5 py-2 transition-all duration-300 font-semibold rounded-xl ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-slate-600 dark:text-slate-300 hover:text-primary"
              }`
            }
          >
            {item}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <nav
      style={{ backgroundColor: "var(--color-background)" }}
      className="sticky top-0 z-[100] py-4 "
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-xl">C</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-primary">
              Club<span className="text-secondary">Sphere</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-1">{navLinks}</ul>

            <div className="flex items-center gap-4 border-l border-primary/50 pl-6">
              <button
                onClick={toggleTheme}
                style={{ backgroundColor: "var(--color-accent-plaid)" }}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary transition-all active:scale-95"
              >
                {theme === "light" ? (
                  <FiMoon size={20} />
                ) : (
                  <FiSun size={20} className="text-yellow-400" />
                )}
              </button>

              {user ? (
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="cursor-pointer">
                    <div
                      className="avatar  "
                      style={{
                        "--tw-ring-offset-color": "var(--color-background)",
                      }}
                    >
                      <div className="w-10 rounded-full">
                        <img
                          src={
                            user?.photoURL ||
                            "https://i.ibb.co/m0p99m8/user.png"
                          }
                          alt="User"
                        />
                      </div>
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    style={{ backgroundColor: "var(--color-card)" }}
                    className="dropdown-content menu p-2 mt-4 shadow-2xl rounded-2xl w-64 border border-slate-100 dark:border-slate-800"
                  >
                    <div className="px-4 py-3 mb-2 bg-primary/5 rounded-xl">
                      <p className="font-bold text-primary truncate text-sm">
                        {user?.displayName}
                      </p>
                      <p
                        className="text-[11px] opacity-70 truncate"
                        style={{ color: "var(--color-text-body)" }}
                      >
                        {user?.email}
                      </p>
                    </div>
                    <li>
                      <Link
                        to="/dashboard/profile"
                        className="rounded-lg py-2.5 hover:bg-primary/10"
                      >
                        <FiUser className="text-primary" /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/dashboard/${role}/home`}
                        className="rounded-lg py-2.5 hover:bg-primary/10"
                      >
                        <FiGrid className="text-primary" /> Dashboard
                      </Link>
                    </li>
                    <div className="my-1 border-t border-slate-100 dark:border-slate-800"></div>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="rounded-lg py-2.5 text-error hover:bg-red-500/10"
                      >
                        <FiLogOut /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="btn-primary-gradient">
                  Join Now
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              style={{ backgroundColor: "var(--color-accent-plaid)" }}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary transition-all active:scale-95"
            >
              {theme === "light" ? (
                <FiMoon size={22} />
              ) : (
                <FiSun size={22} className="text-yellow-400" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary p-2 bg-primary/5 rounded-lg"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`fixed inset-0 bg-slate-950/70 lg:hidden transition-all duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{ backgroundColor: "var(--color-background)" }}
            className={`absolute right-0 top-0 h-full w-[280px] p-8 shadow-2xl transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-10">
              <span className="font-black text-xl text-primary">MENU</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-primary"
              >
                <FiX size={20} />
              </button>
            </div>
            <ul className="flex flex-col gap-4">
              {navLinks}
              {user && (
                <>
                  <div className="my-2 border-t border-slate-100 dark:border-slate-800 opacity-50"></div>
                  <li>
                    <NavLink
                      to={`/dashboard/${role}/home`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-5 py-2 font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-all"
                    >
                      <FiGrid className="text-primary" /> Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-5 py-2 font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-all"
                    >
                      <FiUser className="text-primary" /> My Profile
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            <div className="absolute bottom-10 left-8 right-8">
              {!user ? (
                <div className="flex flex-col gap-3">
                  {/* Login Button */}
                  <Link
                    to="/login"
                    className="btn-outline-custom"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>

                  {/* Register Button */}
                  <Link
                    to="/register"
                    className="btn-primary-gradient w-full block text-center shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Create Account
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full py-3.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-error font-bold flex items-center justify-center gap-2"
                >
                  <FiLogOut /> Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
