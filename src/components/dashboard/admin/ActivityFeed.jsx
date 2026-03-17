import React from 'react';
import { FiActivity, FiCheckCircle, FiUsers, FiDollarSign, FiXCircle } from 'react-icons/fi';

const ActivityFeed = ({ activities = [] }) => {
    const getIcon = (color) => {
        switch (color) {
            case 'green': return <FiCheckCircle size={16} />;
            case 'blue': return <FiUsers size={16} />;
            case 'yellow': return <FiDollarSign size={16} />;
            case 'red': return <FiXCircle size={16} />;
            default: return <FiActivity size={16} />;
        }
    };

    const getColorClass = (color) => {
        if (color === 'green' || color === 'yellow') return 'bg-primary/10 text-primary';
        return 'bg-secondary/10 text-secondary';
    };

    return (
        <div className="bg-card border-standard rounded-2xl p-8 shadow-sm flex flex-col h-full">
            <div className="mb-8">
                <h4 className="text-xl font-black text-text-heading tracking-tight flex items-center gap-2">
                    <FiActivity className="text-secondary" /> Live Logs
                </h4>
                <p className="text-xs font-bold text-text-body/40 uppercase tracking-widest mt-1">Platform events</p>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[350px]">
                <ul className="space-y-4">
                    {activities.map((activity, index) => (
                        <li key={index} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all group">
                            <div className={`mt-1 p-2.5 rounded-xl flex items-center justify-center ${getColorClass(activity.color)}`}>
                                {getIcon(activity.color)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-text-heading leading-tight">{activity.text}</p>
                                <p className="text-[10px] font-black text-text-body/30 uppercase mt-1">Just Now</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ActivityFeed;