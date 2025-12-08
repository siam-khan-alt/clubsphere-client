
import React from 'react';

const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass, iconColorClass }) => (
    <div className={`p-5 rounded-lg shadow-md ${bgColorClass} ${colorClass} transition duration-300 hover:shadow-xl`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
            <div className={`p-3 rounded-full ${iconColorClass}`}>
                <Icon className="w-8 h-8 text-white" /> 
            </div>
        </div>
    </div>
);

export default StatCard;