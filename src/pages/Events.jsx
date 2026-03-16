import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { FiSearch, FiInbox, FiAlertCircle, FiFilter, FiChevronDown, FiCheck, FiCalendar } from 'react-icons/fi';
import EventCard from '../components/public/EventCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const sortOptions = [
  { label: "Soonest First", value: "eventDate-asc" },
  { label: "Latest First", value: "eventDate-desc" },
  { label: "Recently Added", value: "createdAt-desc" },
];

const Events = () => {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({ sort: 'eventDate', order: 'asc' });
    const [isSortOpen, setIsSortOpen] = useState(false);

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

    const handleSortSelect = (val) => {
        const [sort, order] = val.split('-');
        setSortConfig({ sort, order });
        setIsSortOpen(false);
    };

    if (isError) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background">
            <FiAlertCircle size={50} className="text-error mb-4 animate-bounce" />
            <h2 className="text-2xl font-black uppercase tracking-tight text-error">System Error</h2>
            <p className="text-text-body mt-2 font-medium">{error.message}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Decorative */}
            <div className="plaid-bg absolute inset-0 opacity-[0.05] pointer-events-none"></div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                
                {/* --- Custom H2 Heading (Matches Clubs Page) --- */}
                <div className="mb-12">
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }}
                        className="!mb-2"
                    >
                        Witness the <span className="not-italic">Grand Occasions</span>
                    </motion.h2>
                    <p className="text-center text-text-body font-medium opacity-60">Don't miss out on the next big thing.</p>
                </div>

                {/* --- UNIQUE FLOATING CONTROL BAR --- */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        
                        {/* Unique Search Bar with Glow */}
                        <div className="relative w-full md:flex-grow group">
                            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-full"></div>
                            <div className="relative flex items-center bg-card border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-1 focus-within:border-primary transition-all shadow-sm">
                                <FiSearch className="text-primary mr-3 text-lg" />
                                <input 
                                    type="text" 
                                    placeholder="Search event title..." 
                                    className="w-full py-4 bg-transparent border-none focus:ring-0 text-text-heading font-medium"
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)} 
                                />
                            </div>
                        </div>

                        {/* Custom Sort Dropdown (No Default Select) */}
                        <div className="relative w-full md:w-72">
                            <button 
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="w-full flex items-center justify-between px-6 py-4.5 bg-card border border-slate-200 dark:border-slate-800 rounded-2xl text-text-heading font-bold shadow-sm hover:border-secondary transition-all"
                            >
                                <div className="flex items-center gap-2">
                                    <FiCalendar className="text-secondary" />
                                    <span className="text-sm">
                                        {sortOptions.find(o => o.value === `${sortConfig.sort}-${sortConfig.order}`)?.label}
                                    </span>
                                </div>
                                <FiChevronDown className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isSortOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-[110%] left-0 w-full bg-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-[50] py-2 overflow-hidden"
                                    >
                                        {sortOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => handleSortSelect(opt.value)}
                                                className={`w-full flex items-center justify-between px-5 py-3 text-sm font-semibold transition-colors hover:bg-primary/10 hover:text-primary ${`${sortConfig.sort}-${sortConfig.order}` === opt.value ? 'text-primary bg-primary/5' : 'text-text-body'}`}
                                            >
                                                {opt.label}
                                                {`${sortConfig.sort}-${sortConfig.order}` === opt.value && <FiCheck />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                </div>

                {/* Results Section */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode='wait'>
                        {(isLoading || isFetching) && (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 flex items-center justify-center bg-background/50 backdrop-blur-[2px]"
                            >
                                <LoadingSpinner />
                            </motion.div>
                        )}
                    </AnimatePresence>

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
                        <div className="text-center py-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col items-center">
                            <FiInbox size={48} className="text-primary mb-4 opacity-30" />
                            <h3 className="text-2xl font-black text-text-heading opacity-50 uppercase tracking-widest !bg-none !-webkit-text-fill-color-inherit">
                                No Events Found
                            </h3>
                            <button 
                                onClick={() => {setSearch(''); setSortConfig({ sort: 'eventDate', order: 'asc' });}}
                                className="mt-4 text-primary font-bold hover:underline"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;