import React from 'react';
import DashboardHeaderSkeleton from '../dashboadCommon/DashboardHeaderSkeleton';

const ClubMembersSkeleton = ({ rowCount = 5 }) => {
    return (
        <div className="pb-10 animate-pulse">
            <DashboardHeaderSkeleton />

            <div className="container mx-auto px-4 mt-8 space-y-6">
                {/* Club Identity Card Skeleton */}
                <div className="bg-card border-standard p-8 rounded-2xl flex flex-col gap-4 relative overflow-hidden">
                    {/* Background Icon Placeholder */}
                    <div className="absolute right-[-20px] top-[-20px] h-40 w-40 bg-slate-200 dark:bg-slate-800 rounded-full opacity-20"></div>
                    
                    <div className="relative z-10">
                        <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded mb-3"></div>
                        <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6"></div>
                        
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-36 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                            <div className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                            <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded opacity-50"></div>
                        </div>
                    </div>
                </div>

                {/* Table Skeleton */}
                <div className="w-full overflow-hidden bg-card border-standard rounded-2xl p-6">
                    {/* Fake Table Header */}
                    <div className="grid grid-cols-4 gap-4 mb-8 px-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className={`h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-20 ${i === 3 ? 'justify-self-end' : i === 1 || i === 2 ? 'mx-auto' : ''}`}></div>
                        ))}
                    </div>

                    {/* Dynamic Member Rows */}
                    <div className="space-y-4">
                        {[...Array(rowCount)].map((_, i) => (
                            <div key={i} className="grid grid-cols-4 gap-4 p-5 border border-primary/5 rounded-[2rem] items-center">
                                {/* Member Info */}
                                <div className="flex items-center gap-4 pl-3">
                                    <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                        <div className="h-3 w-36 bg-slate-200 dark:bg-slate-800 rounded opacity-60"></div>
                                    </div>
                                </div>
                                
                                {/* Membership Details (Center) */}
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                    <div className="h-2 w-20 bg-slate-200 dark:bg-slate-800 rounded opacity-40"></div>
                                </div>

                                {/* Status (Center) */}
                                <div className="flex justify-center">
                                    <div className="h-7 w-20 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                                </div>

                                {/* Action Button (Right) */}
                                <div className="flex justify-end pr-3">
                                    <div className="h-9 w-28 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubMembersSkeleton;