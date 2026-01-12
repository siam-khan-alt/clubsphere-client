import React from "react";
import { FiMail, FiCalendar, FiClock, FiSlash } from "react-icons/fi";
import { format } from "date-fns";

const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
      return (
        <span className="px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest bg-success/10 text-success border border-success/20">
          Active
        </span>
      );
    case "pendingpayment":
      return (
        <span className="px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest bg-warning/10 text-warning border border-warning/20">
          Pending
        </span>
      );
    case "expired":
      return (
        <span className="px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest bg-error/10 text-error border border-error/20">
          Expired
        </span>
      );
    default:
      return (
        <span className="px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest bg-base-200 text-base-content/50">
          Unknown
        </span>
      );
  }
};

const MemberTable = ({ members, onExpireMember }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-collapse">
        <thead>
          <tr className="bg-base-200/50 border-b border-base-content/5">
            <th className="text-[10px] font-black uppercase tracking-widest text-base-content/50 py-5 pl-8">Member Info</th>
            <th className="text-[10px] font-black uppercase tracking-widest text-base-content/50 py-5">Joined Date</th>
            <th className="text-[10px] font-black uppercase tracking-widest text-base-content/50 py-5">Status</th>
            <th className="text-[10px] font-black uppercase tracking-widest text-base-content/50 py-5 pr-8 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-base-content/5">
          {members.map((member) => (
            <tr key={member._id} className="hover:bg-base-200/30 transition-colors group">
              <td className="py-4 pl-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <FiMail size={16} />
                  </div>
                  <span className="text-sm font-bold text-base-content tracking-tight">
                    {member.userEmail}
                  </span>
                </div>
              </td>
              <td className="py-4">
                <div className="flex items-center gap-2 text-xs font-bold text-base-content/60">
                  <FiCalendar className="text-primary/50" />
                  {format(new Date(member.joinedAt), "MMM dd, yyyy")}
                </div>
              </td>
              <td className="py-4">
                {getStatusBadge(member.status)}
              </td>
              <td className="py-4 pr-8 text-right">
                <button
                  onClick={() => onExpireMember(member._id)}
                  className={`btn btn-xs rounded-lg font-black uppercase text-[10px] tracking-widest h-9 px-4 transition-all
                    ${member.status === "expired" 
                      ? "btn-disabled bg-base-200 text-base-content/20" 
                      : "btn-ghost text-error hover:bg-error/10 border border-error/10"
                    }`}
                  disabled={member.status === "expired"}
                >
                  <FiSlash className="mr-1" />
                  {member.status === "expired" ? "Expired" : "Set Expired"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;