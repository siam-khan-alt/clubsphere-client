import React from 'react';
import DashboardHeaderNonBTNSkeleton from '../dashboadCommon/DashboardHeaderNonBTNSkeleton';

const ManageUsersSkeleton = () => {
    return (
        <div className="space-y-6 md:space-y-10 pb-10 animate-pulse">
            {/* 1. Header Skeleton */}
            <DashboardHeaderNonBTNSkeleton />

            {/* 2. Tabs & Stat Bar Skeleton */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-standard/10 pb-6">
                {/* Tab Pill Skeleton */}
                <div className="flex gap-2 bg-card border-standard p-1.5 rounded-2xl w-full lg:w-auto">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 flex-1 lg:w-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                    ))}
                </div>
                {/* Population Stat Skeleton */}
                <div className="h-12 w-full lg:w-56 bg-card border-standard rounded-2xl"></div>
            </div>

            {/* 3. Table Skeleton Area */}
            <div className="w-full overflow-hidden rounded-2xl bg-card border-standard shadow-sm p-6 space-y-6">
                {/* Table Header Row */}
                <div className="flex justify-between px-4 pb-4 border-b border-standard/10">
                    <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    <div className="hidden lg:block h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded"></div>
                </div>

                {/* Table Body Rows */}
                {[1, 2, 3, 4, 5, 6].map((row) => (
                    <div key={row} className="flex items-center justify-between p-4 bg-background/50 rounded-2xl border border-standard/5">
                        {/* Profile Info */}
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded opacity-50"></div>
                            </div>
                        </div>

                        {/* Contact (Hidden on mobile) */}
                        <div className="hidden lg:block h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded"></div>

                        {/* Role Badge */}
                        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>

                        {/* Action Button */}
                        <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageUsersSkeleton;