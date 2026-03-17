import React, { use } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthContext";
import {
  FiCalendar, FiChevronRight, FiDollarSign, FiStar, 
  FiUsers, FiActivity, FiPlusCircle, FiBriefcase, FiBarChart2
} from "react-icons/fi";
import StatCard from "../../../components/dashboard/admin/StatCard";
import DashboardHeader from "../../../components/shared/ui/DashboardHeader";
import { Link } from "react-router-dom";
import { MembersBarChart, RevenueAreaChart, EventPerformanceChart } from "../../../components/dashboard/manager/ManagerCharts";
import ManagerDashboardSkeleton from "../../../components/shared/skeletons/manager/ManagerDashboardSkeleton";

const ChartContainer = ({ title, children, icon: Icon }) => (
  <div className="bg-card border-standard p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-500 space-y-6">
    <div className="flex items-center gap-3 border-b border-primary/50 pb-4">
      <div className="p-2 rounded-lg bg-primary/5 text-primary"><Icon size={20} /></div>
      <h4 className="text-lg font-black text-text-heading">{title}</h4>
    </div>
    <div className="h-[300px] w-full">{children}</div>
  </div>
);

const ManagerDashboard = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading, isError } = useQuery({
    queryKey: ["managerStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/stats");
      return res.data;
    },
  });

  const { totalClubs = 0, totalMembers = 0, totalEvents = 0, totalRevenue = 0, charts = {} } = stats;

  if (isLoading) return <ManagerDashboardSkeleton />;
  if (isError) return <div className="p-6 bg-red-500/10 text-red-500 rounded-2xl">Failed to load stats.</div>;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      <DashboardHeader 
        title={`Welcome, ${user?.displayName?.split(' ')[0] || 'Manager'}!`}
        description={<p>Managing <span className="text-primary font-bold">{totalClubs} clubs</span>. Here is your overview.</p>}
        badgeText="Manager Console"
        buttonText="Create New Club"
        buttonLink="/dashboard/clubManager/createClub"
        showSmile={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Clubs Managed" value={totalClubs} icon={FiStar} colorClass="text-primary" iconColorClass="bg-primary/10 text-primary" />
        <StatCard title="Total Members" value={totalMembers} icon={FiUsers} colorClass="text-secondary" iconColorClass="bg-secondary/10 text-secondary" />
        <StatCard title="Total Events" value={totalEvents} icon={FiCalendar} colorClass="text-amber-500" iconColorClass="bg-amber-500/10 text-amber-500" />
        <StatCard title="Total Revenue" value={totalRevenue} icon={FiDollarSign} colorClass="text-emerald-500" iconColorClass="bg-emerald-500/10 text-emerald-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ChartContainer title="Members per Club" icon={FiUsers}>
          <MembersBarChart data={charts.clubMembers} />
        </ChartContainer>

        <ChartContainer title="Club Revenue ($)" icon={FiDollarSign}>
          <RevenueAreaChart data={charts.clubRevenue} />
        </ChartContainer>

        <div className="xl:col-span-2">
          <ChartContainer title="Event Performance Analytics" icon={FiBarChart2}>
            <EventPerformanceChart data={charts.eventRevenue} />
          </ChartContainer>
        </div>
      </div>

    </div>
  );
};

export default ManagerDashboard;