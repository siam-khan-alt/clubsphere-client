import React, { use, useState, useEffect, Suspense } from 'react';
import { AuthContext } from '../context/AuthContext';
import SideNavbar from '../components/shared/SideNavbar';
import { Outlet, useNavigation } from 'react-router-dom';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { FaBars, FaTimes } from 'react-icons/fa';

const DashboardLayout = () => {
    const { loading } = use(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const navigation = useNavigation();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const isNavigating = navigation.state === "loading";

    return (
        <div className="flex min-h-screen bg-base-100 transition-colors duration-300 relative">
            <button 
                className="lg:hidden fixed top-4 left-4 z-[60] p-2 rounded-xl bg-primary text-white shadow-2xl"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
            
            <div 
                className={`
                    w-72 bg-base-200 text-base-content shadow-2xl p-6 
                    fixed lg:static top-0 min-h-screen z-50 
                    transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform 
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 lg:block border-r border-base-content/5
                `}
            >
                <div className="flex items-center justify-between mb-10 px-2">
                    <div className="text-2xl font-black tracking-tighter italic uppercase">
                        Club<span className="text-primary not-italic">Sphere</span>
                    </div>
                </div>

                <SideNavbar theme={theme} toggleTheme={toggleTheme} />
                
                <div className="absolute bottom-8 left-6 right-6">
                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">System Status</p>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-bold opacity-50 uppercase">Operational</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div 
                className={`flex-1 min-h-screen transition-all duration-500 
                ${isSidebarOpen ? 'blur-md lg:blur-none opacity-50 lg:opacity-100' : ''}`}
                onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
            >
                <div className="p-4 lg:p-8 pt-20 lg:pt-8 container mx-auto h-full flex flex-col">
                    <div className="relative flex-1 bg-base-100 rounded-2xl border border-base-content/5 shadow-sm min-h-[85vh] overflow-hidden">
                        
                        {isNavigating && (
                            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-base-100/60 backdrop-blur-md transition-all duration-300">
                                <LoadingSpinner />
                                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 animate-pulse">
                                    Loading Interface...
                                </p>
                            </div>
                        )}

                        <div className={`h-full transition-all duration-500 ${isNavigating ? 'opacity-20 scale-[0.98] blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;