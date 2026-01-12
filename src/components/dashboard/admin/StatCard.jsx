import React from 'react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-base-100 p-6 rounded-2xl border-t-4 border-primary shadow-sm border-x border-b border-base-content/5 hover:shadow-md transition-all group">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-base-content/50">{title}</p>
                <p className="text-3xl font-black text-base-content">{value.toLocaleString()}</p>
            </div>
            <div className={`p-4 rounded-2xl bg-base-200 ${color} group-hover:scale-110 transition-transform`}>
                <Icon size={28} /> 
            </div>
        </div>
    </div>
);

export default StatCard;