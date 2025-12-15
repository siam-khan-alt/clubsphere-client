import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiUsers, FiCalendar } from 'react-icons/fi';

const WORK_STEPS = [
    {
        id: 1,
        title: "Explore & Discover",
        description: "Browse hundreds of approved clubs by category, location, or membership fee. Find the perfect fit for your passion.",
        icon: FiSearch,
        color: "text-indigo-600",
    },
    {
        id: 2,
        title: "Join & Connect",
        description: "Submit a quick membership request or join instantly. Start communicating with fellow members right away.",
        icon: FiUsers,
        color: "text-green-600",
    },
    {
        id: 3,
        title: "Participate & Grow",
        description: "Access event calendars, manage your membership, and engage in club discussions to maximize your experience.",
        icon: FiCalendar,
        color: "text-red-600",
    },
];

const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HowItWorksSection = () => {
    return (
        <div className="container mx-auto px-4 pb-10">
            <h2 className="text-center mb-8">
                How ClubSphere Works
            </h2>
            
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
                    
                    {WORK_STEPS.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.id}
                                variants={stepVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ delay: index * 0.2 }}
                                
                                className="bg-white p-8 rounded-xl shadow-xl text-center border-t-4 border-indigo-500 hover:shadow-2xl transition duration-300"
                            >
                                <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-opacity-10 mb-6   ${step.color.replace('text', 'bg')}`}>
                                    <Icon className={`w-8 h-8 `} />
                                </div>
                                
                                <div className={`text-sm font-semibold mb-2 ${step.color}`}>
                                    STEP {step.id}
                                </div>
                                
                                <h5 className="text-xl font-bold text-gray-800 mb-3">
                                    {step.title}
                                </h5>
                                
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            
            <div className="text-center mt-16">
                <a 
                    href="/clubs"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition duration-200"
                >
                    Start Exploring Clubs
                </a>
            </div>
        </div>
    );
};

export default HowItWorksSection;