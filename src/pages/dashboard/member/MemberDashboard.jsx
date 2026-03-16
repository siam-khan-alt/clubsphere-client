import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiUsers, FiCalendar, FiArrowRight, FiZap, FiCheckCircle, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../context/AuthContext';
import StatCard from '../../../components/dashboard/admin/StatCard';
import { DashboardOverviewSkeleton } from '../../../components/shared/skeletons/user/dashboard/DashboardSkeletons';
import { EventListSkeleton } from '../../../components/shared/skeletons/user/dashboard/ListSkeletons';
import { SuggestedClubSkeleton } from '../../../components/shared/skeletons/user/dashboard/CardSkeletons';
import DashboardHeader from '../../../components/shared/ui/DashboardHeader';

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

   if (isLoading) return (
    <div className="space-y-10">
        <DashboardOverviewSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <EventListSkeleton />
            </div>
            <div>
                <SuggestedClubSkeleton />
            </div>
        </div>
    </div>
);
    if (error) return (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 font-bold">
            Error: {error.message}
        </div>
    );

    const { 
        totalClubsJoined = 0, 
        totalEventsRegistered = 0, 
        upcomingEvents = [], 
        suggestedClubs = [] 
    } = memberData;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* --- Reusable Header Section --- */}
            <DashboardHeader 
                title={`Hey, ${user?.displayName?.split(' ')[0] || 'Member'}!`}
                description={
                    <p>
                        Welcome back! You have <span className="text-primary font-bold">{upcomingEvents.length} events</span> scheduled in your calendar. 
                    </p>
                }
                buttonText="Explore New Clubs"
                buttonLink="/clubs"
                badgeText="Member Workspace"
                showSmile={true}
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Clubs Joined" 
                    value={totalClubsJoined} 
                    icon={FiUsers} 
                    colorClass="text-primary" 
                    bgColorClass="bg-card border-standard rounded-2xl shadow-sm transition-all hover:translate-y-[-4px]"
                    iconColorClass="bg-primary/10 text-primary"
                />
                <StatCard 
                    title="Events Booked" 
                    value={totalEventsRegistered} 
                    icon={FiCalendar} 
                    colorClass="text-secondary" 
                    bgColorClass="bg-card border-standard rounded-2xl shadow-sm transition-all hover:translate-y-[-4px]"
                    iconColorClass="bg-secondary/10 text-secondary" 
                />
                <div className="bg-card border-standard rounded-2xl p-6 shadow-sm flex items-center gap-5 transition-all hover:translate-y-[-4px]">
                    <div className="p-4 rounded-xl bg-green-500/10 text-green-500">
                        <FiCheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Status</p>
                        <p className="text-xl font-bold text-text-heading">Verified Member</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                {/* Upcoming Events Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h4 className="text-xl font-bold text-text-heading flex items-center gap-2">
                            <FiCalendar className="text-primary" /> Upcoming Events
                        </h4>
                        <Link to="/dashboard/member/events" className="text-sm font-bold text-primary hover:underline">View All</Link>
                    </div>

                    <div className="space-y-4">
                        {upcomingEvents.length === 0 ? (
                            <div className="py-12 text-center bg-card border-standard border-dashed rounded-2xl">
                                <p className="text-text-body opacity-50 font-medium">No upcoming events found.</p>
                            </div>
                        ) : (
                            upcomingEvents.map((event) => (
                                <Link 
                                    to={`/events/${event._id}`} 
                                    key={event._id} 
                                    className="group flex items-center gap-5 p-5 rounded-2xl bg-card border-standard hover:border-primary/30 transition-all shadow-sm"
                                >
                                    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-primary/5 text-primary shrink-0 border border-primary/10 font-black">
                                        <span className="text-[10px] uppercase">{format(new Date(event.eventDate), 'MMM')}</span>
                                        <span className="text-lg">{format(new Date(event.eventDate), 'dd')}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-bold text-text-heading group-hover:text-primary transition-colors">{event.title}</h5>
                                        <p className="text-xs text-text-body opacity-70 mt-1 flex items-center gap-2">
                                            <span className="font-bold text-secondary">{event.clubName}</span> • <FiMapPin size={10}/> {event.location}
                                        </p>
                                    </div>
                                    <FiArrowRight className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* Discover Clubs Sidebar */}
                <div className="space-y-6">
                    <h4 className="text-xl font-bold text-text-heading flex items-center gap-2">
                        <FiZap className="text-yellow-500 animate-pulse" /> Discover Clubs
                    </h4>
                    <div className="space-y-4">
                        {suggestedClubs.map((club) => (
                            <div key={club._id} className="bg-card border-standard rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300">
                                <div className="h-24 overflow-hidden">
                                    <img src={club.bannerImage} alt="" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-4">
                                    <span className="text-[9px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-full uppercase tracking-tighter border border-primary/10">
                                        {club.category}
                                    </span>
                                    <h6 className="font-bold text-text-heading mt-2 text-sm line-clamp-1">{club.clubName}</h6>
                                    <Link to={`/club/${club._id}`} className="mt-3 text-[11px] font-black text-secondary flex items-center gap-1 uppercase tracking-widest hover:gap-2 transition-all">
                                        Details <FiArrowRight />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDashboard;