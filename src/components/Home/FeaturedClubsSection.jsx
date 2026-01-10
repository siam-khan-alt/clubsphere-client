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
 if (isLoading) return <LoadingSpinner />;
    if (isError) {
        return (
            <div className="container mx-auto px-4 py-5 text-center">
                <h2>Featured Clubs</h2>
                <p className="text-red-400 font-medium bg-red-100/10 p-4 rounded-lg inline-block">
                    Error loading clubs. Please check the network connection.
                </p>
            </div>
        );
    }

    return (
        <section className="py-8 bg-base-100 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='mb-8'
                >
                    Featured Clubs
                </motion.h2>
                
                <motion.div
                    variants={containerVariants}
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                >
                    {clubs.length > 0 ? (
                        clubs.map((club) => (
                            <motion.div key={club._id} variants={itemVariants}>
                                <ClubCard club={club} />
                            </motion.div>
                        ))
                    ) : (
                        <p className="col-span-full text-center opacity-60 text-lg">
                            No featured clubs found at the moment.
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedClubsSection;