import React from 'react';

const DashboardHeaderNonBTNSkeleton = () => {
    return (
        <div className="relative overflow-hidden bg-transparent md:bg-card md:border-standard md:rounded-2xl p-0 md:p-10 shadow-none md:shadow-sm animate-pulse">
            
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center md:items-start lg:items-center gap-6">
                
                {/* Content Wrapper */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 w-full">
                    
                    {/* Badge Skeleton */}
                    <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-full"></div>

                    {/* Title Skeleton */}
                    <div className="flex items-center gap-3">
                        <div className="h-10 md:h-12 w-48 md:w-64 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                        {/* Smile Icon Skeleton (Visible only on MD+) */}
                        <div className="hidden md:block h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                    </div>
                    
                    {/* Description Skeleton (Stacked lines for realistic feel) */}
                    <div className="space-y-2 w-full flex flex-col items-center md:items-start">
                        <div className="h-4 w-[280px] md:w-[500px] bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                        <div className="h-4 w-[200px] md:w-[350px] bg-slate-200 dark:bg-slate-800 rounded-md opacity-60"></div>
                    </div>
                </div>

            </div>
            
            {/* Mobile Spacer to match the actual header height */}
            <div className="h-6 md:hidden"></div>
        </div>
    );
};

export default DashboardHeaderNonBTNSkeleton;