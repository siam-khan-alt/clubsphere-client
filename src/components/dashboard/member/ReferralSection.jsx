import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthContext";
import { getReferralStats } from "../../../utils/referralService";
import { FiCopy, FiShare2, FiUsers, FiDollarSign, FiCheck } from "react-icons/fi";
import Swal from "sweetalert2";

const ReferralSection = () => {
  const { user } = React.useContext(AuthContext);
  const [copied, setCopied] = useState(false);

  const { data: referralData, isLoading } = useQuery({
    queryKey: ["referralStats"],
    queryFn: async () => {
      const token = await user.getIdToken();
      return await getReferralStats(token);
    },
    enabled: !!user,
  });

  const handleCopyLink = () => {
    if (referralData?.referralLink) {
      navigator.clipboard.writeText(referralData.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      Swal.fire({
        icon: "success",
        title: "Copied!",
        text: "Referral link copied to clipboard",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-card border-standard rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border-standard rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/20 rounded-xl">
          <FiShare2 className="text-primary text-xl" />
        </div>
        <div>
          <h3 className="text-lg font-black text-text-heading uppercase tracking-tight">
            Refer & Earn
          </h3>
          <p className="text-xs text-text-body/60">
            Share your referral link and earn credits
          </p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="mb-6">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-body/40 mb-2 block">
          Your Referral Link
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralData?.referralLink || ""}
            readOnly
            className="flex-1 px-4 py-3 bg-background border-standard rounded-xl text-sm text-text-body/70"
          />
          <button
            onClick={handleCopyLink}
            className="px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-background/50 border-standard rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FiUsers className="text-primary" size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest text-text-body/40">
              Total Referrals
            </span>
          </div>
          <div className="text-2xl font-black text-text-heading">
            {referralData?.totalReferrals || 0}
          </div>
        </div>

        <div className="bg-background/50 border-standard rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FiDollarSign className="text-emerald-500" size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest text-text-body/40">
              Credits Earned
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-500">
            ${referralData?.creditsEarned?.toFixed(2) || "0.00"}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-xl">
        <p className="text-xs text-text-body/70">
          <span className="font-bold text-primary">Earn 10% credits</span> on every successful referral's first payment (up to $10 per referral).
        </p>
      </div>
    </div>
  );
};

export default ReferralSection;
