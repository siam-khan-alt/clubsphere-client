import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import ClubCard from '../components/public/ClubCard';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion'; 
import { FiFilter, FiSearch, FiInbox, FiAlertCircle, FiChevronDown, FiCheck } from 'react-icons/fi';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const categories = ["All", "Technology", "Photography", "Sports", "Book Club", "Art & Design", "Hiking & Travel", "Music & Film", "Food & Cooking"];
const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Price: High to Low", value: "fee_desc" },
  { label: "Price: Low to High", value: "fee_asc" },
];

const Clubs = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest'); 
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  // Custom Dropdown States
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="plaid-bg absolute inset-0 opacity-[0.05] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* --- Heading --- */}
        <div className="mb-12">
          <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            Discover Your <span className="not-italic">Creative Empire</span>
          </motion.h2>
        </div>

        {/* --- UNIQUE CONTROLS --- */}
        <div className="max-w-6xl mx-auto mb-16 flex flex-col lg:flex-row gap-4">
          
          {/* Custom Search */}
          <div className="relative flex-grow group">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-primary z-10" />
            <input 
              type="text" 
              placeholder="Search by club name..." 
              className="w-full pl-14 pr-6 py-4 bg-card border border-slate-200 dark:border-slate-800 rounded-2xl focus:border-primary transition-all outline-none text-text-heading font-medium shadow-sm"
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>

          {/* --- Custom Category Dropdown --- */}
          <div className="relative min-w-[200px]">
            <button 
              onClick={() => { setIsCatOpen(!isCatOpen); setIsSortOpen(false); }}
              className="w-full flex items-center justify-between px-6 py-4 bg-card border border-slate-200 dark:border-slate-800 rounded-2xl text-text-heading font-bold shadow-sm hover:border-secondary transition-all"
            >
              <div className="flex items-center gap-2">
                <FiFilter className="text-secondary" />
                <span>{category}</span>
              </div>
              <FiChevronDown className={`transition-transform duration-300 ${isCatOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isCatOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-[110%] left-0 w-full bg-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-[50] py-2 overflow-hidden"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setCategory(cat); setIsCatOpen(false); }}
                      className={`w-full flex items-center justify-between px-5 py-3 text-sm font-semibold transition-colors hover:bg-primary/10 hover:text-primary ${category === cat ? 'text-primary bg-primary/5' : 'text-text-body'}`}
                    >
                      {cat}
                      {category === cat && <FiCheck />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- Custom Sort Dropdown --- */}
          <div className="relative min-w-[220px]">
            <button 
              onClick={() => { setIsSortOpen(!isSortOpen); setIsCatOpen(false); }}
              className="w-full flex items-center justify-between px-6 py-4 bg-card border border-slate-200 dark:border-slate-800 rounded-2xl text-text-heading font-bold shadow-sm hover:border-primary transition-all"
            >
              <span>{sortOptions.find(o => o.value === sort)?.label}</span>
              <FiChevronDown className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-[110%] right-0 w-full bg-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-[50] py-2 overflow-hidden"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSort(opt.value); setIsSortOpen(false); }}
                      className={`w-full flex items-center justify-between px-5 py-3 text-sm font-semibold transition-colors hover:bg-primary/10 hover:text-primary ${sort === opt.value ? 'text-primary bg-primary/5' : 'text-text-body'}`}
                    >
                      {opt.label}
                      {sort === opt.value && <FiCheck />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results Grid */}
        <div className="relative min-h-[400px]">
          {(isLoading || isFetching) && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/50 backdrop-blur-[2px]">
                <LoadingSpinner />
            </div>
          )}

          {!isLoading && clubs?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {clubs.map((club, index) => (
                <motion.div key={club._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                  <ClubCard club={club} />
                </motion.div>
              ))}
            </div>
          ) : !isLoading && (
            <div className="text-center py-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col items-center">
              <FiInbox size={48} className="text-primary mb-4 opacity-30" />
              <h3 className="text-2xl font-black text-text-heading opacity-50 uppercase !bg-none !-webkit-text-fill-color-inherit">No Clubs Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clubs;