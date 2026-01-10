import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 }, 
    visible: { scale: 1, opacity: 1 } 
};

const CategoryCard = ({ category }) => {
    const Icon = category.icon;
    
    return (
        <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
           <div className="card-style h-full cursor-pointer group border-t-4 border-primary transition-all duration-300">
                <div className="flex flex-col items-center text-center p-4">
                    <div className={`p-5 rounded-2xl ${category.color} bg-opacity-10 dark:bg-opacity-20 mb-4 transition-all duration-300 group-hover:bg-opacity-100`}>
                        <Icon className={`w-8 h-8 ${category.iconTextColor} transition-all duration-300 group-hover:text-white`} />
                    </div>
                    
                    <h4 className="text-lg mb-0  ">
                        {category.name}
                    </h4>
                    
                    <p className="text-xs opacity-50 mt-2 group-hover:opacity-100 transition-opacity">
                        Browse Clubs
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default CategoryCard;