import {  FiMapPin, FiCalendar, FiArrowRight } from 'react-icons/fi';

import { format, isFuture } from 'date-fns';
import { Link } from 'react-router-dom';


const MemberClubCard = ({ club }) => {
    const isExpired = club.expiresAt && !isFuture(new Date(club.expiresAt));
    const statusColor = club.status === 'active' && !isExpired ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    const statusText = isExpired ? 'Expired' : club.status.charAt(0).toUpperCase() + club.status.slice(1);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-indigo-600">
            <div className="flex justify-between items-start mb-3">
                <h3 >{club.clubName}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                    {statusText}
                </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p className="flex items-center">
                    <FiMapPin className="w-4 h-4 mr-2 text-indigo-500" /> 
                    {club.location}
                </p>
                <p className="flex items-center">
                    <FiCalendar className="w-4 h-4 mr-2 text-indigo-500" /> 
                    Joined: {format(new Date(club.joinedAt), 'MMM d, yyyy')}
                </p>
                {club.expiresAt && (
                    <p className="flex items-center">
                        <FiCalendar className="w-4 h-4 mr-2 text-indigo-500" /> 
                        Expires: {format(new Date(club.expiresAt), 'MMM d, yyyy')}
                    </p>
                )}
            </div>

            <Link 
                to={`/clubs/${club.clubId}`} 
                className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center mt-3"
            >
                View Club Details <FiArrowRight className="w-4 h-4 ml-1" />
            </Link>
        </div>
    );
};
export default MemberClubCard