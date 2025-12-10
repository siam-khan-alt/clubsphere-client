import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { FiCalendar, FiChevronRight, FiDollarSign, FiStar, FiUsers } from 'react-icons/fi';
import StatCard from '../../../components/dashboard/admin/StatCard';

const ManagerDashboard = () => {
     const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading, isError } = useQuery({
        queryKey: ['managerStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/manager/stats');
            return res.data; 
        }
    });

    const { 
        totalClubs = 0, 
        totalMembers = 0, 
        totalEvents = 0, 
        totalRevenue = 0 
    } = stats;

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div className="text-center p-10 text-red-600">Failed to load dashboard statistics.</div>;
    }
    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Manager Overview</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard 
                    title="Clubs Managed" 
                    value={totalClubs} 
                    icon={FiStar} 
                    bgColorClass="bg-white"
                    colorClass="text-indigo-600"
                    iconColorClass="bg-indigo-600"
                />
                <StatCard 
                    title="Total Members" 
                    value={totalMembers} 
                    icon={FiUsers} 
                    bgColorClass="bg-white"
                    colorClass="text-green-600"
                    iconColorClass="bg-green-600"
                />
                <StatCard 
                    title="Total Events" 
                    value={totalEvents} 
                    icon={FiCalendar} 
                    bgColorClass="bg-white"
                    colorClass="text-yellow-600"
                    iconColorClass="bg-yellow-600"
                />
                <StatCard 
                    title="Total Revenue" 
                    value={`$${totalRevenue.toFixed(2)}`} 
                    icon={FiDollarSign} 
                    bgColorClass="bg-white"
                    colorClass="text-blue-600"
                    iconColorClass="bg-blue-600"
                />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a 
                    href="/dashboard/clubManager/createClub" 
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-200 border border-gray-100"
                >
                    <span className="text-lg font-semibold text-indigo-600">Create New Club</span>
                    <FiChevronRight className="w-5 h-5 text-indigo-500" />
                </a>
                <a 
                    href="/dashboard/clubManager/events" 
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-200 border border-gray-100"
                >
                    <span className="text-lg font-semibold text-green-600">Manage Events</span>
                    <FiChevronRight className="w-5 h-5 text-green-500" />
                </a>
            </div>
        </div>
    );
};

export default ManagerDashboard;

