import React from 'react';
import { motion } from 'framer-motion';

const NewsletterSection = () => {
    return (
        <section className="pt-5 pb-10 bg-base-100">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="card-style bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border-primary/20 p-12 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -ml-16 -mb-16"></div>

                    <div className="relative z-10">
                        <h2>Stay in the Loop</h2>
                        <p className="max-w-xl mx-auto mb-10 opacity-70 text-lg">
                            Get weekly updates on new clubs, exclusive community events, and special announcements directly in your inbox.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="flex-grow rounded-full px-6 py-3"
                                required 
                            />
                            <button type="submit" className="btn-primary-gradient whitespace-nowrap shadow-lg">
                                Subscribe Now
                            </button>
                        </form>
                        <p className="text-xs opacity-50 mt-4 italic">We respect your privacy. Unsubscribe at any time.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default NewsletterSection;