import React, { use,  useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import SideNavbar from '../components/shared/SideNavbar';
import { Outlet } from 'react-router-dom';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { FaBars, FaTimes } from 'react-icons/fa';

const DashboardLayout = () => {
    const { loading } = use(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (loading) {
        return <LoadingSpinner />;
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen relative">
            
            <button 
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[var(--color-primary-accent)] text-white"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
            
            <div 
                className={`
                    w-64 bg-[var(--color-card-bg)] text-[var(--color-text-body)] shadow-lg p-4 
                    fixed lg:static top-0 min-h-screen z-40 
                    transition-transform duration-300 transform 
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 lg:block lg:border-r border-gray-200
                `}
            >
                <div className="text-2xl font-bold mb-8 text-[var(--color-primary-accent)]">ClubSphere</div>
                <SideNavbar />
            </div>
            
            <div className={`flex-1 p-4 lg:p-8 bg-[var(--color-bg-light)] ${isSidebarOpen ? 'lg:ml-0' : 'ml-0'}`}>
                <div className="pt-16 lg:pt-0">
                    <Outlet />
                </div>
            </div>
        
        </div>
    );
};

export default DashboardLayout;