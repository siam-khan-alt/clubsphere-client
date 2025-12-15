import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard'; 
import { FaBookOpen, FaCamera, FaFootballBall, FaHiking, FaLaptopCode, FaMusic, FaPalette, FaUtensils } from 'react-icons/fa';

const CLUB_CATEGORIES = [
    { name: "Technology", icon: FaLaptopCode, color: "bg-blue-500", iconColor: "text-blue-500" },
    { name: "Photography", icon: FaCamera, color: "bg-purple-500", iconColor: "text-purple-500"},
    { name: "Sports", icon: FaFootballBall, color: "bg-green-500", iconColor: "text-green-500" },
    { name: "Book Club", icon: FaBookOpen, color: "bg-yellow-500", iconColor: "text-yellow-500"},
    { name: "Art & Design", icon: FaPalette, color: "bg-pink-500", iconColor: "text-pink-500" },
    { name: "Hiking & Travel", icon: FaHiking, color: "bg-orange-500", iconColor: "text-orange-500" },
    { name: "Music & Film", icon: FaMusic, color: "bg-indigo-500", iconColor: "text-indigo-500" },
    { name: "Food & Cooking", icon: FaUtensils, color: "bg-red-500", iconColor: "text-red-500"},
];
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.07, 
            delayChildren: 0.1
        }
    }
};

const PopularCategorySection = () => {
    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
                Popular Categories
            </h2>
            
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible" 
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6"
            >
                {CLUB_CATEGORIES.map((category) => (
                    <CategoryCard key={category.name} category={category} />
                ))}
            </motion.div>
        </div>
    );
};

export default PopularCategorySection;