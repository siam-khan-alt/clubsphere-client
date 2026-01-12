import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import ClubCard from '../components/public/ClubCard';
import axios from 'axios';
import { motion } from 'framer-motion'; 
import { FiFilter, FiSearch, FiInbox, FiAlertCircle } from 'react-icons/fi';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const categories = ["All", "Technology", "Photography", "Sports", "Book Club", "Art & Design", "Hiking & Travel", "Music & Film", "Food & Cooking"];

const Clubs = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest'); 
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data: clubs, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['publicClubs', debouncedSearch, category, sort],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (category !== 'All') params.append('category', category);
      if (sort) params.append('sort', sort);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/clubs?${params.toString()}`);
      return res.data;
    },
  });

  if (isError) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-base-100">
      <FiAlertCircle size={50} className="text-error mb-4" />
      <h5 className="text-3xl font-bold text-error">Error Loading Clubs</h5>
      <p className="opacity-70 mt-2">{error.message}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-6">
          <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black italic uppercase tracking-tighter">
            Explore Local <span className="text-primary not-italic">Clubs</span>
          </motion.h2>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row gap-4 mb-12 p-6 bg-base-200/50 backdrop-blur-md rounded-2xl border border-base-content/5 shadow-sm">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
            <input type="text" placeholder="Search club name..." className="w-full pl-11 focus:ring-2 focus:ring-primary h-12 rounded-xl border-base-content/10 bg-base-100" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1">
                <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 z-10" />
                <select className="w-full pl-11 h-12 rounded-xl bg-base-100 border-base-content/10" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <select className="flex-1 h-12 rounded-xl bg-base-100 border-base-content/10" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Sort By: Newest First</option>
              <option value="oldest">Sort By: Oldest First</option>
              <option value="fee_desc">Fee: High to Low</option>
              <option value="fee_asc">Fee: Low to High</option>
            </select>
          </div>
        </motion.div>

        <div className="relative min-h-[400px]">
          {(isLoading || isFetching) && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-base-100/10 backdrop-blur-[2px]">
               <LoadingSpinner />
            </div>
          )}

          {!isLoading && clubs?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clubs.map((club, index) => (
                <motion.div key={club._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                  <ClubCard club={club} />
                </motion.div>
              ))}
            </div>
          ) : !isLoading && (
            <div className="text-center py-24 border-2 border-dashed border-base-content/10 rounded-3xl flex flex-col items-center">
              <FiInbox size={48} className="text-primary mb-4 opacity-50" />
              <h3 className="text-2xl font-bold opacity-80 uppercase tracking-widest">No Clubs Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clubs;