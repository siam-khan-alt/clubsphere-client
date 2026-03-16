import React from 'react';

export const MyMembershipsSkeleton = () => {
    return (
        <div className="space-y-10 animate-pulse">
            
            <div className="relative overflow-hidden bg-transparent md:bg-card md:border-standard md:rounded-[2.5rem] p-0 md:p-10 shadow-none md:shadow-sm">
                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center md:items-start lg:items-center gap-6">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 w-full">
                        {/* Badge Skeleton */}
                        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-full" />
                        
                        {/* Title Skeleton */}
                        <div className="h-10 md:h-12 w-48 md:w-64 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                        
                        {/* Description Skeleton */}
                        <div className="space-y-2 w-full flex flex-col items-center md:items-start">
                            <div className="h-4 w-[280px] md:w-[500px] bg-slate-200 dark:bg-slate-800 rounded-md" />
                            <div className="h-4 w-[200px] md:w-[350px] bg-slate-200 dark:bg-slate-800 rounded-md opacity-60" />
                        </div>
                    </div>
                    {/* Button Skeleton (Only MD+) */}
                    <div className="hidden md:block h-12 w-44 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0" />
                </div>
                <div className="h-6 md:hidden"></div>
            </div>

            {/* --- Search & Filter Bar Skeleton --- */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 h-14 bg-card/50 border-standard rounded-2xl" />
                <div className="w-full md:w-[220px] h-14 bg-card/50 border-standard rounded-2xl" />
            </div>

            {/* --- Card Grid Skeleton --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-10">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-[380px] bg-card/50 border-standard rounded-[2rem] overflow-hidden flex flex-col">
                        {/* Image area */}
                        <div className="h-44 bg-slate-200 dark:bg-slate-800 opacity-40" />
                        
                        {/* Content area */}
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
                                <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded-full" />
                            </div>
                            <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                            <div className="space-y-2">
                                <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full opacity-60" />
                                <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-full opacity-60" />
                            </div>
                            <div className="pt-4 flex gap-2">
                                <div className="h-10 flex-1 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                                <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};