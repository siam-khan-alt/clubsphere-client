import { use } from 'react';
import {
    FaUser,
    FaHistory,
    FaChartLine,
    FaUsers,
    FaPlus,
    FaCalendarCheck,
    FaHome,
    FaSignOutAlt,
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import NavLinkItem from '../dashboard/NavLinkItem';

const SideNavbar = () => {
    const { user, logout } = use(AuthContext); 
    const role = user?.role;
    
    const isAdminOrOrganizer = role === 'admin' || role === 'clubManager';
    const isAdmin = role === 'admin';
    const isManager = role === 'clubManager'; 
    const isMember = role === 'member';

    return (
        <nav className="space-y-2">
            <div className="text-sm font-bold uppercase text-[var(--color-primary-accent)] mb-4">
                {role ? `${role.toUpperCase()} DASHBOARD` : 'DASHBOARD'}
            </div>

            <h4 className=" uppercase  mt-4 pt-4 border-t border-gray-200">General</h4>
            <NavLinkItem to={`/dashboard/${role}/home`} icon={FaUser}>
                My Profile
            </NavLinkItem>
            
            {isMember && (
                <NavLinkItem to="/dashboard/member/clubs" icon={FaCalendarCheck}>
                    My Memberships
                </NavLinkItem>
            )}

            {(isAdminOrOrganizer) && (
                <>
                    <h4 className="uppercase  mt-4 pt-4 border-t border-gray-200">Management</h4>
                    
                    {isManager && (
                        <>
                            <NavLinkItem to="/dashboard/clubManager/myClubs" icon={FaChartLine}>
                                My Clubs
                            </NavLinkItem>
                            <NavLinkItem to="/dashboard/clubManager/createClub" icon={FaPlus}>
                                Create New Club
                            </NavLinkItem>
                            
                            <NavLinkItem to="/dashboard/clubManager/events" icon={FaCalendarCheck}>
                                Manage Events
                            </NavLinkItem>
                            
                        </>
                    )}
                    
                    {isAdmin && (
                        <NavLinkItem to="/dashboard/admin/clubs" icon={FaChartLine}>
                            Manage All Clubs
                        </NavLinkItem>
                    )}
                </>
            )}

            {(isAdmin) && (
                <>
                    <NavLinkItem to="/dashboard/admin/users" icon={FaUsers}>
                        Manage Users
                    </NavLinkItem>
                    <NavLinkItem to="/dashboard/admin/payments" icon={FaHistory}>
                        View All Payments
                    </NavLinkItem>
                </>
            )}

            {(isMember) && (
                <>
                    <NavLinkItem to="/dashboard/member/payments" icon={FaHistory}>
                        Payment History
                    </NavLinkItem>
                    <NavLinkItem to="/dashboard/member/events" icon={FaCalendarCheck}>
                        My Events
                    </NavLinkItem>
                </>
            )}
            
            <div className="pt-4 border-t border-gray-200 mt-4 space-y-2">
                <h4 className=" uppercase ">Quick Actions</h4>
                <NavLinkItem to="/" icon={FaHome}>
                    Back to Home
                </NavLinkItem>
                
                <button 
                    onClick={logout}
                    className="flex items-center w-full p-3 rounded-lg transition duration-200 text-[var(--color-error)] hover:bg-[var(--color-error)] hover:text-white"
                >
                    <FaSignOutAlt className="w-5 h-5 mr-3" />
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default SideNavbar;