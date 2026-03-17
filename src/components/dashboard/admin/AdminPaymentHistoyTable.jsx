import React from 'react';
import { format } from 'date-fns';
import { FiDollarSign, FiCalendar, FiUser, FiLayers, FiCheckCircle, FiInfo } from 'react-icons/fi';

const AdminPaymentHistoryTable = ({ payments }) => {
    if (payments.length === 0) {
        return (
            <div className="text-center py-24 bg-card border-standard rounded-2xl">
                <div className="h-20 w-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiInfo className="text-primary opacity-30" size={40} />
                </div>
                <p className="text-text-heading font-black uppercase tracking-[0.4em] text-xs opacity-40">No records found in this sector</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto mx-2">
            <table className="table w-full  border-separate border-spacing-y-2">
                <thead>
                    <tr className="text-text-heading border-none">
                        <th className="bg-transparent font-black uppercase text-[10px] tracking-widest py-4 px-6">
                            <span className="flex items-center gap-2"><FiCalendar className="text-primary"/> Date</span>
                        </th>
                        <th className="bg-transparent font-black uppercase text-[10px] tracking-widest py-4 px-6">
                            <span className="flex items-center gap-2"><FiUser className="text-primary"/> User</span>
                        </th>
                        <th className="bg-transparent font-black uppercase text-[10px] tracking-widest py-4 px-6">
                            <span className="flex items-center gap-2"><FiDollarSign className="text-primary"/> Amount</span>
                        </th>
                        <th className="bg-transparent font-black uppercase text-[10px] tracking-widest py-4 px-6">
                            <span className="flex items-center gap-2"><FiLayers className="text-primary"/> Source</span>
                        </th>
                        <th className="bg-transparent font-black uppercase text-[10px] tracking-widest py-4 px-6 text-right">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="space-y-2 border-standard">
                    {payments.map((payment) => {
                        const isEvent = payment.type === 'event';
                        const displayType = payment.type === 'membership' ? 'Club' : payment.type;

                        return (
                            <tr key={payment._id} className="group  transition-all duration-300">
                                {/* Date Column */}
                                <td className="py-5  px-6 bg-card first:rounded-l-2xl  transition-colors">
                                    <p className="text-xs font-bold text-text-heading">
                                        {format(new Date(payment.createdAt), 'MMM dd, yyyy')}
                                    </p>
                                    <p className="text-[9px] font-black opacity-30 uppercase tracking-tighter text-text-body">
                                        {format(new Date(payment.createdAt), 'hh:mm a')}
                                    </p>
                                </td>

                                {/* User Column */}
                                <td className="py-5 px-6 bg-card  transition-colors">
                                    <span className="text-xs font-bold text-text-body group-hover:text-primary transition-colors">
                                        {payment.userEmail}
                                    </span>
                                </td>

                                {/* Amount Column */}
                                <td className="py-5 px-6 bg-card  transition-colors">
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs font-black text-primary">$</span>
                                        <span className="text-lg font-black text-text-heading tracking-tighter">
                                            {payment.amount.toFixed(2)}
                                        </span>
                                    </div>
                                </td>

                                {/* Source Column */}
                                <td className="py-5 px-6 bg-card  transition-colors">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${isEvent ? 'bg-secondary' : 'bg-primary'}`}></span>
                                            <p className="text-[11px] font-black text-text-heading uppercase tracking-wider truncate max-w-[150px]">
                                                {isEvent ? payment.eventName : payment.clubName}
                                            </p>
                                        </div>
                                        <span className="text-[9px] font-black opacity-40 uppercase tracking-widest ml-3 text-text-body">
                                            {displayType}
                                        </span>
                                    </div>
                                </td>

                                {/* Status Column */}
                                <td className="py-5 px-6 bg-card last:rounded-r-2xl text-right  transition-colors">
                                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl  text-[10px] font-black uppercase tracking-widest ${
                                        payment.paymentStatus === 'paid' || payment.paymentStatus === 'succeeded'
                                        ? 'bg-primary/10 text-primary border-primary/20'
                                        : 'bg-secondary/10 text-secondary border-secondary/20'
                                    }`}>
                                        <FiCheckCircle size={12} />
                                        {payment.paymentStatus || 'unknown'}
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

export default AdminPaymentHistoryTable;