import React from 'react';
import { format } from 'date-fns';
import { FiDollarSign, FiCalendar, FiMail, FiLayers, FiActivity, FiCreditCard } from 'react-icons/fi';

const AdminPaymentHistoryTable = ({ payments }) => {
    if (payments.length === 0) {
        return (
            <div className="text-center py-16 bg-base-100 rounded-2xl border border-dashed border-base-content/20">
                <FiCreditCard className="mx-auto text-base-content/20 mb-4" size={48} />
                <p className="text-base-content/40 font-black uppercase tracking-widest text-sm">No payment records found yet.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead className="bg-base-200/50">
                    <tr className="border-none text-base-content/70">
                        <th className="font-black uppercase text-[11px] tracking-wider"><span className="flex items-center gap-2"><FiCalendar /> Date</span></th>
                        <th className="font-black uppercase text-[11px] tracking-wider"><span className="flex items-center gap-2"><FiMail /> User</span></th>
                        <th className="font-black uppercase text-[11px] tracking-wider"><span className="flex items-center gap-2"><FiDollarSign /> Amount</span></th>
                        <th className="font-black uppercase text-[11px] tracking-wider text-center">Type</th>
                        <th className="font-black uppercase text-[11px] tracking-wider"><span className="flex items-center gap-2"><FiLayers /> Source</span></th>
                        <th className="text-right font-black uppercase text-[11px] tracking-wider"><span className="flex items-center gap-2 justify-end"><FiActivity /> Status</span></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-base-content/5">
                    {payments.map((payment) => (
                        <tr key={payment._id} className="hover:bg-base-200/30 transition-colors border-base-content/5">
                            <td className="text-xs font-bold text-base-content/60">
                                {format(new Date(payment.createdAt), 'MMM dd, yyyy')}
                            </td>
                            <td className="font-bold text-base-content">
                                {payment.userEmail}
                            </td>
                            <td className="font-black text-success">
                                <div className="flex items-center tracking-tighter">
                                    <FiDollarSign size={14} />
                                    {payment.amount.toFixed(2)}
                                </div>
                            </td>
                            <td className="text-center">
                                <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter rounded-md ${
                                    payment.type === 'event' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                    {payment.type}
                                </span>
                            </td>
                            <td>
                                <div className="max-w-[180px]">
                                    <p className="font-black text-xs truncate text-base-content/80">
                                        {payment.type === 'event' ? payment.eventName : payment.clubName}
                                    </p>
                                    {payment.type === 'event' && (
                                        <p className="text-[10px] font-bold text-base-content/40 italic truncate">
                                            via {payment.clubName}
                                        </p>
                                    )}
                                </div>
                            </td>
                            <td className="text-right">
                                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                                    payment.paymentStatus === 'paid' || payment.paymentStatus === 'succeeded' 
                                    ? 'bg-green-100 text-green-600 border-green-200' 
                                    : 'bg-red-100 text-red-600 border-red-200'
                                }`}>
                                    {payment.paymentStatus || 'unknown'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPaymentHistoryTable;