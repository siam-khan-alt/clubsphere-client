import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { format } from 'date-fns';

const formatFee = (fee) => {
    return fee > 0 ? `$${fee.toFixed(0)}` : 'Free';
};

const EventCard = ({ event }) => {
    return (
        <div className="bg-card group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 border-none">
            
            {/* Banner Section */}
            <div className="h-48 overflow-hidden relative">
                {event.bannerImage ? (
                    <img 
                        src={event.bannerImage} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 font-semibold italic">
                        No Image Available
                    </div>
                )}
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 z-10">
                    <span 
                        style={{ 
                            backgroundColor: event.isPaid ? 'var(--color-secondary)' : 'var(--color-primary)' 
                        }}
                        className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg text-white"
                    >
                        {event.isPaid ? formatFee(event.eventFee) : 'Free'}
                    </span>
                </div>

                {/* Category Overlay */}
                <div className="absolute bottom-4 left-4 z-10">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-lg border border-white/10">
                        {event.clubDetails?.category}
                    </span>
                </div>

                {/* Overlay for better image contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content Section */}
            <div className="p-6 flex-grow flex flex-col">
                {/* Host Club Info */}
                <div className="flex items-center gap-1.5 mb-3">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-secondary/80">
                        {event.clubDetails?.clubName}
                    </span>
                </div>

                {/* Event Title - Fixed Contrast and Background Issue */}
                <h4 className="text-xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors text-left !bg-none !bg-transparent !-webkit-text-fill-color-current text-text-heading">
                    {event.title}
                </h4>
                
                <div className="space-y-3 mb-6 mt-auto">
                    {/* Date */}
                    <div className="flex items-center text-sm">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <FiCalendar className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-text-body">
                            {format(new Date(event.eventDate), 'dd MMM, yyyy')}
                        </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-sm">
                        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center mr-3 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                            <FiMapPin className="w-4 h-4" />
                        </div>
                        <span className="truncate font-semibold text-text-body">{event.location}</span>
                    </div>
                </div>

                {/* Action Button */}
                <Link 
                    to={`/events/${event._id}`} 
                    className="btn-primary-gradient w-full py-3.5 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest no-underline overflow-hidden relative"
                >
                    Details
                    <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
            </div>
        </div>
    );
};

export default EventCard;