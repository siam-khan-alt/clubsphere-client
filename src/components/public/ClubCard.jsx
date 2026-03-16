import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiArrowRight } from 'react-icons/fi';

const formatFee = (fee) => {
  return fee > 0 ? `$${fee.toFixed(0)}` : 'Free';
};

const ClubCard = ({ club }) => {
  return (
    <div className="bg-card group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 border-none">
      
      {/* Banner Section */}
      <div className="h-48 overflow-hidden relative">
        {club.bannerImage ? (
          <img 
            src={club.bannerImage} 
            alt={`${club.clubName} Banner`} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 font-semibold italic">
            No Image Available
          </div>
        )}
        
        {/* Price Badge using Theme Colors */}
        <div className="absolute top-4 right-4 z-10">
          <span 
            style={{ 
              backgroundColor: club.membershipFee > 0 ? 'var(--color-secondary)' : 'var(--color-primary)' 
            }}
            className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg text-white"
          >
            {formatFee(club.membershipFee)}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Category Badge */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/80">
            {club.category}
          </span>
        </div>

        {/* Club Name with Heading Color */}
        <h4 className="text-xl font-bold text-text-heading leading-tight mb-4 group-hover:text-primary transition-colors text-left !bg-none !-webkit-text-fill-color-inherit">
          {club.clubName}
        </h4>
        
        <div className="space-y-3 mb-6 mt-auto">
          <div className="flex items-center text-sm text-text-body/80">
            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center mr-3 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
              <FiMapPin className="w-4 h-4" />
            </div>
            <span className="truncate font-medium text-text-body">{club.location}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link 
          to={`/clubs/${club._id}`} 
          className="btn-primary-gradient w-full py-3.5 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest no-underline overflow-hidden relative"
        >
          Details
          <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default ClubCard;