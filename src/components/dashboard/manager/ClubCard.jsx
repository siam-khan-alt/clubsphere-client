import React from 'react';
import { FiUsers, FiEdit3, FiTrash2, FiMapPin, FiList, FiDollarSign } from 'react-icons/fi';

const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
        case 'approved': return 'bg-success/10 text-success border-success/20';
        case 'pending': return 'bg-warning/10 text-warning border-warning/20';
        case 'rejected': return 'bg-error/10 text-error border-error/20';
        default: return 'bg-base-200 text-base-content/50 border-base-300';
    }
};

const ClubCard = ({ club, onDelete, onEdit, isDeleting, onViewMembers }) => {
    return (
        <div className="bg-base-100 rounded-2xl overflow-hidden border border-base-content/5 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group flex flex-col h-full">
            <div className="relative h-44 overflow-hidden">
                {club.bannerImage ? (
                    <img 
                        src={club.bannerImage} 
                        alt={club.clubName} 
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-base-200 text-base-content/20 font-black uppercase text-[10px]">No Banner</div>
                )}
                <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest border backdrop-blur-md shadow-sm ${getStatusClasses(club.status)}`}>
                        {club.status}
                    </span>
                </div>
            </div>
            
            <div className="p-5 flex-grow space-y-4">
                <h3 className="text-lg font-black text-base-content leading-tight group-hover:text-primary transition-colors truncate">
                    {club.clubName}
                </h3>
                
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-base-content/60">
                        <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600"><FiUsers size={14}/></div>
                        <span>{club.membersCount || 0} Members</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-base-content/60">
                        <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-600"><FiMapPin size={14}/></div>
                        <span className="truncate">{club.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-base-content/60">
                        <div className="p-1.5 rounded-md bg-success/10 text-success"><FiDollarSign size={14}/></div>
                        <span>Fee: {club.membershipFee === 0 ? 'Free' : `$${club.membershipFee?.toFixed(2)}`}</span>
                    </div>
                </div>
            </div>

            <div className="p-2 grid grid-cols-3 gap-1 bg-base-200/30">
                <button onClick={() => onViewMembers(club._id)} className="btn btn-ghost btn-xs rounded-lg text-primary hover:bg-primary/10 font-black uppercase text-[9px] h-10 tracking-tighter flex flex-col items-center justify-center gap-1">
                    <FiList size={14}/> Members
                </button>
                <button onClick={() => onEdit(club)} className="btn btn-ghost btn-xs rounded-lg text-indigo-600 hover:bg-indigo-50 font-black uppercase text-[9px] h-10 tracking-tighter flex flex-col items-center justify-center gap-1">
                    <FiEdit3 size={14}/> Edit
                </button>
                <button 
                    onClick={() => onDelete(club._id, club.clubName)} 
                    disabled={isDeleting}
                    className="btn btn-ghost btn-xs rounded-lg text-error hover:bg-error/10 font-black uppercase text-[9px] h-10 tracking-tighter flex flex-col items-center justify-center gap-1"
                >
                    <FiTrash2 size={14}/> {isDeleting ? '...' : 'Delete'}
                </button>
            </div>
        </div>
    );
};

export default ClubCard;