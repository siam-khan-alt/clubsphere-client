import React from "react";
import { FiX, FiUsers, FiMail, FiCalendar, FiDollarSign } from "react-icons/fi";
import { format } from "date-fns";

const ViewRegistrationModal = ({ isOpen, onClose, registrations, eventTitle, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-base-content/40 backdrop-blur-md z-[100] flex justify-center items-center p-4">
            <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-base-content/5 animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-base-content/5 flex justify-between items-center bg-base-100/50 backdrop-blur-sm sticky top-0 z-10">
                    <h3 className="text-xl font-black text-base-content tracking-tight flex items-center gap-3 italic uppercase">
                        <FiUsers className="text-primary not-italic" /> Registrations: <span className="text-primary not-italic">{eventTitle}</span>
                    </h3>
                    <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm hover:rotate-90 transition-transform">
                        <FiX size={20} />
                    </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {isLoading ? (
                        <div className="flex justify-center py-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>
                    ) : registrations.length === 0 ? (
                        <div className="text-center py-12">
                            <FiUsers size={40} className="mx-auto mb-4 opacity-10" />
                            <div className="text-[10px] font-black uppercase tracking-widest text-base-content/30">No attendees found yet.</div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr className="text-[10px] font-black uppercase tracking-widest text-base-content/40 border-base-content/5">
                                        <th>Member Info</th>
                                        <th>Registered At</th>
                                        <th>Status</th>
                                        <th className="text-right">Payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrations.map((reg, index) => (
                                        <tr key={index} className="border-base-content/5 hover:bg-base-200/50 transition-colors">
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                                                        {reg.userEmail.slice(0,1).toUpperCase()}
                                                    </div>
                                                    <span className="text-sm font-bold text-base-content/70">{reg.userEmail}</span>
                                                </div>
                                            </td>
                                            <td className="text-xs font-bold text-base-content/50">
                                                {reg.registeredAt ? format(new Date(reg.registeredAt), "MMM d, yyyy") : "N/A"}
                                            </td>
                                            <td>
                                                <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded-2xl border ${
                                                    reg.status === "registered" ? "bg-green-100 text-green-600 border-green-200" : "bg-red-100 text-red-600 border-red-200"
                                                }`}>
                                                    {reg.status}
                                                </span>
                                            </td>
                                            <td className="text-right font-black text-sm text-base-content">
                                                ${reg.amount?.toFixed(2) || "0.00"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="p-4 bg-base-200/30 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-base-content/40 ml-2">Total Attendees: {registrations.length}</span>
                    <button onClick={onClose} className="btn btn-sm btn-ghost rounded-2xl font-black uppercase text-[10px]">Close Directory</button>
                </div>
            </div>
        </div>
    );
};

export default ViewRegistrationModal;