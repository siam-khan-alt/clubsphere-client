import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiTag } from 'react-icons/fi'; 
const formatFee = (fee) => {
    return fee > 0 ? `$${fee.toFixed(0)}` : 'Free';
};

const ClubCard = ({ club }) => {

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
            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                club.membershipFee > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
            }`}>
                {formatFee(club.membershipFee)}
            </span>
        </div>
      </div>

      <div className="p-5 flex-grow">
        <h3 className="mt-1 mb-3 truncate leading-tight">
            {club.clubName}
        </h3>
        
        <div className="space-y-3 opacity-80">
            <div className="flex items-center text-sm">
                <FiTag className="w-4 h-4 mr-2 text-primary" />
                <span className="font-medium">{club.category}</span>
            </div>
            <div className="flex items-center text-sm truncate">
                <FiMapPin className="w-4 h-4 mr-2 text-secondary" />
                <span>{club.location}</span>
            </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Link 
            to={`/clubs/${club._id}`} 
            className="btn-primary-gradient w-full py-3 flex items-center justify-center gap-2 text-sm no-underline"
        >
            View Details 
        </Link>
      </div>
    </div>
  );
};

export default ClubCard;