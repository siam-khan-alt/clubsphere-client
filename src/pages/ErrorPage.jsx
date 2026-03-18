import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ErrorPage = ({ status = '404', title = 'Connection Lost', message = 'The coordinate you are looking for does not exist in the Sphere. It might have been collapsed or moved to another dimension.' }) => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-500">
            
            {/* Animated Cyber Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[150px] animate-[pulse_4s_infinite]"></div>
                <div className="absolute inset-0 plaid-bg opacity-20"></div>
            </div>

            <div className="max-w-4xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Large Background Status Code */}
                    <h1 className="text-[15rem] md:text-[22rem] font-black leading-none tracking-tighter opacity-10 select-none bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent">
                        {status}
                    </h1>
                    
                    <div className="mt-[-8rem] md:mt-[-12rem] relative">
                        {/* Alert Badge */}
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-card border border-standard/10 shadow-2xl mb-8"
                        >
                            <FiActivity className="text-secondary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-body">System Anomaly Detected</span>
                        </motion.div>
                        
                        {/* Title with Gradient */}
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                            {title}
                        </h2>
                        
                        <p className="text-text-body/70 max-w-lg mx-auto mb-12 font-medium leading-relaxed text-lg">
                            {message}
                        </p>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                to="/"
                                className="btn-primary-gradient group flex items-center gap-3 w-full sm:w-auto justify-center"
                            >
                                <FiHome size={20} className="group-hover:rotate-12 transition-transform" /> 
                                Back to Hub
                            </Link>
                            
                            <button 
                                onClick={() => window.history.back()}
                                className="px-8 py-3.5 rounded-xl border-2 border-standard/20 font-bold text-text-heading hover:bg-card transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                            >
                                <FiArrowLeft /> Go Back
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Floating Tech Elements */}
            <div className="absolute hidden lg:block top-20 right-[15%] animate-bounce text-primary/20"><FiActivity size={40}/></div>
            <div className="absolute hidden lg:block bottom-20 left-[15%] animate-pulse text-secondary/20"><FiActivity size={60}/></div>
        </div>
    );
};

export default ErrorPage;