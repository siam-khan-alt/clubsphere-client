import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FiActivity } from 'react-icons/fi';

const MembershipChart = ({ chartData = [] }) => {
    if (chartData.length === 0) {
        return (
            <div className="bg-card border-standard border-dashed p-6 rounded-2xl h-[450px] flex flex-col items-center justify-center opacity-40">
                <FiActivity size={40} className="mb-4" />
                <p className="font-black uppercase tracking-widest text-[10px]">No Analytics Data</p>
            </div>
        );
    }

    const formattedData = chartData.map(item => ({
        name: item.clubName,
        members: item.memberCount || 0, 
    }));

    return (
        <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formattedData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                    {/* SVG Gradient Definition */}
                    <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.9} />
                            <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0.4} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        vertical={false} 
                        stroke="currentColor" 
                        className="text-text-body/5" 
                    />
                    
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'var(--color-text-body)', fontSize: 10, fontWeight: 900, opacity: 0.4 }}
                        interval={0}
                    />
                    
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'var(--color-text-body)', fontSize: 10, fontWeight: 900, opacity: 0.4 }} 
                    />

                    <Tooltip 
                        cursor={{ fill: 'var(--color-primary)', opacity: 0.05 }}
                        contentStyle={{ 
                            borderRadius: '1.25rem', 
                            border: '1px solid var(--color-primary)', 
                            padding: '12px 16px',
                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                            backgroundColor: 'var(--color-card)',
                            color: 'var(--color-text-heading)'
                        }}
                        itemStyle={{ 
                            color: 'var(--color-primary)', 
                            fontWeight: '900',
                            fontSize: '14px',
                            textTransform: 'uppercase'
                        }}
                    />

                    <Bar 
                        dataKey="members" 
                        fill="url(#barGradient)" 
                        radius={[10, 10, 0, 0]} 
                        barSize={32}
                        animationDuration={1500}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MembershipChart;