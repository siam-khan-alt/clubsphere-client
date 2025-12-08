import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
    { name: 'Photography', members: 350 },
    { name: 'Tech', members: 420 },
    { name: 'Hiking', members: 210 },
    { name: 'Book', members: 180 },
    { name: 'Sports', members: 600 },
];

const MembershipChart = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-[400px]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Memberships by Club Category</h2>
            <ResponsiveContainer width="100%" height="85%">
                <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#333" />
                    <YAxis stroke="#333" />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
                        formatter={(value) => [`${value} Members`, 'Members']}
                    />
                    <Legend />
                    <Bar dataKey="members" fill="#3B82F6" name="Total Members" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MembershipChart;