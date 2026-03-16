import React from 'react';

export const DashboardOverviewSkeleton = () => (
    <div className="space-y-10 animate-pulse">
        {/* --- Adaptive Header Skeleton --- */}
        <div className="relative overflow-hidden bg-transparent md:bg-card md:border-standard md:rounded-[2.5rem] p-0 md:p-10 shadow-none md:shadow-sm">
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center md:items-start lg:items-center gap-6">
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 w-full">
                    {/* Badge */}
                    <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-full" />
                    {/* Title */}
                    <div className="h-10 md:h-12 w-56 md:w-80 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                    {/* Description */}
                    <div className="h-4 w-[280px] md:w-[450px] bg-slate-200 dark:bg-slate-800 rounded-full opacity-60" />
                </div>
                {/* Button (Only visible on MD+) */}
                <div className="hidden md:block h-12 w-44 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0" />
            </div>
            <div className="h-6 md:hidden"></div>
        </div>

        {/* --- Stats Skeleton --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 w-full bg-card/50 border-standard rounded-2xl flex items-center p-6 gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
                    <div className="space-y-2">
                        <div className="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded opacity-50" />
                        <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);