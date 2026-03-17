import React from 'react';
import { FiMail, FiCalendar, FiSlash, FiUser } from "react-icons/fi";
import { format } from "date-fns";

const getStatusBadge = (status) => {
  const isActive = status?.toLowerCase() === "active";
  const isPending = status?.toLowerCase() === "pendingpayment";

  return (isActive || isPending) ? (
    <span className="px-3 py-1.5 text-[10px] font-black rounded-xl uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
      {isActive ? "Active" : "Pending"}
    </span>
  ) : (
    <span className="px-3 py-1.5 text-[10px] font-black rounded-xl uppercase tracking-widest bg-secondary/10 text-secondary border border-secondary/20">
      Expired
    </span>
  );
};

const MemberTable = ({ members, onExpireMember }) => {
  return (
    <div className="w-full overflow-x-auto custom-scrollbar">
      <table className="table w-full border-separate border-spacing-y-3 px-2">
        <thead>
          <tr className="text-text-body/40 border-none">
            <th className="bg-transparent font-black uppercase text-[11px] tracking-widest pl-8">Member Information</th>
            <th className="bg-transparent font-black uppercase text-[11px] tracking-widest text-center">Membership Details</th>
            <th className="bg-transparent font-black uppercase text-[11px] tracking-widest text-center">Status</th>
            <th className="bg-transparent font-black uppercase text-[11px] tracking-widest text-right pr-8">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id} className="bg-card border-standard shadow-sm hover:shadow-md transition-all duration-300 group">
              {/* Member Info */}
              <td className="rounded-l-2xl border-y border-l border-primary/10 pl-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <FiUser size={18} />
                  </div>
                  <div>
                    <div className="font-black text-sm text-text-heading tracking-tight">
                      {member.userEmail.split('@')[0]}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-text-body/40 mt-0.5">
                      <FiMail size={12} className="text-primary/60" /> {member.userEmail}
                    </div>
                  </div>
                </div>
              </td>

              {/* Joined Date */}
              <td className="border-y border-primary/10 text-center">
                <div className="inline-flex flex-col items-center">
                  <span className="font-bold text-xs text-text-body flex items-center gap-2">
                    <FiCalendar className="text-secondary/60" /> 
                    {format(new Date(member.joinedAt), "MMM dd, yyyy")}
                  </span>
                  <span className="text-[10px] font-black text-text-body/20 uppercase tracking-tighter mt-1">
                    Registration Date
                  </span>
                </div>
              </td>

              {/* Status Badge */}
              <td className="border-y border-primary/10 text-center">
                {getStatusBadge(member.status)}
              </td>

              {/* Actions */}
              <td className="rounded-r-2xl border-y border-r border-primary/10 pr-8 text-right">
                <button
                  onClick={() => onExpireMember(member._id)}
                  disabled={member.status === "expired"}
                  className={`h-9 px-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 flex items-center gap-2 ml-auto
                    ${member.status === "expired"
                      ? "bg-text-body/5 text-text-body/20 cursor-not-allowed border border-transparent"
                      : "bg-secondary/5 text-secondary border border-secondary/20 hover:bg-secondary hover:text-white shadow-sm"
                    }`}
                >
                  <FiSlash size={14} />
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