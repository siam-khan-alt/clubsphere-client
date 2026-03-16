import React from 'react';
import { Link } from 'react-router-dom';
import { FiGrid, FiArrowRight, FiSmile } from 'react-icons/fi';

const DashboardHeader = ({ 
    title, 
    description, 
    badgeText = "Member Workspace", 
    showSmile = true,
    buttonText, 
    buttonLink 
}) => {
    return (
        <div className="relative overflow-hidden bg-transparent md:bg-card md:border-standard md:rounded-2xl p-0 md:p-10 md:shadow-sm group transition-all duration-500">
            
            <div className="absolute inset-0 plaid-bg pointer-events-none opacity-0 md:opacity-20 hidden md:block"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none hidden md:block"></div>

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center md:items-start lg:items-center gap-6">
                
                {/* Content Wrapper */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 w-full">
                    
                    <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[9px] md:text-[10px] bg-primary/10 md:bg-primary/5 w-fit px-3 py-1.5 rounded-full border border-primary/10">
                        <FiGrid className="md:group-hover:rotate-90 transition-transform duration-500" /> 
                        {badgeText}
                    </div>

                    {/* Title Section */}
                    <div className="flex items-center gap-3">
                        <h2 className="!mb-0 !p-0 !text-center md:!text-left">
                            <span className="not-italic font-black text-text-heading text-2xl md:text-3xl lg:text-4xl leading-tight">
                                {title}
                            </span>
                        </h2>
                        {showSmile && (
                            <FiSmile className="text-secondary animate-bounce hidden md:block" size={32} />
                        )}
                    </div>
                    
                    <div className="text-text-body font-medium opacity-90 max-w-[320px] md:max-w-2xl text-sm md:text-base leading-relaxed">
                        {description}
                    </div>
                </div>

                {buttonText && buttonLink && (
                    <Link 
                        to={buttonLink} 
                        className="hidden md:flex btn-primary-gradient items-center justify-center gap-2 shadow-lg shadow-primary/20 shrink-0 px-8 py-3.5"
                    >
                        {buttonText} 
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                )}
            </div>
            
            <div className="h-6 md:hidden"></div>
        </div>
    );
};

export default DashboardHeader;