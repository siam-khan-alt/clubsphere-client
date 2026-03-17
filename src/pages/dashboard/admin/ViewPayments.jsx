import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiTrendingUp, FiSearch } from "react-icons/fi";
import AdminPaymentHistoryTable from "../../../components/dashboard/admin/AdminPaymentHistoyTable";
import DashboardHeader from "../../../components/shared/ui/DashboardHeader";
import ViewPaymentsSkeleton from "../../../components/shared/skeletons/admin/ViewPaymentsSkeleton";

const ViewPayments = () => {
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: payments = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["adminAllPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payments");
      return res.data;
    },
  });

  // Filtering Logic
  const filteredPayments = payments.filter((payment) => {
    let matchesTab = false;
    if (activeTab === "all") {
      matchesTab = true;
    } else if (activeTab === "event") {
      matchesTab = payment.type === "event";
    } else if (activeTab === "club") {
      matchesTab =
        payment.type === "membership" || (!!payment.clubId && !payment.eventId);
    }

    const searchQueryLower = searchQuery.toLowerCase();
    const matchesSearch =
      payment.userEmail?.toLowerCase().includes(searchQueryLower) ||
      payment.clubName?.toLowerCase().includes(searchQueryLower) ||
      payment.eventName?.toLowerCase().includes(searchQueryLower) ||
      payment.transactionId?.toLowerCase().includes(searchQueryLower);

    return matchesTab && matchesSearch;
  });

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  if (isLoading) return <ViewPaymentsSkeleton />;
  if (error)
    return (
      <div className="p-8 text-center text-error bg-card border-standard rounded-2xl">
        Error: {error.message}
      </div>
    );

  return (
    <div className="space-y-6 md:space-y-10 pb-10">
      <DashboardHeader
        title="Financial Ledger"
        description="Monitor all incoming revenue from events and club registrations."
        badgeText="Financial Node"
        showSmile={false}
      />

      {/* Revenue Overview Card */}
      <div className="bg-card border-standard rounded-3xl p-4 md:p-8 relative overflow-hidden group shadow-sm">
        <div className="absolute right-0 top-0 p-4 md:p-10 hidden md:flex opacity-10 group-hover:scale-110 transition-transform duration-500 text-primary">
          <FiTrendingUp size={100} />
        </div>
        <div className="relative z-10">
          <p className="text-[10px] text-center md:text-left font-black uppercase tracking-[0.3em] text-text-body opacity-60">
            Cumulative Platform{" "}
            <span className="md:hidden flex">
              <br />
            </span>{" "}
            Revenue
          </p>
          <div className="flex justify-center md:justify-start items-center md:items-baseline gap-2 mt-3">
            <span className="text-4xl md:text-6xl  text-primary text-text-heading tracking-tighter">
              $
              {totalRevenue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
            <span className="text-sm font-black text-primary uppercase tracking-widest">
              USD
            </span>
          </div>
        </div>
      </div>

      {/* Controls Section: Search & Tabs */}
      <div className="flex flex-col xl:flex-row gap-4 md:gap-6 items-center justify-between border-b border-primary/50 pb-6 md:pb-8">
        {/* Tabs Container */}
        <div className="flex gap-1.5 md:gap-2 bg-card border-standard p-1 md:p-1.5 rounded-2xl w-full xl:w-auto overflow-x-auto no-scrollbar">
          {["all", "event", "club"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 xl:flex-none px-4 md:px-8 py-2 md:py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-text-body opacity-50 hover:opacity-100"
              }`}
            >
              {tab}s
            </button>
          ))}
        </div>

        {/* Search Bar Container */}
        <div className="relative w-full xl:w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-sm md:text-base" />
          <input
            type="text"
            placeholder="SEARCH..."
            className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 bg-card border-standard rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-primary/20 outline-none placeholder:opacity-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table Area */}
      <div className="relative w-full max-w-[85vw] border-standard md:max-w-full rounded-2xl ">
        {isFetching ? (
          <div className="w-full space-y-4  bg-card border-standard rounded-2xl">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 w-full bg-slate-100 dark:bg-slate-800/40 rounded-2xl animate-pulse"></div>
            ))}          
          </div>
        ) : filteredPayments.length > 0 ? (
          <AdminPaymentHistoryTable payments={filteredPayments} />
        ) : (
          <div className="bg-card border-standard rounded-2xl py-32 text-center">
             <p className="text-text-heading font-black uppercase tracking-[0.4em] text-xs opacity-40">No records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPayments;
