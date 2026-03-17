import React from "react";
import { FiX, FiUsers } from "react-icons/fi";
import { format } from "date-fns";

const ViewRegistrationModal = ({ isOpen, onClose, registrations, eventTitle, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-md z-[100] flex justify-center items-center p-4">
            <div className="bg-card border-standard rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-6 border-b border-standard/50 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-black text-text-body uppercase tracking-tight flex items-center gap-2">
                            <FiUsers className="text-primary" /> Attendees
                        </h3>
                        <p className="text-[10px] font-bold text-text-body/40 uppercase tracking-widest mt-1">{eventTitle}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                        <FiX size={20} />
                    </button>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {isLoading ? (
                        <div className="flex justify-center py-10"><span className="loading loading-spinner text-primary"></span></div>
                    ) : registrations.length === 0 ? (
                        <div className="text-center py-12 opacity-30 font-black uppercase text-[10px] tracking-widest">No one registered yet</div>
                    ) : (
                        <table className="w-full text-left border-separate border-spacing-y-3">
                            <thead>
                                <tr className="text-[10px] font-black uppercase tracking-widest text-text-body/30">
                                    <th className="px-4 pb-2">Member</th>
                                    <th className="px-4 pb-2 text-right">Fee</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.map((reg, idx) => (
                                    <tr key={idx} className="bg-background/50 hover:bg-primary/5 transition-colors group">
                                        <td className="px-4 py-3 rounded-l-xl border-y border-l border-standard/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary uppercase">
                                                    {reg.userEmail.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-text-body">{reg.userEmail}</p>
                                                    <p className="text-[9px] text-text-body/40 font-bold uppercase">{reg.registeredAt ? format(new Date(reg.registeredAt), "MMM dd, yyyy") : ""}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 rounded-r-xl border-y border-r border-standard/50 text-right font-black text-xs text-primary">
                                            ৳ {reg.amount || "0"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewRegistrationModal;