import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { format } from 'date-fns';

const formatFee = (fee) => {
    return fee > 0 ? `$${fee.toFixed(0)}` : 'Free';
};

const EventCard = ({ event }) => {
    return (
        <div className="card-style flex flex-col h-full border-t-4 border-secondary group p-0 overflow-hidden">
            <div className="h-44 overflow-hidden relative">
                {event.bannerImage ? (
                    <img 
                        src={event.bannerImage} 
                        alt={event.title} 
                        className="w-full rounded-t-2xl h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-base-200 text-slate-400 font-semibold">
                        No Image Available
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm ${
                        event.isPaid ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                    }`}>
                        {event.isPaid ? formatFee(event.eventFee) : 'Free'}
                    </span>
                </div>
                <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] rounded-md font-medium">
                        {event.clubDetails?.category}
                    </span>
                </div>
            </div>

            <div className="p-5 flex-grow">
                <h3 className="mt-1 mb-3 truncate leading-tight group-hover:text-primary transition-colors">
                    {event.title}
                </h3>
                
                <div className="space-y-3 opacity-80">
                    <div className="flex items-center text-sm">
                        <FiCalendar className="w-4 h-4 mr-2 text-primary" />
                        <span className="font-medium">
                            {format(new Date(event.eventDate), 'dd MMM, yyyy')}
                        </span>
                    </div>
                    <div className="flex items-center text-sm truncate">
                        <FiMapPin className="w-4 h-4 mr-2 text-secondary" />
                        <span>{event.location}</span>
                    </div>
                </div>
                
                <p className="mt-4 text-[10px] uppercase tracking-widest opacity-40 font-bold">
                    Hosted by: {event.clubDetails?.clubName}
                </p>
            </div>

            <div className="p-4 pt-0">
                <Link 
                    to={`/events/${event._id}`} 
                    className="btn-primary-gradient w-full py-3 flex items-center justify-center gap-2 text-sm no-underline"
                >
                    View Details <FiArrowRight />
                </Link>
            </div>
        </div>
    );
};

export default EventCard;