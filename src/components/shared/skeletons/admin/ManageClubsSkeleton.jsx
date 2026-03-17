import React from 'react';
import DashboardHeaderSkeleton from '../dashboadCommon/DashboardHeaderSkeleton';

const ManageClubsSkeleton = () => {
    return (
        <div className="space-y-6 md:space-y-10 pb-10 animate-pulse">
            {/* 1. Header Skeleton */}
            <DashboardHeaderSkeleton />

            {/* 2. Tabs & Stat Bar Skeleton */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-standard/10 pb-6">
                {/* Tab Pill Skeleton */}
                <div className="flex gap-2 bg-card border-standard p-1.5 rounded-2xl w-full lg:w-auto">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 flex-1 lg:w-28 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                    ))}
                </div>
                {/* Stat Box Skeleton */}
                <div className="h-12 w-full lg:w-48 bg-card border-standard rounded-2xl"></div>
            </div>

            {/* 3. Table Skeleton */}
            <div className="w-full overflow-hidden rounded-2xl bg-card border-standard shadow-sm">
                <div className="p-6 space-y-6">
                    {/* Table Header Line */}
                    <div className="flex justify-between px-4 pb-4 border-b border-standard/10">
                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        <div className="hidden lg:block h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded text-right"></div>
                    </div>

                    {/* Table Rows Skeleton */}
                    {[1, 2, 3, 4, 5].map((row) => (
                        <div key={row} className="flex items-center justify-between p-4 bg-background/50 rounded-2xl border border-standard/5">
                            {/* Identity */}
                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                                <div className="space-y-2">
                                    <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                    <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded opacity-50"></div>
                                </div>
                            </div>
                            {/* Authority (Hidden on small) */}
                            <div className="hidden lg:block space-y-2">
                                <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-3 w-36 bg-slate-200 dark:bg-slate-800 rounded opacity-50"></div>
                            </div>
                            {/* Stats */}
                            <div className="flex gap-4">
                                <div className="h-8 w-12 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                <div className="h-8 w-12 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                            </div>
                            {/* Actions */}
                            <div className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageClubsSkeleton;