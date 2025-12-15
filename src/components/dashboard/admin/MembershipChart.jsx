import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const MembershipChart = ({ chartData=[]}) => {
    if (chartData.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md h-[400px] flex items-center justify-center">
                <h4 className="text-xl font-semibold text-gray-500">No membership data available for charting.</h4>
            </div>
        );
    }
    const formattedData = chartData.map(item => ({
        name: item.clubName,
        members: item.memberCount || 0, 
    }));
    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-[400px]">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Memberships by Club Category</h4>
            <ResponsiveContainer width="100%" height="85%">
                <BarChart
                    data={formattedData}
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