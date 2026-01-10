import React from 'react';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaRegEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-base-100 text-base-content pt-16 pb-8 border-t border-base-content/10 transition-colors duration-300"> 
            <div className="container mx-auto px-4">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    <div className="space-y-4">
                        <Link to="/" className="text-2xl font-black tracking-tighter text-primary">
                            Club<span className="text-secondary">Sphere</span>
                        </Link>
                        <p className="text-sm leading-relaxed opacity-70"> 
                            Connecting students and communities through shared interests. Find your passion, join a club, and make a lasting impact.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="https://github.com/siam-khan-alt" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-base-200 hover:bg-primary hover:text-white transition-all duration-300">
                                <FaGithub size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/siam-khan-sp99/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-base-200 hover:bg-primary hover:text-white transition-all duration-300">
                                <FaLinkedinIn size={18} />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=100078237812772" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-base-200 hover:bg-primary hover:text-white transition-all duration-300">
                                <FaFacebookF size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 ">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/" className="opacity-70 hover:text-primary hover:opacity-100 transition-all">Home</Link></li>
                            <li><Link to="/clubs" className="opacity-70 hover:text-primary hover:opacity-100 transition-all">Find a Club</Link></li>
                            <li><Link to="/events" className="opacity-70 hover:text-primary hover:opacity-100 transition-all">Upcoming Events</Link></li>
                            <li><Link to="/about" className="opacity-70 hover:text-primary hover:opacity-100 transition-all">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 ">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/privacy" className="opacity-70 hover:text-primary hover:opacity-100 transition-all">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="opacity-70 hover:text-primary hover:opacity-100 transition-all">Terms of Service</Link></li>
                            <li><Link to="/contact" className="opacity-70 hover:text-primary hover:opacity-100 transition-all">Support Center</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 ">Get In Touch</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <FaRegEnvelope className="mt-1 text-primary" />
                                <span className="opacity-70">nssiam99@gmail.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaPhone className="mt-1 text-primary" />
                                <span className="opacity-70">+880 1881361160</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 text-primary" />
                                <span className="opacity-70">Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>

                </div>
                
                <div className="text-center pt-8 border-t border-base-content/10">
                    <p className="text-xs opacity-50 tracking-widest uppercase">
                        &copy; {new Date().getFullYear()} ClubSphere. Crafted by Siam Khan.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;