import React from 'react';
import DashboardHeaderSkeleton from '../dashboadCommon/DashboardHeaderSkeleton';

const MyClubsSkeleton = () => {
    return (
        <div className="space-y-10 animate-pulse pb-10">
            {/* 1. Header Skeleton (Reused) */}
            <DashboardHeaderSkeleton />

            {/* 2. Filter & Search Bar Skeleton */}
            <div className="flex flex-col md:flex-row items-center gap-4 py-4">
                {/* Search Input Placeholder */}
                <div className="h-[52px] flex-1 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                
                {/* Sort Dropdown Placeholder */}
                <div className="h-[52px] w-full md:w-[220px] bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
            </div>

            {/* 3. Club Cards Grid Skeleton (3 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card border-standard rounded-2xl overflow-hidden h-[450px] flex flex-col">
                        {/* Banner Image Area */}
                        <div className="h-48 bg-slate-200 dark:bg-slate-800"></div>
                        
                        {/* Content Area */}
                        <div className="p-6 space-y-5 flex-grow">
                            <div className="space-y-2">
                                <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                            </div>
                            
                            {/* Stats Rows */}
                            <div className="space-y-3">
                                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            </div>
                        </div>

                        {/* Action Buttons Area */}
                        <div className="p-3 grid grid-cols-3 gap-2 border-t border-standard bg-slate-50/50 dark:bg-slate-800/30">
                            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyClubsSkeleton;