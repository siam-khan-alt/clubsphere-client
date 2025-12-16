import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import { FaSearch, FaSortAmountDown, FaCalendarAlt, FaMapMarkerAlt, FaTag } from 'react-icons/fa';
import { format } from 'date-fns';
import { BounceLoader } from 'react-spinners';
const Events = () => {
    const navigate = useNavigate();

    const [params, setParams] = useState({
        search: '',
        sort: 'eventDate',
        order: 'asc' 
    });
    
    const { data: events = [], isLoading, error } = useQuery({
        queryKey: ['allEvents', params], 
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/events`, { params }); 
            return res.data;
        },
        staleTime: 1000 * 60 * 5, 
    });

    const handleSearchChange = (e) => {
        setParams(prev => ({ ...prev, search: e.target.value }));
    };

    const handleSortChange = (e) => {
        const [sort, order] = e.target.value.split('-');
        setParams(prev => ({ ...prev, sort, order }));
    };

    if (error) return <div className="text-center py-20 text-red-600">Error loading events: {error.message}</div>;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="text-center mb-12">
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=" inline-block"
            >
                Upcoming Events
            </motion.h2>
            <div 
                    className="h-1  mx-auto 
                                bg-gradient-to-r 
                                from-[#7C3AED] to-[#4F46E5] 
                                rounded-full mt-2" 
                ></div>
            </div>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-lg shadow-md"
            >
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search by event title..."
                        value={params.search}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                
                <div className="relative">
                    <select
                        value={`${params.sort}-${params.order}`}
                        onChange={handleSortChange}
                        className="appearance-none w-full md:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                    >
                        <option value="eventDate-asc">Sort by Date: Oldest First</option>
                        <option value="eventDate-desc">Sort by Date: Newest First</option>
                        <option value="createdAt-desc">Sort by Created: Newest First</option>
                        <option value="createdAt-asc">Sort by Created: Oldest First</option>
                    </select>
                    <FaSortAmountDown className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
                </div>
            </motion.div>
        {isLoading ? (
                <div className="flex items-center justify-center mt-20 w-full bg-[var(--color-bg-light)]/80 backdrop-blur-sm  inset-0 z-50 mx-auto">
                    <div className="flex flex-col items-center">
                        <BounceLoader 
                            color='#7C3AED' loading={true}
                        />
                        <p className="mt-6 text-xl font-semibold text-[#34495E] tracking-wider">
                            ClubSphere is Loading Events...
                        </p>
                    </div>
                </div>
            ) :
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <motion.div
                            key={event._id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border-t-4 border-indigo-500 flex flex-col justify-between"
                        >
                            <div className="p-6">
                                <h3 className="mb-2">{event.title}</h3>
                                
                                <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                                    <FaCalendarAlt /> 
                                    {format(new Date(event.eventDate), 'dd MMMM yyyy')}
                                </p>
                                
                                <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                                    <FaMapMarkerAlt /> {event.location}
                                </p>

                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-lg font-semibold text-green-600 flex items-center gap-2">
                                        <FaTag /> {event.isPaid ? `$${event.eventFee}` : 'FREE'}
                                    </span>
                                    <span className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition">
                                        Club: {event.clubDetails.clubName}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 pt-0">
                                <button 
                                    onClick={() => navigate(`/events/${event._id}`)}
                                    className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300 font-semibold"
                                >
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10">
                        <p className="text-xl text-gray-500">No events found matching your criteria.</p>
                    </div>
                )}
            </div>}
        </div>
    );
};

export default Events;




