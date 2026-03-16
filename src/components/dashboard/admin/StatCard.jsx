import React from 'react';

const StatCard = ({ title, value, icon: Icon, colorClass, iconColorClass }) => (
    <div className="bg-card border-standard rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-500 group relative overflow-hidden">
        {/* Background Decorative Shape */}
        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 ${colorClass.split(' ')[0].replace('text', 'bg')}`}></div>
        
        <div className="flex items-center justify-between relative z-10">
            <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-body opacity-50">
                    {title}
                </p>
                <div className="flex items-baseline gap-1">
                    <p className={`text-4xl font-black tracking-tighter text-text-heading`}>
                        {value.toLocaleString()}
                    </p>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                </div>
            </div>

            <div className={`p-4 rounded-2xl ${iconColorClass} transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110 shadow-inner`}>
                <Icon size={30} strokeWidth={2.5} /> 
            </div>
        </div>

        {/* Hover Progress Bar (Subtle) */}
        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-700"></div>
    </div>
);

export default StatCard;