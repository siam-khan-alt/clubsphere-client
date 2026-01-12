import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { format, isFuture } from 'date-fns';

const MemberClubCard = ({ club }) => {
    const isExpired = club.expiresAt && !isFuture(new Date(club.expiresAt));
    const statusClass = club.status === 'active' && !isExpired 
        ? 'bg-green-100 text-green-600' 
        : 'bg-red-100 text-red-600';
    const statusText = isExpired ? 'Expired' : club.status.charAt(0).toUpperCase() + club.status.slice(1);

    return (
        <div className="card-style flex flex-col h-full border-t-4 border-primary group p-0 overflow-hidden">
            <div className="h-44 overflow-hidden relative">
                {club.bannerImage ? (
                    <img 
                        src={club.bannerImage} 
                        alt={`${club.clubName} Banner`} 
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-base-200 text-slate-400 font-semibold">
                        No Image Available
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${statusClass}`}>
                        {statusText}
                    </span>
                </div>
            </div>

            <div className="p-5 flex-grow">
                <h3 className="mt-1 mb-3 truncate leading-tight font-black text-xl">
                    {club.clubName}
                </h3>
                
                <div className="space-y-3 opacity-80">
                    <div className="flex items-center text-sm font-medium">
                        <FiCalendar className="w-4 h-4 mr-2 text-primary" />
                        <span>Joined: {format(new Date(club.joinedAt), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center text-sm truncate">
                        <FiMapPin className="w-4 h-4 mr-2 text-secondary" />
                        <span>{club.location}</span>
                    </div>
                    {club.expiresAt && (
                        <div className="flex items-center text-xs font-bold text-base-content/50 italic">
                            Expires: {format(new Date(club.expiresAt), 'MMM d, yyyy')}
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4 pt-0">
                <Link 
                    to={`/clubs/${club.clubId}`} 
                    className="btn-primary-gradient w-full py-3 flex items-center justify-center gap-2 text-sm no-underline font-bold"
                >
                    View Club Details <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default MemberClubCard;