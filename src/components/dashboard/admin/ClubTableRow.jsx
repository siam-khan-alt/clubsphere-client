import React from 'react';
import { FiCheckCircle, FiXCircle, FiEye, FiUser, FiList } from 'react-icons/fi';
import { TbFidgetSpinner } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
        case 'approved':
            return 'bg-green-100 text-green-600 border-green-200';
        case 'pending':
            return 'bg-yellow-100 text-yellow-600 border-yellow-200';
        case 'rejected':
            return 'bg-red-100 text-red-600 border-red-200';
        default:
            return 'bg-base-200 text-base-content/50 border-base-300';
    }
};

const ClubTableRow = ({ club, handleApprove, handleReject, isMutating }) => {
    return (
        <tr className="hover:bg-base-200/30 transition-colors border-base-content/5">
            <td className="font-bold text-base-content">
                {club.clubName}
            </td>
            <td className="hidden lg:table-cell text-sm text-base-content/60">
                {club.managerEmail}
            </td>
            <td className="text-sm font-bold text-base-content/70">
                {club.membershipFee === 0 ? (
                    <span className="text-green-500">Free</span>
                ) : (
                    `$${club.membershipFee.toFixed(2)}`
                )}
            </td>
            <td>
                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${getStatusClasses(club.status)}`}>
                    {club.status}
                </span>
            </td>
            <td className="hidden lg:table-cell">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-base-content/50">
                        <FiUser className="text-blue-500" />
                        <span>{club.membersCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-base-content/50">
                        <FiList className="text-purple-500" />
                        <span>{club.eventsCount}</span>
                    </div>
                </div>
            </td>
            <td className="text-right">
                {club.status.toLowerCase() === 'pending' ? (
                    <div className="flex justify-end gap-2">
                        <button 
                            onClick={() => handleApprove(club._id)} 
                            disabled={isMutating}
                            className="btn btn-ghost btn-xs text-green-600 hover:bg-green-50 rounded-lg p-1"
                        >
                            {isMutating ? <TbFidgetSpinner className="animate-spin" size={18} /> : <FiCheckCircle size={18} />}
                        </button>
                        <button 
                            onClick={() => handleReject(club._id)} 
                            disabled={isMutating}
                            className="btn btn-ghost btn-xs text-red-600 hover:bg-red-50 rounded-lg p-1"
                        >
                            {isMutating ? <TbFidgetSpinner className="animate-spin" size={18} /> : <FiXCircle size={18} />}
                        </button>
                    </div>
                ) : (
                    <Link to={`/clubs/${club._id}`}>
                        <button className="btn btn-ghost btn-xs text-primary hover:bg-primary/5 rounded-lg p-1">
                            <FiEye size={18} />
                        </button>
                    </Link>
                )}
            </td>
        </tr>
    );
};

export default ClubTableRow;