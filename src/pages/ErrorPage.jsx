import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ErrorPage = ({ status = '404', title = 'Page Not Found', message = 'The page you are looking for might have been moved, deleted, or never existed.' }) => {
    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-2xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-[12rem] sm:text-[16rem] font-black italic leading-none tracking-tighter opacity-10 select-none">
                        {status}
                    </h1>
                    
                    <div className="mt-[-8rem] sm:mt-[-10rem]">
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-error/10 border border-error/20 text-error mb-6"
                        >
                            <FiAlertCircle className="animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">System Alert</span>
                        </motion.div>
                        
                        <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter mb-4 text-base-content">
                            {title}
                        </h2>
                        
                        <p className="text-base-content/60 max-w-md mx-auto mb-10 font-medium leading-relaxed">
                            {message}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/"
                                className="group relative px-8 py-4 bg-primary text-primary-content font-black uppercase tracking-widest text-xs rounded-2xl overflow-hidden transition-all hover:pr-12"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <FiHome size={18} /> Back to Hub
                                </span>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">→</span>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ErrorPage;