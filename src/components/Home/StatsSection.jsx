import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiCalendar, FiMapPin } from 'react-icons/fi';

const stats = [
    { id: 1, label: "Total Members", value: "2500+", icon: FiUsers, color: "text-primary"  },
    { id: 2, label: "Active Clubs", value: "150+", icon: FiAward, color: "text-secondary" },
    { id: 3, label: "Events Hosted", value: "850+", icon: FiCalendar, color: "text-accent"  },
    { id: 4, label: "Campus Branches", value: "12+", icon: FiMapPin, color: "text-primary" },
];

const StatsSection = () => {
    return (
        <section className="pt-10 pb-5 bg-base-100 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div 
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="card-style relative overflow-hidden flex flex-col items-center text-center p-8 border-t-4 border-primary"
                        >
                            <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10 blur-2xl "></div>

                            <div className={`inline-flex p-4 rounded-2xl mb-4 transition-transform duration-300 hover:rotate-12 bg-opacity-10 dark:bg-opacity-20  ${stat.color}`}>
                                <stat.icon size={28} />
                            </div>

                            <h3 className="text-3xl md:text-4xl font-black mb-1">
                                {stat.value}
                            </h3>

                            <p className="text-xs font-bold opacity-60 uppercase tracking-[0.2em]">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;