import React from 'react';

const DashboardLayoutSkeleton = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-background animate-pulse">
            {/* Sidebar Skeleton */}
            <aside className="hidden lg:flex flex-col w-72 bg-card border-r border-slate-200 dark:border-slate-800 p-6">
                <div className="flex items-center gap-2 mb-10 px-2">
                    <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                    <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                </div>
                <div className="space-y-4 flex-1">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl opacity-60"></div>
                    ))}
                </div>
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                </div>
            </aside>

            {/* Main Content Area Skeleton */}
            <div className="flex-1 flex flex-col h-screen">
                {/* Navbar Skeleton */}
                <header className="h-20 bg-card border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6">
                    <div className="space-y-2">
                        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        <div className="h-3 w-48 bg-slate-200 dark:bg-slate-800 rounded opacity-50"></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                        <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                        <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                    </div>
                </header>

                {/* Main Content Skeleton */}
                <main className="p-4 lg:p-8 flex-1">
                    <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 h-96 bg-card border border-standard/10 rounded-3xl"></div>
                        <div className="h-96 bg-card border border-standard/10 rounded-3xl"></div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayoutSkeleton;