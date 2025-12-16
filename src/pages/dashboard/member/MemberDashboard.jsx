import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiUsers, FiCalendar, FiActivity } from 'react-icons/fi';
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
    if (error) return <div className="text-red-500 p-4">Error: {error.message}</div>;

    const { 
        totalClubsJoined = 0, 
        totalEventsRegistered = 0, 
        upcomingEvents = [] 
    } = memberData;

    return (
        <div className="p-4 space-y-8">
            <h2 >👋 Welcome back, {user?.displayName || 'Member'}!</h2>
            <p className="text-gray-600">Here's a quick look at your ClubSphere activities.</p>

            <h4 className=" border-b pb-2">📊 My Snapshot</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard
                  title="Total Clubs Joined" 
                    value={totalClubsJoined} 
                    icon={FiUsers} 
                    colorClass="text-indigo-600" 
                    bgColorClass="bg-white border border-indigo-100"
                    iconColorClass="bg-indigo-500"
                />
                <StatCard 
                   title="Total Events Registered" 
                    value={totalEventsRegistered} 
                    icon={FiCalendar} 
                    colorClass="text-amber-600" 
                    bgColorClass="bg-white border border-amber-100"
                    iconColorClass="bg-amber-500" 
                />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-xl">
                <h4 className=" mb-4 flex items-center">
                    <FiActivity className="w-6 h-6 mr-2 text-red-500" /> Upcoming Events from My Clubs
                </h4>
                <hr className="mb-4" />

                {upcomingEvents.length === 0 ? (
                    <p className="text-gray-500 py-4 text-center">No upcoming events found from your active clubs.</p>
                ) : (
                    <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                            <Link to={`/events/${event._id}`} key={event._id} className="block hover:bg-gray-50 p-4 border-l-4 border-indigo-500 rounded-lg transition duration-200">
                                <p className="text-lg font-semibold text-gray-900">{event.title}</p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium text-indigo-600">{event.clubName}</span> · 
                                    {format(new Date(event.eventDate), ' MMM d, yyyy - h:mm a')} · 
                                    {event.location}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
                <div className="mt-6 text-right">
                    <Link to="/dashboard/member/events" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        View All Registered Events &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MemberDashboard;