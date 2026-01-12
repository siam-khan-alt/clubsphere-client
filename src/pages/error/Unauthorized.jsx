import React, { use } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiLock, FiArrowRight, FiShieldOff } from 'react-icons/fi';

const Unauthorized = () => {
    const { user } = use(AuthContext);
    const userRole = user?.role || 'Guest';

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-6 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-error/5 via-transparent to-transparent"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-lg w-full bg-base-200/50 backdrop-blur-xl border border-base-content/5 p-10 sm:p-16 rounded-[48px] text-center shadow-2xl"
            >
                <div className="relative w-24 h-24 mx-auto mb-8">
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute inset-0 bg-error/20 rounded-full blur-xl"
                    ></motion.div>
                    <div className="relative w-full h-full bg-base-100 rounded-full border-2 border-error/30 flex items-center justify-center shadow-inner">
                        <FiShieldOff size={40} className="text-error" />
                    </div>
                    <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-error text-white rounded-full flex items-center justify-center shadow-lg border-4 border-base-100">
                        <FiLock size={16} />
                    </div>
                </div>

                <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">
                    Access <span className="text-error not-italic">Denied</span>
                </h2>
                
                <div className="inline-block px-3 py-1 rounded-lg bg-base-content/5 mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Identity: </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-error">{userRole}</span>
                </div>

                <p className="text-base-content/60 font-medium mb-10 leading-relaxed">
                    Security protocols prevent your current role from accessing this restricted sector. 
                </p>

                <Link 
                    to="/dashboard" 
                    className="flex items-center justify-center gap-3 w-full py-4 bg-base-content text-base-100 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 group"
                >
                    Return to Safe Zone
                    <FiArrowRight className="group-hover:translate-x-2 transition-all" />
                </Link>

                <div className="mt-8 pt-8 border-t border-base-content/5">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-20 italic">
                        ClubSphere Security Clearance Required
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Unauthorized;