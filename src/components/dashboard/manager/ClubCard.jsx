import React from 'react';
import { FiUsers, FiEdit3, FiTrash2, FiMapPin, FiList, FiDollarSign } from 'react-icons/fi';

const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
        case 'approved': return 'bg-success/10 text-success border-success/20';
        case 'pending': return 'bg-warning/10 text-warning border-warning/20';
        case 'rejected': return 'bg-error/10 text-error border-error/20';
        default: return 'bg-background text-text-body/40 border-standard';
    }
};

const ClubCard = ({ club, onDelete, onEdit, isDeleting, onViewMembers }) => {
    return (
        <div className="bg-card rounded-2xl overflow-hidden border-standard shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group flex flex-col h-full animate-in fade-in zoom-in-95">
            
            {/* Banner Section */}
            <div className="relative h-48 overflow-hidden">
                {club.bannerImage ? (
                    <img 
                        src={club.bannerImage} 
                        alt={club.clubName} 
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-background text-text-body/20 font-black uppercase text-[10px] tracking-widest">
                        No Banner Provided
                    </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1.5 text-[10px] font-black rounded-xl uppercase tracking-tighter border backdrop-blur-md shadow-lg ${getStatusClasses(club.status)}`}>
                        {club.status}
                    </span>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Content Section */}
            <div className="p-6 flex-grow space-y-5">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                        {club.category || "General"}
                    </p>
                    <h3 className="text-xl font-black text-text-heading leading-tight group-hover:text-primary transition-colors line-clamp-1">
                        {club.clubName}
                    </h3>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 text-sm font-bold text-text-body/70">
                        <div className="w-8 h-8 rounded-xl bg-background border-standard flex items-center justify-center text-primary">
                            <FiUsers size={14}/>
                        </div>
                        <span>{club.membersCount || 0} Members</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm font-bold text-text-body/70">
                        <div className="w-8 h-8 rounded-xl bg-background border-standard flex items-center justify-center text-secondary">
                            <FiMapPin size={14}/>
                        </div>
                        <span className="truncate">{club.location}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm font-bold text-text-body/70">
                        <div className="w-8 h-8 rounded-xl bg-background border-standard flex items-center justify-center text-success">
                            <FiDollarSign size={14}/>
                        </div>
                        <span>Fee: {club.membershipFee === 0 ? 'Free' : `$${club.membershipFee?.toFixed(2)}`}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="p-3 grid grid-cols-3 gap-2 bg-background/50 border-t border-standard">
                <button 
                    onClick={() => onViewMembers(club._id)} 
                    className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl text-text-heading hover:bg-primary/10 hover:text-primary transition-all duration-300 font-black uppercase text-[9px] tracking-widest"
                >
                    <FiList size={16}/> Members
                </button>

                <button 
                    onClick={() => onEdit(club)} 
                    className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl text-text-heading hover:bg-secondary/10 hover:text-secondary transition-all duration-300 font-black uppercase text-[9px] tracking-widest"
                >
                    <FiEdit3 size={16}/> Edit
                </button>

                <button 
                    onClick={() => onDelete(club._id, club.clubName)} 
                    disabled={isDeleting}
                    className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl text-error hover:bg-error/10 transition-all duration-300 font-black uppercase text-[9px] tracking-widest disabled:opacity-30"
                >
                    <FiTrash2 size={16}/> {isDeleting ? '...' : 'Delete'}
                </button>
            </div>
        </div>
    );
};

export default ClubCard;