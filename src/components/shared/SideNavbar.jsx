import { use } from 'react';
import { FaHistory, FaChartLine, FaUsers, FaPlus, FaCalendarCheck, FaHome } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import NavLinkItem from '../dashboard/NavLinkItem';
import { FiGrid } from 'react-icons/fi';

const SideNavbar = () => {
    const { user } = use(AuthContext); 
    const role = user?.role;
    
    const isAdminOrOrganizer = role === 'admin' || role === 'clubManager';
    const isAdmin = role === 'admin';
    const isManager = role === 'clubManager'; 
    const isMember = role === 'member';

    return (
        <nav className="flex flex-col h-full justify-between">
            <div className="space-y-1 overflow-y-auto custom-scrollbar pr-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-6 px-3 opacity-80">
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
                        <div className="pt-6 pb-2 px-3 text-[10px] font-black uppercase text-text-body opacity-40 tracking-tighter">Management</div>
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
                        <div className="pt-6 pb-2 px-3 text-[10px] font-black uppercase text-text-body opacity-40 tracking-tighter">Administration</div>
                        <NavLinkItem to="/dashboard/admin/users" icon={FaUsers}>Manage Users</NavLinkItem>
                        <NavLinkItem to="/dashboard/admin/payments" icon={FaHistory}>All Payments</NavLinkItem>
                    </>
                )}

                {isMember && (
                    <>
                        <div className="pt-6 pb-2 px-3 text-[10px] font-black uppercase text-text-body opacity-40 tracking-tighter">Personal</div>
                        <NavLinkItem to="/dashboard/member/payments" icon={FaHistory}>Payment History</NavLinkItem>
                        <NavLinkItem to="/dashboard/member/events" icon={FaCalendarCheck}>My Events</NavLinkItem>
                    </>
                )}
            </div>

           
        </nav>
    );
};

export default SideNavbar;