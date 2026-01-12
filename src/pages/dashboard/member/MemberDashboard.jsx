import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiUsers, FiCalendar, FiActivity, FiArrowRight, FiSmile } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import StatCard from '../../../components/dashboard/admin/StatCard';

const MemberDashboard = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: memberData, isLoading, error } = useQuery({
        queryKey: ['memberOverviewStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/member/stats-and-upcoming-events'); 
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-error p-4 bg-error/10 rounded-2xl">Error: {error.message}</div>;

    const { totalClubsJoined = 0, totalEventsRegistered = 0, upcomingEvents = [] } = memberData;

    return (
        <div className="p-4 space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-black text-base-content flex items-center gap-3">
                    <FiSmile className="text-primary" /> Welcome back, {user?.displayName || 'Member'}!
                </h2>
                <p className="text-base-content/60 font-medium">Here's a quick look at your ClubSphere activities.</p>
            </div>

            <div className="space-y-4">
                <h4 className="text-lg font-bold flex items-center gap-2 text-base-content/80">
                    <FiActivity className="text-secondary" /> My Snapshot
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatCard
                        title="Total Clubs Joined" 
                        value={totalClubsJoined} 
                        icon={FiUsers} 
                        colorClass="text-primary" 
                        bgColorClass="bg-base-100 border border-base-content/5 rounded-2xl shadow-sm"
                        iconColorClass="bg-primary/10 text-primary"
                    />
                    <StatCard 
                        title="Total Events Registered" 
                        value={totalEventsRegistered} 
                        icon={FiCalendar} 
                        colorClass="text-secondary" 
                        bgColorClass="bg-base-100 border border-base-content/5 rounded-2xl shadow-sm"
                        iconColorClass="bg-secondary/10 text-secondary" 
                    />
                </div>
            </div>

            <div className="bg-base-100 p-6 rounded-2xl border border-base-content/5 shadow-sm">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-3 text-base-content">
                    <FiCalendar className="text-error" /> Upcoming Events from My Clubs
                </h4>

                {upcomingEvents.length === 0 ? (
                    <div className="text-center py-10 bg-base-200/30 rounded-2xl border border-dashed border-base-content/20">
                        <p className="text-base-content/50 font-medium">No upcoming events found from your active clubs.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {upcomingEvents.map((event) => (
                            <Link to={`/events/${event._id}`} key={event._id} className="group block bg-base-200/30 hover:bg-base-200/60 p-5 rounded-2xl border border-transparent hover:border-primary/20 transition-all duration-300">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-bold text-base-content group-hover:text-primary transition-colors">{event.title}</p>
                                        <p className="text-sm text-base-content/60 mt-1 font-medium">
                                            <span className="text-primary">{event.clubName}</span> • 
                                            {format(new Date(event.eventDate), ' MMM d, yyyy')} • {event.location}
                                        </p>
                                    </div>
                                    <FiArrowRight className="text-base-content/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                <div className="mt-8 text-center md:text-right">
                    <Link to="/dashboard/member/events" className="btn btn-ghost btn-sm text-primary hover:bg-primary/10 rounded-2xl font-bold">
                        View All Registered Events <FiArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default MemberDashboard;