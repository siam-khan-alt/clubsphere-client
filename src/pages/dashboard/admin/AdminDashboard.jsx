import React from 'react';
import { FiUsers, FiGlobe, FiDollarSign, FiClock, FiXCircle, FiCheckCircle, FiList, FiActivity } from 'react-icons/fi';
import StatCard from '../../../components/dashboard/admin/StatCard'
import MembershipChart from '../../../components/dashboard/admin/MembershipChart';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';

const AdminDashboard = () => {
    const axiosSecure=useAxiosSecure()
    const { data: adminStats = {}, isLoading, error } = useQuery({
        queryKey: ['adminDashboardStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/stats'); 
            return res.data;
        }
    });
    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500 p-4">Error loading stats: {error.message}</div>;
    const {
        totalUsers = 0,
        totalClubs = 0,
        totalRevenue = 0,
        totalMemberships = 0,
        totalEvents = 0,
        approvedClubs = 0,
        pendingClubs = 0,
        rejectedClubs = 0,
        membershipsByClub = []
    } = adminStats;
    console.log(membershipsByClub);
    
    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className=" mb-6">Admin Dashboard Overview 📊</h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                
                <StatCard 
                    title="Total Users" 
                    value={totalUsers.toLocaleString()} 
                    icon={FiUsers} 
                    colorClass="border-l-4 border-blue-600"
                    bgColorClass="bg-white"
                    iconColorClass="bg-blue-500"
                />

                <StatCard 
                    title="Total Memberships" 
                    value={totalMemberships.toLocaleString()} 
                    icon={FiList} 
                    colorClass="border-l-4 border-purple-600"
                    bgColorClass="bg-white"
                    iconColorClass="bg-purple-500"
                />
                
                <StatCard 
                    title="Total Revenue" 
                    value={totalRevenue.toLocaleString()} 
                    icon={FiDollarSign} 
                    colorClass="border-l-4 border-yellow-600"
                    bgColorClass="bg-white"
                    iconColorClass="bg-yellow-500"
                />

                <StatCard 
                    title="Total Clubs" 
                    value={totalClubs.toLocaleString()} 
                    icon={FiGlobe} 
                    colorClass="border-l-4 border-green-600"
                    bgColorClass="bg-white"
                    iconColorClass="bg-green-500"
                />
                
                
                <StatCard 
                    title="Approved Clubs" 
                    value={approvedClubs.toLocaleString()} 
                    icon={FiCheckCircle} 
                    colorClass="border-l-4 border-emerald-600"
                    bgColorClass="bg-white"
                    iconColorClass="bg-emerald-500"
                />

                 <StatCard 
                    title="Pending Clubs" 
                    value={pendingClubs.toLocaleString()} 
                    icon={FiClock} 
                    colorClass="border-l-4 border-orange-600"
                    bgColorClass="bg-white"
                    iconColorClass="bg-orange-500"
                />
                
                 <StatCard 
                    title="Rejected Clubs" 
                    value={rejectedClubs.toLocaleString()} 
                    icon={FiXCircle} 
                    colorClass="border-l-4 border-red-600"
                    bgColorClass="bg-white"
                    iconColorClass="bg-red-500"
                />
                <StatCard 
                    title="Total Events" 
                    value={totalEvents.toLocaleString()} 
                    icon={FiActivity} 
                    colorClass="border-l-4 border-sky-600"
                    bgColorClass="bg-white"
                    iconColorClass="bg-sky-500"
                />
                
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <MembershipChart chartData={membershipsByClub}/>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className=" mb-4">Recent Platform Activity</h4>
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
