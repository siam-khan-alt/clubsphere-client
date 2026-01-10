import React from 'react';
import { motion } from 'framer-motion';

const ContactSupport = () => {
    return (
        <section className="py-5 bg-base-100">
            <div className="container mx-auto px-4 text-center">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-3xl mx-auto"
                >
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">Need Personalized Assistance?</h3>
                    <p className="mb-6 text-lg opacity-70">Our dedicated support team is available 24/7 to help you with club management, technical issues, or membership inquiries.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="btn-primary-gradient px-10 py-3">Contact Support</button>
                        <button className="px-10 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300">Visit Help Center</button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSupport;