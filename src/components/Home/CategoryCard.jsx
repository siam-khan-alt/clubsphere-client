import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 }, 
    visible: { scale: 1, opacity: 1 } 
};

const CategoryCard = ({ category }) => {
    const Icon = category.icon;
    console.log(Icon);
    
    
    return (
        <motion.div variants={itemVariants}>
            <div 
                
                className="block p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 hover:border-indigo-400 border border-gray-100"
            >
                <div className="flex flex-col items-center text-center">
                    
                    <div className={`p-4 rounded-full ${category.color} bg-opacity-10 mb-4`}>
                        <Icon className={`w-8 h-8 `} />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-800 min-h-16">
                        {category.name}
                    </h3>
                    
                </div>
            </div>
        </motion.div>
    );
};

export default CategoryCard;