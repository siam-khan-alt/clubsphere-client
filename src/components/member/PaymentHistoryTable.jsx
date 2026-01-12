import React from "react";
import { format } from "date-fns";
import { FiDollarSign, FiCreditCard, FiArrowUpRight } from "react-icons/fi";

const PaymentHistoryTable = ({ payments }) => {
  if (payments.length === 0) {
    return (
      <div className="text-center py-16 bg-base-100 rounded-2xl border border-dashed border-base-content/20 shadow-sm">
        <FiCreditCard className="mx-auto text-5xl text-base-content/20 mb-4" />
        <p className="text-base-content/50 text-lg font-bold">You have no payment records yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-2xl border border-base-content/5 shadow-sm overflow-hidden">
      <table className="table w-full">
        <thead className="bg-base-200/50">
          <tr className="border-b border-base-content/5">
            <th className="bg-transparent text-base-content/70 font-bold uppercase text-[10px] tracking-widest">Date</th>
            <th className="bg-transparent text-base-content/70 font-bold uppercase text-[10px] tracking-widest">Amount</th>
            <th className="bg-transparent text-base-content/70 font-bold uppercase text-[10px] tracking-widest">Category</th>
            <th className="bg-transparent text-base-content/70 font-bold uppercase text-[10px] tracking-widest">Reference</th>
            <th className="bg-transparent text-base-content/70 font-bold uppercase text-[10px] tracking-widest">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-base-content/5">
          {payments.map((payment) => (
            <tr key={payment._id} className="hover:bg-base-200/30 transition-colors">
              <td className="text-sm font-medium text-base-content/60">
                {format(new Date(payment.createdAt), "MMM d, yyyy")}
              </td>
              <td className="font-black text-success flex items-center gap-1 text-base">
                <FiDollarSign size={14} />
                {payment.amount.toFixed(2)}
              </td>
              <td>
                <span className="badge badge-outline border-base-content/10 rounded-2xl text-[10px] font-bold uppercase px-3 py-3">
                  {payment.type}
                </span>
              </td>
              <td className="max-w-[200px]">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-base-content truncate">
                    {payment.eventName || payment.clubName}
                  </span>
                  {payment.type === "event" && (
                    <span className="text-[10px] text-base-content/50 italic font-medium">@{payment.clubName}</span>
                  )}
                </div>
              </td>
              <td>
                <span className={`badge rounded-2xl font-black text-[10px] border-none px-4 ${
                  (payment.status === "paid" || payment.paymentStatus === "succeeded")
                    ? "bg-success/10 text-success"
                    : "bg-error/10 text-error"
                }`}>
                  {(payment.status || payment.paymentStatus || "unknown").toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistoryTable;