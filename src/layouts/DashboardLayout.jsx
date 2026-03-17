import React, { use, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import SideNavbar from '../components/shared/SideNavbar';
import DashboardNavbar from '../components/shared/DashboardNavbar'; 
import { Link, Outlet, useNavigation } from 'react-router-dom';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { FaBars, FaTimes } from 'react-icons/fa';
import DashboardLayoutSkeleton from '../components/shared/skeletons/DashboardLayoutSkeleton';

const DashboardLayout = () => {
    const { loading } = use(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const navigation = useNavigation();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    if (loading) return <DashboardLayoutSkeleton />;

    const isNavigating = navigation.state === "loading";

    return (
        <div className="flex min-h-screen bg-background transition-colors duration-300">
            {/* Sidebar */}
            <aside 
                className={`
                    fixed lg:sticky top-0 left-0 z-50 h-screen bg-card p-6
                    transition-transform duration-300 ease-in-out transform
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="flex items-center justify-between mb-10 px-2">
                     <Link to="/" className="  flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                      <span className="text-white font-black text-xl">C</span>
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-primary">
                      Club<span className="text-secondary">Sphere</span>
                    </span>
                  </Link>
                    <button className="lg:hidden text-text-body" onClick={() => setIsSidebarOpen(false)}>
                        <FaTimes size={20} />
                    </button>
                </div>
                <SideNavbar />
            </aside>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen">
                <DashboardNavbar theme={theme} toggleTheme={toggleTheme} />
                
                {/* Mobile Menu Trigger */}
                <button 
                    className="lg:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full btn-primary-gradient shadow-xl"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <FaBars size={20} />
                </button>

                <main className="p-4 lg:p-8 flex-1 overflow-y-auto">
                    <div className="relative min-h-[80vh]">
                        {isNavigating && (
                            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm rounded-2xl">
                                <LoadingSpinner />
                                <span className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Syncing Data...</span>
                            </div>
                        )}
                        <div className={`transition-all duration-300 ${isNavigating ? 'opacity-30 scale-[0.99] blur-sm' : 'opacity-100'}`}>
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;