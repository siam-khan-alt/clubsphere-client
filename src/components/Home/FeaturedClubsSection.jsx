import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axios from 'axios';
import ClubCard from '../public/ClubCard';
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        }
    }
};

const itemVariants = {
    hidden: { y: 50, opacity: 0 }, 
    visible: { y: 0, opacity: 1 }  
};


const FeaturedClubsSection = () => {
    
    const { data: clubs = [], isLoading, isError } = useQuery({
        queryKey: ['featuredClubs'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/featuredClubs`);
            return res.data; 
        },
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) {
        return <LoadingSpinner/>
    }
    
    if (isError) {
        return (
            <div className="container mx-auto px-4 text-center">
                 <h2 className="text-4xl font-bold text-gray-800 mb-12">⭐ Featured Clubs</h2>
                <p className="text-red-500 text-lg">Error loading clubs. Please check the network and backend connection.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto pt-10 px-4">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Featured Clubs</h2>
            
            <motion.div
                variants={containerVariants}
                initial="hidden" 
                animate="visible" 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {clubs.length > 0 ? (
                    clubs.map((club) => (
                        <motion.div key={club._id} variants={itemVariants}>
                            <ClubCard club={club} />
                        </motion.div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No featured clubs found at the moment.</p>
                )}
            </motion.div>
        </div>
    );
};

export default FeaturedClubsSection;