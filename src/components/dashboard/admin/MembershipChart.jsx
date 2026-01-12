import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiActivity } from 'react-icons/fi';

const MembershipChart = ({ chartData = [] }) => {
    if (chartData.length === 0) {
        return (
            <div className="bg-base-100 p-6 rounded-2xl border border-base-content/5 shadow-sm h-[450px] flex items-center justify-center">
                <p className="text-base-content/30 font-bold">No membership data available for charting.</p>
            </div>
        );
    }

    const formattedData = chartData.map(item => ({
        name: item.clubName,
        members: item.memberCount || 0, 
    }));

    return (
        <div className="bg-base-100 p-6 rounded-2xl border border-base-content/5 shadow-sm h-[450px]">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                <FiActivity className="text-primary" /> Memberships by Club Category
            </h3>
            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={formattedData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(var(--bc)/0.1)" />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'oklch(var(--bc)/0.5)', fontSize: 12, fontWeight: 700 }} 
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'oklch(var(--bc)/0.5)', fontSize: 12, fontWeight: 700 }} 
                    />
                    <Tooltip 
                        cursor={{ fill: 'oklch(var(--bc)/0.05)' }}
                        contentStyle={{ 
                            borderRadius: '16px', 
                            border: 'none', 
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            backgroundColor: 'oklch(var(--b1))',
                            color: 'oklch(var(--bc))'
                        }}
                    />
                    <Bar 
                        dataKey="members" 
                        fill="oklch(var(--p))" 
                        radius={[6, 6, 0, 0]} 
                        barSize={40}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MembershipChart;