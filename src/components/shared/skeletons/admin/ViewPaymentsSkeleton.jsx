import React from 'react';
import DashboardHeaderNonBTNSkeleton from '../dashboadCommon/DashboardHeaderNonBTNSkeleton';

const ViewPaymentsSkeleton = () => {
    return (
        <div className="space-y-6 md:space-y-10 pb-10 animate-pulse">
            {/* 1. Header Skeleton */}
            <DashboardHeaderNonBTNSkeleton />

            {/* 2. Revenue Card Skeleton */}
            <div className="bg-card border-standard rounded-3xl p-8 h-40 w-full relative overflow-hidden">
                <div className="space-y-4">
                    <div className="h-3 w-40 bg-slate-200 dark:bg-slate-800 rounded opacity-60"></div>
                    <div className="h-12 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                </div>
            </div>

            {/* 3. Controls (Tabs & Search) Skeleton */}
            <div className="flex flex-col xl:flex-row items-center justify-between gap-6 border-b border-standard/10 pb-8">
                <div className="flex gap-2 bg-card border-standard p-1.5 rounded-2xl w-full xl:w-auto">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 flex-1 xl:w-28 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                    ))}
                </div>
                <div className="h-12 w-full xl:w-96 bg-card border-standard rounded-2xl"></div>
            </div>

            {/* 4. Table Skeleton Area */}
            <div className="w-full space-y-4 p-6 bg-card border-standard rounded-2xl">
                {/* Table Header skeleton */}
                <div className="flex justify-between border-b border-standard/10 pb-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    ))}
                </div>
                {/* Table Rows skeleton */}
                {[1, 2, 3, 4, 5].map((row) => (
                    <div key={row} className="flex items-center justify-between p-4 bg-background/50 rounded-2xl border border-standard/5">
                        <div className="space-y-2">
                            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded opacity-50"></div>
                        </div>
                        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded hidden md:block"></div>
                        <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                        <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewPaymentsSkeleton;