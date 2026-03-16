import React from 'react';

export const SuggestedClubSkeleton = () => (
    <div className="space-y-6 w-full animate-pulse">
        {/* Section Title */}
        <div className="h-7 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg" />

        <div className="space-y-4">
            {[1, 2].map((i) => (
                <div key={i} className="bg-card/50 border-standard rounded-2xl overflow-hidden shadow-sm">
                    {/* Banner Image Area */}
                    <div className="h-24 bg-slate-200 dark:bg-slate-800 opacity-40" />
                    <div className="p-4 space-y-3">
                        {/* Category Badge */}
                        <div className="h-3.5 w-14 bg-slate-200 dark:bg-slate-800 rounded-full" />
                        {/* Club Name */}
                        <div className="h-5 w-full bg-slate-200 dark:bg-slate-800 rounded-lg" />
                        {/* Link Text */}
                        <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded opacity-60" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);