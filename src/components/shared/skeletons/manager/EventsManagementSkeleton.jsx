import React from 'react';
import DashboardHeaderSkeleton from '../dashboadCommon/DashboardHeaderSkeleton';

const EventsManagementSkeleton = ({ rowCount = 6 }) => {
    return (
        <div className="pb-10 animate-pulse">
            <DashboardHeaderSkeleton />

            <div className="max-w-7xl mx-auto px-4 mt-8 space-y-6">
                {/* Status Bar Skeleton */}
                <div className="flex justify-between items-center bg-card border-standard p-4 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
                        <div className="space-y-1.5">
                            <div className="h-2 w-8 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        </div>
                    </div>
                    <div className="h-10 w-36 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                </div>

                {/* Table Container */}
                <div className="w-full overflow-hidden bg-card border-standard rounded-2xl">
                    <div className="overflow-x-auto p-6">
                        {/* Fake Table Header */}
                        <div className="grid grid-cols-5 gap-4 mb-6 px-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className={`h-3 bg-slate-200 dark:bg-slate-800 rounded w-16 ${i === 4 ? 'justify-self-end' : i === 0 ? 'justify-self-start' : 'justify-self-center'}`}></div>
                            ))}
                        </div>

                        {/* Dynamic Rows based on 'rowCount' prop */}
                        <div className="space-y-4">
                            {[...Array(rowCount)].map((_, i) => (
                                <div key={i} className="grid grid-cols-5 gap-4 p-4 border border-standard/40 rounded-[2rem] items-center bg-slate-50/30 dark:bg-slate-800/10">
                                    {/* Event Details */}
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-800 shrink-0"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                            <div className="h-2 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                        </div>
                                    </div>
                                    
                                    {/* Schedule */}
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                        <div className="h-2 w-14 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                    </div>

                                    {/* Fee */}
                                    <div className="flex justify-center">
                                        <div className="h-7 w-20 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                                    </div>

                                    {/* Registration */}
                                    <div className="flex flex-col items-center space-y-3">
                                        <div className="h-1.5 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                                        <div className="h-2 w-12 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end gap-2">
                                        <div className="h-9 w-9 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                                        <div className="h-9 w-9 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                                        <div className="h-9 w-9 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsManagementSkeleton;