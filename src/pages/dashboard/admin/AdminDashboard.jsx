import React from 'react';
import { FiUsers, FiGlobe, FiDollarSign, FiClock, FiXCircle, FiCheckCircle, FiList, FiActivity } from 'react-icons/fi';
import StatCard from '../../../components/dashboard/admin/StatCard'
import MembershipChart from '../../../components/dashboard/admin/MembershipChart';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure()
    const { data: adminStats = {}, isLoading, error } = useQuery({
        queryKey: ['adminDashboardStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/stats'); 
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-error p-4 bg-error/10 rounded-2xl font-bold">Error loading stats: {error.message}</div>;

    const {
        totalUsers = 0,
        totalClubs = 0,
        totalRevenue = 0,
        totalMemberships = 0,
        totalEvents = 0,
        approvedClubs = 0,
        pendingClubs = 0,
        rejectedClubs = 0,
        membershipsByClub = [],
        recentActivities = []
    } = adminStats;
    
    return (
        <div className="p-4 container mx-auto space-y-8">
            <h2 className="text-xl sm:text-2xl font-black flex items-center gap-3 text-base-content">
                <FiActivity className="text-primary" /> Admin Dashboard Overview
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Users" value={totalUsers} icon={FiUsers} color="text-blue-500" />
                <StatCard title="Total Memberships" value={totalMemberships} icon={FiList} color="text-purple-500" />
                <StatCard title="Total Revenue" value={totalRevenue} icon={FiDollarSign} color="text-yellow-500" />
                <StatCard title="Total Clubs" value={totalClubs} icon={FiGlobe} color="text-green-500" />
                <StatCard title="Approved Clubs" value={approvedClubs} icon={FiCheckCircle} color="text-emerald-500" />
                <StatCard title="Pending Clubs" value={pendingClubs} icon={FiClock} color="text-orange-500" />
                <StatCard title="Rejected Clubs" value={rejectedClubs} icon={FiXCircle} color="text-red-500" />
                <StatCard title="Total Events" value={totalEvents} icon={FiActivity} color="text-sky-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MembershipChart chartData={membershipsByClub}/>
                
                <div className="bg-base-100 p-6 rounded-2xl border border-base-content/5 shadow-sm">
                    <h4 className="text-lg font-black mb-6 flex items-center gap-2">
                        <FiActivity className="text-primary" /> Recent Platform Activity </h4>
                   <ul className="space-y-4">
                        {recentActivities.length > 0 ? (
                            recentActivities.map((activity, index) => (
                                <li key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-base-200 transition-colors border border-transparent hover:border-base-content/5">
                                    <div className={`flex-shrink-0 p-2.5 rounded-xl flex items-center justify-center ${
                                        activity.color === 'green' ? 'bg-green-100 text-green-600' :
                                        activity.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                        activity.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                                    }`}>
                                        {activity.color === 'green' && <FiCheckCircle size={18} />}
                                        {activity.color === 'blue' && <FiUsers size={18} />}
                                        {activity.color === 'yellow' && <FiDollarSign size={18} />}
                                        {activity.color === 'red' && <FiXCircle size={18} />}
                                    </div>
                                    <span className="text-sm font-bold text-base-content/80 leading-snug">
                                        {activity.text}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <div className="text-center py-10 text-base-content/30 text-sm font-bold">
                                No recent activities found.
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;