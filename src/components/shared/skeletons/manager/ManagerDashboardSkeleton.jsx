import React from 'react';
import DashboardHeaderSkeleton from '../dashboadCommon/DashboardHeaderSkeleton';

const ManagerDashboardSkeleton = () => {
    return (
        <div className="space-y-10 pb-10">
            <DashboardHeaderSkeleton />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-card border-standard rounded-2xl p-6 h-32 animate-pulse">
                        <div className="flex justify-between items-center">
                            <div className="space-y-3">
                                <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                            </div>
                            <div className="h-14 w-14 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="bg-card border-standard p-8 rounded-2xl h-[420px] animate-pulse">
                        <div className="h-6 w-40 bg-slate-200 dark:bg-slate-800 rounded mb-8"></div>
                        <div className="h-[300px] w-full bg-slate-100/50 dark:bg-slate-800/50 rounded-xl"></div>
                    </div>
                ))}
                <div className="xl:col-span-2 bg-card border-standard p-8 rounded-2xl h-[420px] animate-pulse">
                    <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded mb-8"></div>
                    <div className="h-[300px] w-full bg-slate-100/50 dark:bg-slate-800/50 rounded-xl"></div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboardSkeleton;