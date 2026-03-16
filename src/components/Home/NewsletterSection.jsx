import React from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiShieldOff } from 'react-icons/fi'; 

const NewsletterSection = () => {
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-background relative overflow-hidden">
            
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="card-style relative overflow-hidden !p-8 md:!p-16 border-standard "
                >
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl opacity-50"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-2xl opacity-50"></div>

                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        {/* Icon Badge */}
                        <motion.div 
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, type: 'spring' }}
                            className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-inner"
                        >
                            <FiMail className="text-primary text-3xl -rotate-12" />
                        </motion.div>

                        <h2 className="mb-4 !text-center">Stay in the Loop</h2>
                        
                        <p className="text-text-body mb-10 text-base md:text-lg opacity-80 leading-relaxed max-w-xl mx-auto">
                            Get weekly updates on <span className="text-primary font-semibold">new clubs</span>, exclusive community events, and special announcements directly in your inbox.
                        </p>

                        <form 
                            onSubmit={(e) => e.preventDefault()}
                            className="flex flex-col sm:flex-row gap-3 p-1.5 bg-card/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg mx-auto shadow-sm focus-within:border-primary/50 transition-all"
                        >
                            <div className="flex items-center flex-grow px-4 gap-3">
                                <FiMail className="text-text-body opacity-40 shrink-0" />
                                <input 
                                    type="email" 
                                    placeholder="Enter your email address" 
                                    className="w-full bg-transparent border-none focus:ring-0 py-3 text-text-heading placeholder:text-text-body/40 text-sm md:text-base"
                                    required 
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="btn-primary-gradient flex items-center justify-center gap-2 group shadow-lg rounded-xl px-8 py-3.5 transition-all active:scale-95"
                            >
                                <span className="font-bold tracking-tight">Subscribe Now</span>
                                <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>

                        <div className="flex items-center justify-center gap-2 mt-6 opacity-50">
                            <FiShieldOff className="text-xs" />
                            <p className="text-[10px] md:text-xs text-text-body uppercase tracking-[0.15em] font-bold">
                                We respect your privacy. Unsubscribe at any time.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default NewsletterSection;