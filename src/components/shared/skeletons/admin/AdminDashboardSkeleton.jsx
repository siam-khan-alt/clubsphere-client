import React from 'react';
import DashboardHeaderSkeleton from '../dashboadCommon/DashboardHeaderSkeleton';

const AdminDashboardSkeleton = () => {
    return (
        <div className="pb-10 animate-pulse">
            <DashboardHeaderSkeleton />

            <div className="container mx-auto mt-8 space-y-8">
                
                {/* Statistics Grid Skeleton (8 Cards) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-card border-standard rounded-2xl p-6 h-32 relative overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div className="space-y-3 flex-1">
                                    <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                                    <div className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                                </div>
                                <div className="h-14 w-14 bg-slate-200 dark:bg-slate-800 rounded-2xl shrink-0"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Analytics Row Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Charts Column (2/3) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Revenue Chart Skeleton */}
                        <div className="bg-card border-standard rounded-3xl p-8 h-[450px]">
                            <div className="flex justify-between mb-10">
                                <div className="space-y-3">
                                    <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                    <div className="h-3 w-32 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                                </div>
                                <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                            </div>
                            <div className="w-full h-[280px] bg-slate-100/50 dark:bg-slate-800/30 rounded-2xl"></div>
                        </div>
                        
                        {/* Membership Chart Skeleton */}
                        <div className="bg-card border-standard rounded-2xl p-8 h-[450px]">
                            <div className="w-full h-full bg-slate-100/50 dark:bg-slate-800/30 rounded-xl"></div>
                        </div>
                    </div>

                    {/* Sidebar Column (1/3) - Activity Feed Skeleton */}
                    <div className="lg:col-span-1 h-full">
                        <div className="bg-card border-standard rounded-2xl p-8 h-full min-h-[500px]">
                            <div className="space-y-3 mb-8">
                                <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                                <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded-md opacity-50"></div>
                            </div>
                            <div className="space-y-6">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"></div>
                                        <div className="space-y-2 flex-1">
                                            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                                            <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded-md opacity-40"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardSkeleton;