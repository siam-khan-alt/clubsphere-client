import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { FiSearch, FiInbox, FiAlertCircle, FiFilter } from 'react-icons/fi';
import EventCard from '../components/public/EventCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const Events = () => {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({ sort: 'eventDate', order: 'asc' });

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(handler);
    }, [search]);

    const { data: events = [], isLoading, isFetching, isError, error } = useQuery({
        queryKey: ['allEvents', debouncedSearch, sortConfig], 
        queryFn: async () => {
            const params = {
                search: debouncedSearch,
                sort: sortConfig.sort,
                order: sortConfig.order
            };
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/events`, { params }); 
            return res.data;
        },
    });

    const handleSortChange = (e) => {
        const [sort, order] = e.target.value.split('-');
        setSortConfig({ sort, order });
    };

    if (isError) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-base-100">
            <FiAlertCircle size={50} className="text-error mb-4" />
            <h5 className="text-3xl font-bold text-error mb-2">Error Loading Events</h5>
            <p className="text-xs opacity-40">{error.message}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-base-100 transition-colors duration-300">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-6">
                    <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black italic uppercase tracking-tighter">
                        Upcoming <span className="text-primary not-italic">Events</span>
                    </motion.h2>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col lg:flex-row gap-4 mb-12 p-6 bg-base-200/50 backdrop-blur-md rounded-2xl border border-base-content/5 shadow-sm"
                >
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
                        <input
                            type="text"
                            placeholder="Search by event title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 focus:ring-2 focus:ring-primary h-12 rounded-xl bg-base-100 border-base-content/10"
                        />
                    </div>
                    
                    <div className="relative w-full lg:w-72">
                        <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 z-10" />
                        <select
                            value={`${sortConfig.sort}-${sortConfig.order}`}
                            onChange={handleSortChange}
                            className="w-full h-12 pl-11 cursor-pointer appearance-none rounded-xl bg-base-100 border-base-content/10"
                        >
                            <option value="eventDate-asc">Date: Soonest First</option>
                            <option value="eventDate-desc">Date: Latest First</option>
                            <option value="createdAt-desc">Recently Added</option>
                        </select>
                    </div>
                </motion.div>

                <div className="relative min-h-[400px]">
                    {(isLoading || isFetching) && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-base-100/10 backdrop-blur-[2px]">
                            <LoadingSpinner />
                        </div>
                    )}

                    {!isLoading && events.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {events.map((event, index) => (
                                <motion.div
                                    key={event._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <EventCard event={event} />
                                </motion.div>
                            ))}
                        </div>
                    ) : !isLoading && (
                        <div className="text-center py-24 border-2 border-dashed border-base-content/10 rounded-2xl flex flex-col items-center">
                            <FiInbox size={48} className="text-primary mb-4 opacity-50" />
                            <h3 className="text-2xl font-bold opacity-80 uppercase tracking-widest">No Events Found</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;