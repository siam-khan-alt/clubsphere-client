import React from 'react';
import { motion } from 'framer-motion';
import { FiHeadphones, FiHelpCircle } from 'react-icons/fi';

const ContactSupport = () => {
    return (
        <section className="py-12 md:py-16 lg:py-20  bg-background relative overflow-hidden">
          

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header with Custom H3 (Gradient is already in your CSS) */}
                    <h3 className="mb-6">Need Personalized Assistance?</h3>
                    
                    <p className="mb-10 text-lg md:text-xl text-text-body opacity-80 max-w-2xl mx-auto leading-relaxed">
                        Our dedicated support team is available <span className="text-primary font-bold">24/7</span> to help you with club management, technical issues, or membership inquiries.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary-gradient flex items-center gap-3 shadow-xl"
                        >
                            <FiHeadphones className="text-xl" />
                            <span>Contact Support</span>
                        </motion.button>

                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-outline-custom flex items-center gap-3 bg-card"
                        >
                            <FiHelpCircle className="text-xl" />
                            <span>Visit Help Center</span>
                        </motion.button>
                    </div>

                    {/* Quick Stats or Note */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-text-body opacity-60 font-medium uppercase tracking-widest"
                    >
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Average response time: 2 hours
                        </div>
                        <div className="hidden md:block">|</div>
                        <div>Email: support@clubsphere.com</div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSupport;