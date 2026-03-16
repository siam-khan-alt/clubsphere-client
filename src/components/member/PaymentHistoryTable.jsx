import React from "react";
import { format } from "date-fns";
import { FiDollarSign, FiCreditCard, FiCalendar, FiTag } from "react-icons/fi";

const PaymentHistoryTable = ({ payments }) => {
  if (payments.length === 0) {
    return (
      <div className="text-center py-20 bg-card border-standard border-dashed rounded-[2rem] space-y-4">
        <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto text-primary/20">
            <FiCreditCard size={40} className="text-primary" />
        </div>
        <h3 className="!mb-0 !text-xl font-bold text-text-heading">No Payments Yet</h3>
        <p className="text-text-body opacity-60">Your transaction history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border-standard rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background/50 border-b border-standard">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-body opacity-70">Date</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-body opacity-70">Amount</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-body opacity-70">Category</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-body opacity-70">Reference</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-text-body opacity-70 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-standard">
            {payments.map((payment) => {
              // Status Logic based on your theme colors
              const isSuccess = payment.status === "paid" || payment.paymentStatus === "succeeded";
              
              return (
                <tr key={payment._id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-5">
                     <div className="flex items-center gap-2 text-sm font-bold text-text-heading">
                        <FiCalendar className="text-primary" />
                        {format(new Date(payment.createdAt), "MMM d, yyyy")}
                     </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1 font-black text-primary">
                      <FiDollarSign size={14} />
                      {payment.amount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase border border-primary/10">
                      <FiTag size={10} />
                      {payment.type}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col max-w-[250px]">
                      <span className="text-sm font-bold text-text-heading truncate group-hover:text-primary transition-colors">
                        {payment.eventName || payment.clubName}
                      </span>
                      {payment.type === "event" && (
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-tighter">@{payment.clubName}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className={`inline-block px-4 py-1.5 rounded-full font-black text-[10px] uppercase border transition-all ${
                      isSuccess
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-secondary/10 text-secondary border-secondary/20"
                    }`}>
                      {payment.status || payment.paymentStatus || "unknown"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;