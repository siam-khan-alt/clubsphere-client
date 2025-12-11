import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiTag } from 'react-icons/fi'; 
const formatFee = (fee) => {
    return fee > 0 ? `$${fee.toFixed(0)}` : 'Free';
};

const ClubCard = ({ club }) => {

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 transition-transform hover:shadow-2xl duration-300 group">
      <div className="h-40 overflow-hidden">
        {club.bannerImage ? (
            <img 
              src={club.bannerImage} 
              alt={`${club.clubName} Banner`} 
              className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 font-semibold">
                No Image Available
            </div>
        )}
      </div>
      <div className="p-5">
        
        <h2 className="text-2xl font-bold text-gray-900 mt-1 mb-3 truncate hover:text-primary transition duration-200">
            {club.clubName}
        </h2>
        <div className="space-y-2 text-gray-600">
            <div className="flex items-center text-sm">
                <FiTag className="w-4 h-4 mr-2 text-primary" />
                <span className="font-semibold">{club.category}</span>
            </div>
            <div className="flex items-center text-sm truncate">
                <FiMapPin className="w-4 h-4 mr-2 text-secondary" />
                <span>{club.location}</span>
            </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-md font-bold text-gray-800 flex justify-between items-center">
                <span>Membership Fee:</span> 
                <span className={club.membershipFee > 0 ? 'text-red-600' : 'text-green-600'}>
                    {formatFee(club.membershipFee)}
                </span>
            </div>
        </div>
      </div>
      <button className="w-full justify-center 
                         flex items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:bg-gray-400">
          <Link 
            to={`/clubs/${club._id}`} 
            
          >
            View Details 
          </Link>
      </button>
    </div>
  );
};

export default ClubCard;