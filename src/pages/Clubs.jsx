import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import ClubCard from '../components/public/ClubCard';
import axios from 'axios';
import { BounceLoader } from 'react-spinners'; 

const categories = [
  "All", "Technology","Photography","Sports", "Book Club","Art & Design", "Hiking & Travel", "Music & Film", "Food & Cooking"
];

const Clubs = () => {
    const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest'); 
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useMemo(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const queryString = `search=${debouncedSearch}&category=${category === 'All' ? '' : category}&sort=${sort}`;
  
  const { data: clubs, isLoading, isError, error } = useQuery({
    queryKey: ['publicClubs', queryString],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/clubs?${queryString}`);
      return res.data;
    },
  });

  if (isError) {
    return (
      <div className="min-h-screen container mx-auto p-8 text-center">
        <h5 className="text-3xl font-bold text-red-600 mb-4">Error Loading Clubs</h5>
        <p className="text-lg">Could not fetch data from the server. Please try again later.</p>
        <p className="text-sm text-gray-500 mt-2">Error: {error.message}</p>
      </div>
    );
  }
    return (
        <div className="container mx-auto px-4 py-12">
      <h2 className="text-center mb-10 ">Explore Local Clubs</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-base-200 rounded-lg shadow-md">
        
        <input
          type="text"
          placeholder="Search club name..."
          className="input input-bordered w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <select
          className="select select-bordered w-full md:w-1/3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <select
          className="select select-bordered w-full md:w-1/3"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Sort By: Newest First</option>
          <option value="oldest">Sort By: Oldest First</option>
          <option value="fee_desc">Fee: High to Low</option>
          <option value="fee_asc">Fee: Low to High</option>
        </select>
      </div>
      {isLoading?  <div className="flex items-center justify-center mt-20 w-full bg-[var(--color-bg-light)]/80 backdrop-blur-sm  inset-0 z-50">
            <div className="flex flex-col items-center">
                
                <BounceLoader 
                    color='#7C3AED'
                    loading={true}
                />
                
                <p className="mt-6 text-xl font-semibold text-[var(--color-text-body)] tracking-wider">
                    ClubSphere is Loading...
                </p>
            </div>
        </div> :clubs?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map(club => (
            <ClubCard key={club._id} club={club} />
          ))}
        </div>
      ) : (
        <div className="text-center p-16 border-2 border-dashed rounded-lg mt-10">
          <p className="text-xl text-gray-500">No clubs found matching your criteria. Try adjusting the search or filters.</p>
        </div>
      )}
        </div>
    );
};

export default Clubs;
