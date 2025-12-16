import React, { use, useState } from "react";
import { FiGrid, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = use(AuthContext);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const goDashboardRoute = () => {
    const role = user?.role || 'member';
    return `/dashboard/${role}/home`;
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[var(--color-primary-accent)] font-semibold"
              : "text-[var(--color-text-light)] hover:text-[var(--color-primary-accent)]"
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
              ? "text-[var(--color-primary-accent)] font-semibold"
              : "text-[var(--color-text-light)] hover:text-[var(--color-primary-accent)]"
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
              ? "text-[var(--color-primary-accent)] font-semibold"
              : "text-[var(--color-text-light)] hover:text-[var(--color-primary-accent)]"
          }
        >
          Events
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="shadow-md sticky top-0 z-50 bg-[var(--color-bg-light)]">
      <div className=" px-4 ">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-[var(--color-primary-accent)] hover:text-[var(--color-primary-accent)] transition"
            >
              ClubSphere
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6 items-center">{navLinks}</ul>
            <div className="flex items-center gap-3">
              {user ? (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full ring ring-[var(--color-primary-accent)] ring-offset-[var(--color-bg-light)] ring-offset-2">
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
                    className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content rounded-box w-52 bg-[var(--color-card-bg)] text-[var(--color-text-light)] border border-gray-100"
                  >
                    <li className="menu-title">
                      <span className="font-semibold">{user?.displayName}</span>
                      </li>
                    <div className="divider my-0"></div>
                    <li>
                      <Link
                        to={goDashboardRoute()}
                        className="flex items-center gap-2 hover:text-[var(--color-primary-accent)]"
                      >
                        <FiGrid /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-[var(--color-error)]"
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
                    className="btn btn-ghost btn-sm text-[var(--color-text-light)] hover:bg-[var(--color-primary-accent)]/10"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-sm text-white bg-[var(--color-primary-accent)] hover:bg-[#1E40AF]"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            {user && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-8 rounded-full">
                    <img
                      src={user?.photoURL || "https://via.placeholder.com/150"}
                      alt={user?.displayName || "User"}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-[var(--color-card-bg)] text-[var(--color-text-light)] border border-gray-100"
                >
                  <li className="menu-title">
                    <span>{user?.displayName}</span>
                  </li>
                  <li>
                    <Link
                      to={goDashboardRoute()}
                      className="hover:text-[var(--color-primary-accent)]"
                    >
                      <FiGrid /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-[var(--color-error)]">
                      <FiLogOut /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-ghost btn-circle text-[var(--color-text-light)]"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <ul className="space-y-2">{navLinks}</ul>

            {!user && (
              <div className="flex flex-col gap-2 mt-4">
                <Link
                  to="/login"
                  className="btn btn-ghost btn-sm w-full text-[var(--color-text-light)] hover:bg-[var(--color-primary-accent)]/10"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-sm w-full text-white bg-[var(--color-primary-accent)] hover:bg-[#1E40AF]"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;