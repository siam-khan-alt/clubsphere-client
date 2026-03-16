import React from 'react';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaRegEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="bg-background text-text-body pt-20 pb-10 border-t border-primary/50 transition-colors duration-300 relative overflow-hidden">
          

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="text-3xl font-black tracking-tighter text-primary inline-block hover:scale-105 transition-transform">
                            Club<span className="text-secondary">Sphere</span>
                        </Link>
                        <p className="text-sm leading-relaxed opacity-80 max-w-xs"> 
                            Connecting students and communities through shared interests. Find your passion, join a club, and make a lasting impact.
                        </p>
                        <div className="flex space-x-3 pt-2">
                            {[
                                { icon: <FaGithub />, link: "https://github.com/siam-khan-alt" },
                                { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/siam-khan-sp99/" },
                                { icon: <FaFacebookF />, link: "https://www.facebook.com/profile.php?id=100078237812772" }
                            ].map((social, i) => (
                                <motion.a 
                                    key={i}
                                    href={social.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    whileHover={{ y: -5 }}
                                    className="p-3 rounded-xl bg-card border border-slate-100 dark:border-slate-800 text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-text-heading text-lg font-bold mb-8 relative inline-block">
                            Quick Links
                            <span className="absolute bottom-[-8px] left-0 w-8 h-[2px] bg-primary"></span>
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            {['Home', 'Find a Club', 'Upcoming Events'].map((item) => (
                                <li key={item}>
                                    <Link 
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`} 
                                        className="opacity-70 hover:text-primary hover:opacity-100 transition-all flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-[2px] bg-primary group-hover:w-3 transition-all"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-text-heading text-lg font-bold mb-8 relative inline-block">
                            Resources
                            <span className="absolute bottom-[-8px] left-0 w-8 h-[2px] bg-secondary"></span>
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            {['About Us', 'Support Center'].map((item) => (
                                <li key={item}>
                                    <Link 
                                        to={item === 'About Us' ? '/about' : '/contact'} 
                                        className="opacity-70 hover:text-secondary hover:opacity-100 transition-all flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-[2px] bg-secondary group-hover:w-3 transition-all"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-text-heading text-lg font-bold mb-8 relative inline-block">
                            Get In Touch
                            <span className="absolute bottom-[-8px] left-0 w-8 h-[2px] bg-primary"></span>
                        </h4>
                        <ul className="space-y-5 text-sm">
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <FaRegEnvelope />
                                </div>
                                <span className="opacity-80">nssiam99@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <FaPhone />
                                </div>
                                <span className="opacity-80">+880 1881361160</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <FaMapMarkerAlt />
                                </div>
                                <span className="opacity-80">Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>

                </div>
                
                {/* Copyright Area */}
                <div className="pt-8 border-t border-primary/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] md:text-xs opacity-50 tracking-[0.2em] uppercase font-bold text-center  flex items-center justify-center md:justify-start gap-1.5">
    &copy; {new Date().getFullYear()} ClubSphere. Crafted with 
    <FiHeart className="text-primary animate-pulse" size={12} /> 
    by <span className="text-primary">Siam Khan</span>
</p>
                    <div className="flex gap-6 text-[10px] uppercase tracking-widest opacity-50 font-bold">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;