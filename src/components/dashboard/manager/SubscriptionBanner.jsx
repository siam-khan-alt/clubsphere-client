import React from "react";
import { FiAlertTriangle, FiCrown, FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

const SubscriptionBanner = ({ subscription, clubId }) => {
  if (!subscription) return null;

  const { plan, status, expiresAt } = subscription;
  const isExpired = status === "expired" || (expiresAt && new Date(expiresAt) < new Date());
  const isExpiringSoon = expiresAt && new Date(expiresAt) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && !isExpired;

  if (isExpired) {
    return (
      <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-4 mb-6 flex items-center gap-4">
        <div className="p-3 bg-secondary/20 rounded-xl">
          <FiAlertTriangle className="text-secondary text-xl" />
        </div>
        <div className="flex-1">
          <h4 className="font-black text-text-heading uppercase tracking-tight text-sm">
            Subscription Expired
          </h4>
          <p className="text-xs text-text-body mt-1">
            Your subscription has expired. Upgrade to continue using premium features.
          </p>
        </div>
        <Link
          to={`/dashboard/manager/pricing/${clubId}`}
          className="px-4 py-2 bg-secondary text-white hover:bg-secondary/90 rounded-xl font-bold uppercase tracking-widest text-xs transition-all"
        >
          Upgrade Now
        </Link>
      </div>
    );
  }

  if (isExpiringSoon) {
    return (
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-6 flex items-center gap-4">
        <div className="p-3 bg-amber-500/20 rounded-xl">
          <FiInfo className="text-amber-500 text-xl" />
        </div>
        <div className="flex-1">
          <h4 className="font-black text-text-heading uppercase tracking-tight text-sm">
            Subscription Expiring Soon
          </h4>
          <p className="text-xs text-text-body mt-1">
            Your subscription expires on {new Date(expiresAt).toLocaleDateString()}. Renew to avoid service interruption.
          </p>
        </div>
        <Link
          to={`/dashboard/manager/pricing/${clubId}`}
          className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-500/90 rounded-xl font-bold uppercase tracking-widest text-xs transition-all"
        >
          Renew Now
        </Link>
      </div>
    );
  }

  if (plan === "basic") {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-6 flex items-center gap-4">
        <div className="p-3 bg-primary/20 rounded-xl">
          <FiCrown className="text-primary text-xl" />
        </div>
        <div className="flex-1">
          <h4 className="font-black text-text-heading uppercase tracking-tight text-sm">
            Upgrade to Unlock More Features
          </h4>
          <p className="text-xs text-text-body mt-1">
            Get access to unlimited members, events, and advanced analytics with Pro or Enterprise plans.
          </p>
        </div>
        <Link
          to={`/dashboard/manager/pricing/${clubId}`}
          className="px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-xl font-bold uppercase tracking-widest text-xs transition-all"
        >
          View Plans
        </Link>
      </div>
    );
  }

  return null;
};

export default SubscriptionBanner;
