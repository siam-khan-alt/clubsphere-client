import React from 'react';
import { FiUsers, FiEdit3, FiTrash2, FiMapPin, FiList } from 'react-icons/fi';

const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
        case 'approved':
            return 'bg-green-100 text-green-800 border border-green-200';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        case 'rejected':
            return 'bg-red-100 text-red-800 border border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
};

const ClubCard = ({ club, onDelete, onEdit, isDeleting ,onViewMembers}) => {
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 group">
            
            <div className="h-40 overflow-hidden">
                {club.bannerImage ? (
                    <img 
                        src={club.bannerImage} 
                        alt={`${club.clubName} Banner`} 
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                        No Image Available
                    </div>
                )}
            </div>
            
            <div className="p-5">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${getStatusClasses(club.status)}`}>
                    {club.status}
                </span>
                
                <h4 className="text-xl font-bold text-gray-900 mt-3 mb-2 truncate">{club.clubName}</h4>
                
                <div className="mt-4 space-y-2 text-gray-600">
                    <div className="flex items-center text-sm">
                        <FiUsers className="w-4 h-4 mr-2 text-blue-500" />
                        <span>Members: {club.membersCount || 0}</span>
                    </div>
                    <div className="flex items-center text-sm truncate">
                        <FiMapPin className="w-4 h-4 mr-2 text-purple-500" />
                        <span>Location:{club.location}</span>
                    </div>
                    <div className="text-sm font-medium">
                        Fee: {club.membershipFee === 0 ? 'Free' : `$${club.membershipFee?.toFixed(2)}`}
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 border-t grid grid-cols-3 divide-x divide-gray-200">
                
                <button 
                    onClick={() => onViewMembers(club._id)} 
                    className="p-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition flex justify-center items-center"
                >
                    <FiList className="w-4 h-4 mr-1"/> Members
                </button>

                <button 
                    onClick={() => onEdit(club)}
                    className="p-3 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition flex justify-center items-center"
                >
                    <FiEdit3 className="w-4 h-4 mr-1"/> Edit
                </button>
                <button 
                    onClick={() => onDelete(club._id, club.clubName)}
                    className="p-3 text-sm font-medium text-red-600 hover:bg-red-50 transition flex justify-center items-center"
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting...' : <><FiTrash2 className="w-4 h-4 mr-1"/> Delete</>}
                </button>
            </div>
        </div>
    );
};

export default ClubCard;