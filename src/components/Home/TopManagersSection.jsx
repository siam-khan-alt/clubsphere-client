import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';

const managers = [
    { id: 1, name: "Tanvir Rahman", clubs: 5, members: "1.2K", img: "https://i.pravatar.cc/150?u=2" },
    { id: 2, name: "Mehedi Hasan", clubs: 3, members: "850", img: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Anika Tabassum", clubs: 4, members: "920", img: "https://i.pravatar.cc/150?u=2" },
    { id: 4, name: "Sabbir Ahmed", clubs: 2, members: "640", img: "https://i.pravatar.cc/150?u=2" },
];

const TopManagersSection = () => {
    return (
        <section className="py-5 bg-base-100">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    Our Elite Club Managers
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {managers.map((manager, index) => (
                        <motion.div
                            key={manager.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card-style group hover:border-primary transition-all duration-300"
                        >
                            <div className="relative flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800 group-hover:border-primary/30 transition-all mb-4">
                                    <img src={manager.img} alt={manager.name} className="w-full h-full object-cover" />
                                </div>
                                <h4 className="text-lg font-bold mb-1">{manager.name}</h4>
                                <div className="flex gap-4 mt-2">
                                    <div className="text-center">
                                        <p className="text-xs opacity-50 uppercase">Clubs</p>
                                        <p className="font-bold text-primary">{manager.clubs}</p>
                                    </div>
                                    <div className="w-[1px] h-8 bg-gray-200 dark:bg-gray-700"></div>
                                    <div className="text-center">
                                        <p className="text-xs opacity-50 uppercase">Members</p>
                                        <p className="font-bold text-secondary">{manager.members}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopManagersSection;