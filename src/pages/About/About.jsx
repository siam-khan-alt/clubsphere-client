import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiShield, FiTrendingUp, FiGlobe } from 'react-icons/fi';

const About = () => {
    return (
        <div className="pt-10 pb-20 bg-base-100">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <h2 className="mb-6">Revolutionizing Campus Communities</h2>
                    <p className="text-lg opacity-80 leading-relaxed">
                        ClubSphere is a modern MERN-stack platform built to bridge the gap between passion and community. 
                        Whether you are a tech enthusiast, a photography lover, or a sports fan, we provide the tools to 
                        discover, join, and manage clubs with ease.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {[
                        { 
                            icon: FiTarget, 
                            title: "Our Mission", 
                            desc: "Empowering students through a central hub for campus activities.", 
                            color: "text-primary"
                        },
                        { 
                            icon: FiShield, 
                            title: "Secure Tech", 
                            desc: "JWT security and Stripe payments keep your data safe.", 
                            color: "text-secondary"
                        },
                        { 
                            icon: FiTrendingUp, 
                            title: "Manager Tools", 
                            desc: "Helping club leads manage events and members efficiently.", 
                            color: "text-accent"
                        },
                        { 
                            icon: FiGlobe, 
                            title: "Global Reach", 
                            desc: "Connecting diverse interests across various local communities.", 
                            color: "text-primary"
                        }].map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card-style text-center flex flex-col items-center group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center mb-6 transition-transform group-hover:rotate-360 ">
                                <item.icon className={`w-8 h-8 ${item.color}`} />
                            </div>
                            <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                            <p className="text-sm opacity-70">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-base-200/50 rounded-2xl p-8 lg:p-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-bold mb-6">Built with Modern Tech</h3>
                        <div className="space-y-4">
                            <p className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                <span><b>Frontend:</b> React 19, Tailwind CSS, Framer Motion</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                <span><b>Backend:</b> Node.js, Express, MongoDB</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-accent"></span>
                                <span><b>Security:</b> Firebase Auth & JWT Verification</span>
                            </p>
                        </div>
                        <button className="btn-primary-gradient mt-8">Explore Our Clubs</button>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <img src="https://i.ibb.co.com/Qjm7D6F5/club-spher-admin.png" alt="Dashboard Preview" className="rounded-2xl shadow-2xl border border-base-content/10" />
                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl hidden lg:block">
                            <p className="text-primary font-black text-2xl">2500+</p>
                            <p className="text-xs uppercase font-bold opacity-60 tracking-widest">Active Members</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;