import React from 'react';
import { FiCheckCircle, FiXCircle, FiEye, FiUser, FiList } from 'react-icons/fi';

const getStatusClasses = (status) => {
    switch (status) {
        case 'Approved':
            return 'bg-green-100 text-green-800';
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'Rejected':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const ClubTableRow = ({ club, handleApprove, handleReject }) => {
    
    return (
        <tr key={club._id} className="hover:bg-gray-50 transition duration-150">
            
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {club.clubName}
            </td>
            
            {/* Hidden on screens smaller than lg */}
            <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {club.managerEmail}
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {club.membershipFee === 0 ? 'Free' : `$${club.membershipFee.toFixed(2)}`}
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(club.status)}`}>
                    {club.status}
                </span>
            </td>
            
            {/* Hidden on screens smaller than lg */}
            <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                        <FiUser className="w-4 h-4 mr-1 text-blue-500" />
                        <span>{club.membersCount} Members</span>
                    </div>
                    <div className="flex items-center">
                        <FiList className="w-4 h-4 mr-1 text-purple-500" />
                        <span>{club.eventsCount} Events</span>
                    </div>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {club.status === 'Pending' ? (
                    <div className="flex justify-end space-x-2">
                        <button 
                            onClick={() => handleApprove(club._id)} 
                            className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50 transition"
                            title="Approve Club"
                        >
                            <FiCheckCircle className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => handleReject(club._id)} 
                            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition"
                            title="Reject Club"
                        >
                            <FiXCircle className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <button 
                        className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition"
                        title="View Details"
                    >
                        <FiEye className="w-5 h-5" />
                    </button>
                )}
            </td>
        </tr>
    );
};

export default ClubTableRow;