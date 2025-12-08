import React from 'react';
import { FiUsers, FiGlobe, FiDollarSign, FiClock, FiXCircle, FiCheckCircle, FiList } from 'react-icons/fi';
import StatCard from '../../../components/dashboard/admin/StatCard'
import MembershipChart from '../../../components/dashboard/admin/MembershipChart';

const AdminDashboard = () => {
    const dummyStats = {
        totalUsers: 1200,
        totalClubs: 45,
        totalRevenue: 52000,
        approvedClubs: 38, 
        pendingClubs: 5, 
        rejectedClubs: 2,  
        totalMemberships: 850,
    };
    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard Overview 📊</h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                
                <StatCard 
                    title="Total Users" 
                    value={dummyStats.totalUsers.toLocaleString()} 
                    icon={FiUsers} 
                    colorClass="border-l-4 border-blue-600"
                    bgColorClass="bg-white"
                    iconColorClass="bg-blue-500"
                />

                <StatCard 
                    title="Total Memberships" 
                    value={dummyStats.totalMemberships} 
                    icon={FiList} 
                    colorClass="border-l-4 border-purple-600"
                    bgColorClass="bg-white"
                    iconColorClass="bg-purple-500"
                />
                
                <StatCard 
                    title="Total Revenue" 
                    value={`$${dummyStats.totalRevenue.toLocaleString()}`} 
                    icon={FiDollarSign} 
                    colorClass="border-l-4 border-yellow-600"
                    bgColorClass="bg-white"
                    iconColorClass="bg-yellow-500"
                />

                <StatCard 
                    title="Total Clubs" 
                    value={dummyStats.totalClubs} 
                    icon={FiGlobe} 
                    colorClass="border-l-4 border-green-600"
                    bgColorClass="bg-white"
                    iconColorClass="bg-green-500"
                />
                
                
                <StatCard 
                    title="Approved Clubs" 
                    value={dummyStats.approvedClubs} 
                    icon={FiCheckCircle} 
                    colorClass="border-l-4 border-emerald-600"
                    bgColorClass="bg-white"
                    iconColorClass="bg-emerald-500"
                />

                 <StatCard 
                    title="Pending Clubs" 
                    value={dummyStats.pendingClubs} 
                    icon={FiClock} 
                    colorClass="border-l-4 border-orange-600"
                    bgColorClass="bg-white"
                    iconColorClass="bg-orange-500"
                />
                
                 <StatCard 
                    title="Rejected Clubs" 
                    value={dummyStats.rejectedClubs} 
                    icon={FiXCircle} 
                    colorClass="border-l-4 border-red-600"
                    bgColorClass="bg-white"
                    iconColorClass="bg-red-500"
                />
                
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <MembershipChart />
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Platform Activity</h2>
                    <ul className="space-y-3 text-gray-600">
                        <li className="p-3 bg-gray-50 rounded-md border-l-2 border-green-400">✅ New Club 'Photography Pro' Approved.</li>
                        <li className="p-3 bg-gray-50 rounded-md border-l-2 border-blue-400">👤 New User registered: user@example.com</li>
                        <li className="p-3 bg-gray-50 rounded-md border-l-2 border-yellow-400">💳 Membership Payment of $25 received.</li>
                        <li className="p-3 bg-gray-50 rounded-md border-l-2 border-red-400">🛑 Club 'Gaming Guild' registration rejected.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
