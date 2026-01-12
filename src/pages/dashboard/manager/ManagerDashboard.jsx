import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import {
  FiCalendar,
  FiChevronRight,
  FiDollarSign,
  FiStar,
  FiUsers,
  FiActivity,
  FiPlusCircle,
  FiBriefcase,
} from "react-icons/fi";
import StatCard from "../../../components/dashboard/admin/StatCard";
import { Link } from "react-router-dom";

const ManagerDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: stats = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["managerStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/stats");
      return res.data;
    },
  });

  const {
    totalClubs = 0,
    totalMembers = 0,
    totalEvents = 0,
    totalRevenue = 0,
  } = stats;

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="text-error p-4 bg-error/10 rounded-2xl font-bold">
        Failed to load dashboard statistics.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-8">
      <h2 className="text-2xl font-black flex items-center gap-3 text-base-content">
        <FiActivity className="text-primary" /> Manager Overview
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Clubs Managed"
          value={totalClubs}
          icon={FiStar}
          color="text-indigo-500"
        />
        <StatCard
          title="Total Members"
          value={totalMembers}
          icon={FiUsers}
          color="text-emerald-500"
        />
        <StatCard
          title="Total Events"
          value={totalEvents}
          icon={FiCalendar}
          color="text-orange-500"
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={FiDollarSign}
          color="text-blue-500"
        />
      </div>

      <div className="space-y-6">
        <h4 className="text-lg font-black flex items-center gap-2 text-base-content/70 uppercase tracking-widest text-xs">
          <FiBriefcase className="text-primary" /> Quick Actions
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/dashboard/clubManager/createClub"
            className="group p-6 bg-base-100 rounded-2xl border border-base-content/5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <FiPlusCircle size={24} />
              </div>
              <div>
                <span className="block text-lg font-black text-base-content">
                  Create New Club
                </span>
                <span className="text-xs font-bold text-base-content/40 uppercase">
                  Setup a new community
                </span>
              </div>
            </div>
            <FiChevronRight className="text-base-content/20 group-hover:text-primary transition-transform group-hover:translate-x-1" size={20} />
          </Link>

          <Link
            to="/dashboard/clubManager/events"
            className="group p-6 bg-base-100 rounded-2xl border border-base-content/5 shadow-sm hover:shadow-md hover:border-emerald-500/20 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <FiCalendar size={24} />
              </div>
              <div>
                <span className="block text-lg font-black text-base-content">
                  Manage Events
                </span>
                <span className="text-xs font-bold text-base-content/40 uppercase">
                  Schedule & Track
                </span>
              </div>
            </div>
            <FiChevronRight className="text-base-content/20 group-hover:text-emerald-500 transition-transform group-hover:translate-x-1" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;