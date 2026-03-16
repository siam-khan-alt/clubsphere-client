import React from 'react';
import { FiMapPin, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const MemberClubCard = ({ membership }) => {
    const { status, joinedAt, clubDetails } = membership;

    return (
        <div className="bg-card border-standard rounded-[2rem] overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col">
            {/* Banner Section */}
            <div className="relative h-40 overflow-hidden">
                <img 
                    src={clubDetails?.bannerImage} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt="Club Banner"
                />
                <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md ${
                        status === 'active' ? 'bg-green-500/90 text-white' : 'bg-yellow-500/90 text-white'
                    }`}>
                        {status}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4 flex-1">
                <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-lg">
                        {clubDetails?.category}
                    </span>
                    <h3 className="!text-xl !text-left !mb-0 mt-3 text-text-heading line-clamp-1 group-hover:text-primary transition-colors font-bold">
                        {clubDetails?.clubName}
                    </h3>
                    <div className="flex items-center gap-2 text-text-body opacity-60 text-sm mt-1">
                        <FiMapPin size={14} />
                        <span>{clubDetails?.location}</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase font-black opacity-40 leading-none">Joined On</p>
                        <p className="text-sm font-bold text-text-heading">
                            {format(new Date(joinedAt || Date.now()), 'MMM dd, yyyy')}
                        </p>
                    </div>
                    <Link 
                        to={`/club/${clubDetails?._id}`}
                        className="p-3 rounded-xl bg-background text-text-heading hover:bg-primary hover:text-white transition-all shadow-sm"
                    >
                        <FiArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MemberClubCard;