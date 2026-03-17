import React from 'react';
import { 
    ComposedChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    Area,
    Cell
} from 'recharts';
import { FiTrendingUp } from 'react-icons/fi';

const RevenueChart = ({ trends = [] }) => {
    // Data formatting and reversing to show chronological order
    const data = [...trends].reverse().map(item => ({
        name: `Month ${item._id.month}`,
        revenue: item.amount,
    }));

    // Custom Tooltip for Premium Look
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-card border-standard p-4 rounded-xl shadow-2xl backdrop-blur-md">
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-body/50 mb-1">
                        {payload[0].payload.name}
                    </p>
                    <p className="text-lg font-black text-primary">
                        ${payload[0].value.toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-card border-standard rounded-3xl p-8 shadow-sm h-[450px] relative overflow-hidden group">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                    <h4 className="text-2xl font-black text-text-heading tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <FiTrendingUp className="text-primary" />
                        </div>
                        Revenue Stream
                    </h4>
                    <p className="text-xs font-bold text-text-body/40 uppercase tracking-[0.2em] mt-2 ml-11">
                        Financial Growth Analytics
                    </p>
                </div>

                <div className="flex gap-2 ml-11 md:ml-0">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase">
                        Real-time
                    </span>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={1} />
                                <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity={0.8} />
                            </linearGradient>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        
                        <CartesianGrid 
                            strokeDasharray="8 8" 
                            vertical={false} 
                            stroke="oklch(var(--bc)/0.05)" 
                        />
                        
                        <XAxis 
                            dataKey="name" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--color-text-body)', fontSize: 10, fontWeight: 900 }}
                            dy={15}
                        />
                        
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--color-text-body)', fontSize: 10, fontWeight: 900 }}
                        />

                        <Tooltip cursor={{ fill: 'var(--color-primary)', opacity: 0.05 }} content={<CustomTooltip />} />

                        {/* Subtle Area Background */}
                        <Area 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="none" 
                            fill="url(#areaGradient)" 
                        />

                        {/* Animated Gradient Bars */}
                        <Bar 
                            dataKey="revenue" 
                            barSize={35} 
                            radius={[10, 10, 10, 10]}
                            animationDuration={1500}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill="url(#barGradient)" />
                            ))}
                        </Bar>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueChart;