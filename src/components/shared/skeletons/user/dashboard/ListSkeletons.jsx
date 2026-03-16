import React from 'react';

export const EventListSkeleton = () => (
    <div className="space-y-6 w-full animate-pulse">
        {/* Section Title */}
        <div className="flex items-center justify-between px-2">
            <div className="h-7 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded opacity-60" />
        </div>
        
        {/* Event Row Skeletons */}
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-card/50 border-standard">
                    <div className="w-14 h-14 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
                    <div className="flex-1 space-y-2">
                        <div className="h-5 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                        <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-full opacity-50" />
                    </div>
                    <div className="w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded-md shrink-0 opacity-30" />
                </div>
            ))}
        </div>
    </div>
);