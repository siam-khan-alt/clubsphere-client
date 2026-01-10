import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard'; 
import { FaBookOpen, FaCamera, FaFootballBall, FaHiking, FaLaptopCode, FaMusic, FaPalette, FaUtensils } from 'react-icons/fa';

const CLUB_CATEGORIES = [
    { name: "Technology", icon: FaLaptopCode, color: "bg-blue-500", iconColor: "text-blue-500/10" },
    { name: "Photography", icon: FaCamera, color: "bg-purple-500", iconColor: "text-purple-500/10"},
    { name: "Sports", icon: FaFootballBall, color: "bg-green-500", iconColor: "text-green-500/10" },
    { name: "Book Club", icon: FaBookOpen, color: "bg-yellow-500", iconColor: "text-yellow-500/10"},
    { name: "Art & Design", icon: FaPalette, color: "bg-pink-500", iconColor: "text-pink-500/10" },
    { name: "Hiking & Travel", icon: FaHiking, color: "bg-orange-500", iconColor: "text-orange-500/10" },
    { name: "Music & Film", icon: FaMusic, color: "bg-indigo-500", iconColor: "text-indigo-500/10" },
    { name: "Food & Cooking", icon: FaUtensils, color: "bg-red-500", iconColor: "text-red-500/10"},
];
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.01
        }
    }
};

const PopularCategorySection = () => {
    return (
      <section className="py-5 bg-base-100 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='mb-8'
                >
                    Popular Categories
                </motion.h2>
                
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible" 
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6"
                >
                    {CLUB_CATEGORIES.map((category) => (
                        <CategoryCard key={category.name} category={category} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PopularCategorySection;