import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import heroImage from '../../assets/heroimage.avif'; 

const HERO_IMAGE_URL = heroImage; 

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const HeroSection = () => {
    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative text-center py-12 md:py-16 bg-cover bg-center shadow-xl"
            style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
        >
            <div className="absolute inset-0 bg-indigo-800 opacity-60"></div> 
            
            <div className="relative z-10 container mx-auto px-4 text-white"> 
                
                <motion.h1 
                    variants={itemVariants}
                    className="text-4xl md:text-6xl font-bold leading-tight"
                >
                    Discover Your Perfect Club. <br/> Start Connecting Today.
                </motion.h1>
                
                <motion.p 
                    variants={itemVariants}
                    className="mt-6 text-xl md:text-2xl font-light max-w-3xl mx-auto"
                >
                    Find communities based on your passions, manage events, and build your network effortlessly.
                </motion.p>
                
                <motion.div 
                    variants={itemVariants}
                    className="mt-10 space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center"
                >
                    <Link to="/clubs">
                        <button className="w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-100 transition duration-300 shadow-lg">
                            Join a Club
                        </button>
                    </Link>
                    <Link to="dashboard/clubManager/createClub">
                        <button className="w-full sm:w-auto px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-indigo-600 transition duration-300 shadow-lg">
                            Create a Club
                        </button>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default HeroSection;