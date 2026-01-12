import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const Contact = () => {
    return (
        <div className="pt-10 pb-20 bg-base-100">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h2>Get In Touch</h2>
                    <p className="opacity-70">Have questions about ClubSphere? Whether you're a student or a manager, we're here to help.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1 space-y-6">
                        {[
                            { icon: FiMail, title: "Email Us", info: "nssiam99@gmail.com", color: "text-primary" },
                            { icon: FiPhone, title: "Call Us", info: "+880 1881361160", color: "text-secondary" },
                            { icon: FiMapPin, title: "Our Location", info: "Dhaka, Bangladesh", color: "text-accent" }
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="card-style flex items-center gap-5"
                            >
                                <div className="p-4 rounded-xl bg-opacity-10 dark:bg-opacity-20 ">
                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold opacity-50 uppercase tracking-widest">{item.title}</p>
                                    <p className="font-semibold text-base-content">{item.info}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 card-style !p-8 lg:!p-12"
                    >
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label>Your Name</label>
                                <input type="text" placeholder="Siam Khan" required />
                            </div>
                            <div className="flex flex-col">
                                <label>Your Email</label>
                                <input type="email" placeholder="example@mail.com" required />
                            </div>
                            <div className="flex flex-col md:col-span-2">
                                <label>Subject</label>
                                <input type="text" placeholder="Membership Inquiry" required />
                            </div>
                            <div className="flex flex-col md:col-span-2">
                                <label>Message</label>
                                <textarea rows="5" placeholder="Write your message here..." required></textarea>
                            </div>
                            <div className="md:col-span-2 pt-2">
                                <button type="submit" className="btn-primary-gradient w-full md:w-auto flex items-center justify-center gap-2 group">
                                    Send Message <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;