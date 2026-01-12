import { use } from 'react';
import {
    FaHistory, FaChartLine, FaUsers, FaPlus, 
    FaCalendarCheck, FaHome, FaSignOutAlt, FaMoon, FaSun
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import NavLinkItem from '../dashboard/NavLinkItem';
import Swal from 'sweetalert2';
import { FiGrid } from 'react-icons/fi';

const SideNavbar = ({ theme, toggleTheme }) => {
    const { user, logout } = use(AuthContext); 
    const role = user?.role;
    
    const isAdminOrOrganizer = role === 'admin' || role === 'clubManager';
    const isAdmin = role === 'admin';
    const isManager = role === 'clubManager'; 
    const isMember = role === 'member';

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out from the dashboard.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7C3AED",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log me out!"
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                Swal.fire({
                    title: "Logged Out!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    return (
        <nav className="flex flex-col h-[calc(100vh-140px)] justify-between">
            <div className="space-y-1 overflow-y-auto custom-scrollbar pr-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 px-3 opacity-70">
                    {role ? `${role} Space` : 'Dashboard'}
                </div>

                <NavLinkItem to={`/dashboard/${role}/home`} icon={FiGrid}>
                    Overview
                </NavLinkItem>
                
                {isMember && (
                    <NavLinkItem to="/dashboard/member/clubs" icon={FaCalendarCheck}>
                        My Memberships
                    </NavLinkItem>
                )}

                {isAdminOrOrganizer && (
                    <>
                        <div className="pt-4 pb-2 px-3 text-[10px] font-bold uppercase opacity-50 dark:text-gray-400">Management</div>
                        {isManager && (
                            <>
                                <NavLinkItem to="/dashboard/clubManager/myClubs" icon={FaChartLine}>My Clubs</NavLinkItem>
                                <NavLinkItem to="/dashboard/clubManager/createClub" icon={FaPlus}>Create New Club</NavLinkItem>
                                <NavLinkItem to="/dashboard/clubManager/events" icon={FaCalendarCheck}>Manage Events</NavLinkItem>
                            </>
                        )}
                        {isAdmin && (
                            <NavLinkItem to="/dashboard/admin/clubs" icon={FaChartLine}>Manage All Clubs</NavLinkItem>
                        )}
                    </>
                )}

                {isAdmin && (
                    <>
                        <div className="pt-4 pb-2 px-3 text-[10px] font-bold uppercase opacity-50 dark:text-gray-400">Administration</div>
                        <NavLinkItem to="/dashboard/admin/users" icon={FaUsers}>Manage Users</NavLinkItem>
                        <NavLinkItem to="/dashboard/admin/payments" icon={FaHistory}>All Payments</NavLinkItem>
                    </>
                )}

                {isMember && (
                    <>
                        <div className="pt-4 pb-2 px-3 text-[10px] font-bold uppercase opacity-50 dark:text-gray-400">Personal</div>
                        <NavLinkItem to="/dashboard/member/payments" icon={FaHistory}>Payment History</NavLinkItem>
                        <NavLinkItem to="/dashboard/member/events" icon={FaCalendarCheck}>My Events</NavLinkItem>
                    </>
                )}
            </div>

            <div className="pt-6 border-t border-base-content/10 space-y-2">
                <button 
                    onClick={toggleTheme}
                    className="flex items-center w-full p-3 rounded-xl transition-all duration-300 bg-base-300 dark:bg-slate-800 text-base-content hover:bg-primary hover:text-white font-medium"
                >
                    {theme === "light" ? (
                        <><FaMoon className="mr-3" /> Dark Mode</>
                    ) : (
                        <><FaSun className="mr-3 text-yellow-400" /> Light Mode</>
                    )}
                </button>

                <NavLinkItem to="/" icon={FaHome}>Main Website</NavLinkItem>
                
                <button 
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 rounded-xl transition-all duration-200 text-error hover:bg-error hover:text-white font-bold"
                >
                    <FaSignOutAlt className="w-5 h-5 mr-3" />
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default SideNavbar;