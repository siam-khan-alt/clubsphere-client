import React from 'react';
import { FiUsers, FiGlobe, FiDollarSign, FiClock, FiXCircle, FiCheckCircle, FiList, FiActivity } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';

// Components
import StatCard from '../../../components/dashboard/admin/StatCard';
import MembershipChart from '../../../components/dashboard/admin/MembershipChart';
import RevenueChart from '../../../components/dashboard/admin/RevenueChart';
import ActivityFeed from '../../../components/dashboard/admin/ActivityFeed';
import DashboardHeader from '../../../components/shared/ui/DashboardHeader';

// Hooks
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import AdminDashboardSkeleton from '../../../components/shared/skeletons/admin/AdminDashboardSkeleton';

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();
    
    const { data: adminStats = {}, isLoading, error } = useQuery({
        queryKey: ['adminDashboardStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/stats');
            return res.data;
        }
    });

    if (isLoading) return <AdminDashboardSkeleton />;
    
    if (error) return (
        <div className="m-6 p-8 bg-error/10 border border-error/20 text-error rounded-2xl font-black uppercase text-xs tracking-widest text-center animate-pulse">
            Error loading platform statistics: {error.message}
        </div>
    );

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
        recentActivities = [],
        monthlyTrends = []
    } = adminStats;

    return (
        <div className="pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Premium Header */}
            <DashboardHeader 
                title="Admin Insights"
                description="Comprehensive overview of platform growth, revenue, and club activities."
                badgeText="System Admin"
            />

            <div className="container mx-auto mt-8 space-y-8">
                
                {/* Statistics Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard 
                        title="Total Users" 
                        value={totalUsers} 
                        icon={FiUsers} 
                        colorClass="text-primary" 
                        iconColorClass="bg-primary/10 text-primary" 
                    />
                    <StatCard 
                        title="Active Memberships" 
                        value={totalMemberships} 
                        icon={FiList} 
                        colorClass="text-secondary" 
                        iconColorClass="bg-secondary/10 text-secondary" 
                    />
                    <StatCard 
                        title="Total Revenue" 
                        value={`$${totalRevenue}`} 
                        icon={FiDollarSign} 
                        colorClass="text-primary" 
                        iconColorClass="bg-primary/10 text-primary" 
                    />
                    <StatCard 
                        title="Total Clubs" 
                        value={totalClubs} 
                        icon={FiGlobe} 
                        colorClass="text-secondary" 
                        iconColorClass="bg-secondary/10 text-secondary" 
                    />
                    <StatCard 
                        title="Approved Clubs" 
                        value={approvedClubs} 
                        icon={FiCheckCircle} 
                        colorClass="text-primary" 
                        iconColorClass="bg-primary/10 text-primary" 
                    />
                    <StatCard 
                        title="Pending Requests" 
                        value={pendingClubs} 
                        icon={FiClock} 
                        colorClass="text-secondary" 
                        iconColorClass="bg-secondary/10 text-secondary" 
                    />
                    <StatCard 
                        title="Rejected Clubs" 
                        value={rejectedClubs} 
                        icon={FiXCircle} 
                        colorClass="text-primary" 
                        iconColorClass="bg-primary/10 text-primary" 
                    />
                    <StatCard 
                        title="Platform Events" 
                        value={totalEvents} 
                        icon={FiActivity} 
                        colorClass="text-secondary" 
                        iconColorClass="bg-secondary/10 text-secondary" 
                    />
                </div>

                {/* Main Analytics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Charts Column (Takes 2/3 space) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Revenue Trends */}
                        <RevenueChart trends={monthlyTrends} />
                        
                        {/* Club Membership Bar Chart */}
                        <div className="bg-card border-standard rounded-2xl p-8 shadow-sm">
                            <MembershipChart chartData={membershipsByClub}/>
                        </div>
                    </div>

                    {/* Sidebar Column (Takes 1/3 space) */}
                    <div className="lg:col-span-1">
                        <ActivityFeed activities={recentActivities} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;