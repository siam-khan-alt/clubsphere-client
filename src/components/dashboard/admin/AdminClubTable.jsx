import React from 'react';
import { FiCheck, FiX, FiEye, FiUser, FiCalendar, FiTrash2 } from 'react-icons/fi';
import { TbFidgetSpinner } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const AdminClubTable = ({ clubs, handleApprove, handleReject, handleDelete, isMutating }) => {
    return (
        <div className="w-full overflow-x-auto custom-scrollbar">
            <table className="table w-full border-separate border-spacing-y-4 px-2 ">
                <thead>
                    <tr className="text-text-body/40 border-none">
                        <th className="bg-transparent font-black uppercase text-[11px] tracking-widest pl-10 py-6">Identity</th>
                        <th className="bg-transparent font-black uppercase text-[11px] tracking-widest">Authority</th>
                        <th className="bg-transparent font-black uppercase text-[11px] tracking-widest text-center">Activity</th>
                        <th className="bg-transparent font-black uppercase text-[11px] tracking-widest text-right pr-10">Control</th>
                    </tr>
                </thead>
                <tbody>
                    {clubs.map((club) => {
                        const isPending = club.status?.toLowerCase() === 'pending';
                        return (
                            <tr key={club._id} className="group">
                                {/* Identity */}
                                <td className="bg-card border-y border-l border-standard rounded-l-2xl pl-10 py-6 transition-all group-hover:border-primary/50">
                                    <div className="flex items-center gap-5">
                                        <div className="h-14 w-14 rounded-2xl bg-background border-standard flex items-center justify-center text-primary font-black text-xl shadow-inner">
                                            {club.clubName.charAt(0)}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="font-black text-text-heading text-base tracking-tight">{club.clubName}</div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">
                                                {club.membershipFee > 0 ? `$${club.membershipFee}` : "Free"}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Authority */}
                                <td className="bg-card border-y border-standard">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-text-heading">{club.managerEmail.split('@')[0]}</span>
                                        <span className="text-[10px] font-medium text-text-body opacity-60 tracking-tighter">{club.managerEmail}</span>
                                    </div>
                                </td>

                                {/* Stats */}
                                <td className="bg-card border-y border-standard text-center">
                                    <div className="flex items-center justify-center gap-6">
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1.5 text-primary">
                                                <FiUser size={14} className="stroke-[3]" />
                                                <span className="text-sm font-black tracking-tighter">{club.membersCount}</span>
                                            </div>
                                            <span className="text-[8px] font-black uppercase opacity-30 tracking-widest mt-1">Users</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1.5 text-secondary">
                                                <FiCalendar size={14} className="stroke-[3]" />
                                                <span className="text-sm font-black tracking-tighter">{club.eventsCount}</span>
                                            </div>
                                            <span className="text-[8px] font-black uppercase opacity-30 tracking-widest mt-1">Events</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="bg-card border-y border-r border-standard rounded-r-2xl pr-10 text-right">
                                    <div className="flex justify-end gap-3">
                                        {isPending ? (
                                            <>
                                                <button 
                                                    onClick={() => handleApprove(club._id)}
                                                    disabled={isMutating}
                                                    className="h-11 w-11 flex items-center justify-center bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                                >
                                                    {isMutating ? <TbFidgetSpinner className="animate-spin" /> : <FiCheck size={20} strokeWidth={3} />}
                                                </button>
                                                <button 
                                                    onClick={() => handleReject(club._id)}
                                                    disabled={isMutating}
                                                    className="h-11 w-11 flex items-center justify-center bg-background border-standard text-secondary hover:bg-secondary hover:text-white rounded-xl transition-all disabled:opacity-50"
                                                >
                                                    {isMutating ? <TbFidgetSpinner className="animate-spin" /> : <FiX size={20} strokeWidth={3} />}
                                                </button>
                                            </>
                                        ) : (
                                            <div className="flex justify-end gap-2">
                                                <Link to={`/clubs/${club._id}`}>
                                                    <button className="btn-primary-gradient !px-4 !py-2.5 !text-[10px] uppercase tracking-widest flex items-center gap-2">
                                                        <FiEye size={14} /> View
                                                    </button>
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(club._id)}
                                                    disabled={isMutating}
                                                    className="h-11 w-11 flex items-center justify-center bg-background border-standard text-error hover:bg-error hover:text-white rounded-xl transition-all disabled:opacity-50"
                                                    title="Delete Club"
                                                >
                                                    {isMutating ? <TbFidgetSpinner className="animate-spin" /> : <FiTrash2 size={18} strokeWidth={3} />}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AdminClubTable;