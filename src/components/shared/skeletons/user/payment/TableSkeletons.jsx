export const TableSkeleton = ({ rows = 5 }) => (
    <div className="space-y-6 animate-pulse">
        {/* Title Skeleton */}
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        
        {/* Table Area Skeleton */}
        <div className="bg-card border-standard rounded-2xl overflow-hidden">
            <div className="h-16 bg-slate-100 dark:bg-slate-800/50 border-b border-standard" />
            {[...Array(rows)].map((_, i) => (
                <div key={i} className="h-16 border-b border-standard flex items-center px-6 gap-4">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
                    <div className="h-4 flex-1 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
                </div>
            ))}
        </div>
    </div>
);