import React from 'react';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaRegEnvelope, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#F8F9FA] text-[#34495E] pt-10 pb-6 border-t border-[#E5E7EB]"> 
            <div className="container mx-auto px-4">
                
                <div className="flex flex-wrap justify-between items-start mb-8">

                    <div className="w-full md:w-1/3 mb-8 md:mb-0">
                        <h3 className="text-2xl font-bold mb-3 text-[#7C3AED]">ClubSphere</h3>
                        <p className="text-sm leading-relaxed mb-4 text-[#34495E]"> 
                            Connecting students and communities through shared interests. Find your passion, join a club, and make an impact.
                        </p>
                        
                        <div className="space-y-2 text-sm text-[#34495E]">
                            <p className="flex items-center">
                                <FaRegEnvelope className="w-4 h-4 mr-2 text-[#7C3AED]" />
                                Email: nssiam99@gmail.com
                            </p>
                            <p className="flex items-center">
                                <FaPhone className="w-4 h-4 mr-2 text-[#7C3AED]" />
                                Phone: +880 1881361160
                            </p>
                        </div>
                    </div>

                    <div className="w-1/2 md:w-1/4">
                        <h4 className=" mb-3 ">Explore</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="text-[#34495E] hover:text-[#7C3AED] transition-colors">Home</Link></li>
                            <li><Link to="/clubs" className="text-[#34495E] hover:text-[#7C3AED] transition-colors">Find a Club</Link></li>
                            <li><Link to="/events" className="text-[#34495E] hover:text-[#7C3AED] transition-colors">See Events</Link></li>
                        </ul>
                    </div>

                    <div className="w-1/2 md:w-1/4">
                        <h4 className="mb-3 ">Connect</h4>
                        <div className="flex space-x-4 mt-3">
                            
                            <a 
                                href="https://github.com/siam-khan-alt" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="GitHub"
                                className="text-[#6B7280] hover:text-[#7C3AED] transition-colors"
                            >
                                <FaGithub className="w-7 h-7" />
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/siam-khan-sp99/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="LinkedIn"
                                className="text-[#6B7280] hover:text-[#7C3AED] transition-colors"
                            >
                                <FaLinkedinIn className="w-7 h-7" />
                            </a>
                            <a 
                                href="https://www.facebook.com/profile.php?id=100078237812772" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="Facebook"
                                className="text-[#6B7280] hover:text-[#7C3AED] transition-colors"
                            >
                                <FaFacebookF className="w-7 h-7" />
                            </a>
                        </div>
                    </div>

                </div>
                
                <div className="text-center pt-4 border-t border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280]">
                        &copy; {new Date().getFullYear()} ClubSphere. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;