import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import RegisteredEventsTable from '../../../components/member/RegisteredEventTable';
import DashboardHeader from '../../../components/shared/ui/DashboardHeader';
import { TableSkeleton } from '../../../components/shared/skeletons/user/payment/TableSkeletons';
import DashboardHeaderSkeleton from '../../../components/shared/skeletons/dashboadCommon/DashboardHeaderSkeleton';

const MyEvents = () => {
    const axiosSecure = useAxiosSecure();

    const { data: registrations = [], isLoading, error } = useQuery({
        queryKey: ['memberEvents'],
        queryFn: async () => {
            const res = await axiosSecure.get('/member/events'); 
            return res.data;
        }
    });

    // --- Loading State with Skelletons ---
    if (isLoading) return (
        <div className="space-y-10">
            <DashboardHeaderSkeleton />
            <div className="w-full max-w-[80vw] md:max-w-full overflow-hidden bg-card mx-auto rounded-2xl border-standard shadow-sm p-2">
                <TableSkeleton rows={8} />
            </div>
        </div>
    );

    if (error) return (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 font-bold animate-in fade-in">
            Error loading events: {error.message}
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            
            {/* --- Reusable Dashboard Header --- */}
            <DashboardHeader 
                title="My Event Registrations"
                description={
                    <p>
                        Review your upcoming schedules. You have <span className="text-secondary font-bold">{registrations.length} events</span> confirmed.
                    </p>
                }
                badgeText="Event Hub"
                buttonText="Browse New Events"
                buttonLink="/events"
                showSmile={true}
            />

            {/* --- Table Section --- */}
            <div className="w-full max-w-[80vw] md:max-w-full overflow-hidden bg-card mx-auto rounded-2xl border-standard shadow-sm transition-all duration-300">
                <div className="overflow-x-auto w-full">
                    {/* Header for Table (Optional but looks premium) */}
                    <div className="px-6 py-5 border-b border-primary/50 flex items-center justify-between bg-card/50">
                        <h4 className="font-black text-text-heading flex items-center gap-2">
                            <FiCalendar className="text-primary" /> Active Bookings
                        </h4>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
                            Synced in Real-time
                        </span>
                    </div>

                    <div className="inline-block min-w-full align-middle p-2">
                        <RegisteredEventsTable registrations={registrations} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyEvents;