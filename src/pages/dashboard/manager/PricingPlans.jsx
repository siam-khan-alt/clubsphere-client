import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiCheck, FiX, FiCrown, FiZap, FiStar, FiLoader } from "react-icons/fi";
import DashboardHeader from "../../../components/shared/ui/DashboardHeader";

const PricingPlans = () => {
  const { clubId } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const { data: subscription, isLoading } = useQuery({
    queryKey: ["subscription", clubId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/subscriptions/status/${clubId}`);
      return res.data;
    },
    enabled: !!clubId,
  });

  const checkoutMutation = useMutation({
    mutationFn: async (planId) => {
      const res = await axiosSecure.post("/subscriptions/checkout", {
        clubId,
        planId,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: error.response?.data?.message || "Failed to create checkout session",
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.delete(`/subscriptions/cancel/${clubId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["subscription", clubId]);
      Swal.fire({
        icon: "success",
        title: "Subscription Cancelled",
        text: "Your subscription has been cancelled successfully",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Cancellation Failed",
        text: error.response?.data?.message || "Failed to cancel subscription",
      });
    },
  });

  const handleUpgrade = (planId) => {
    if (subscription?.plan === planId && subscription?.status === "active") {
      Swal.fire({
        icon: "info",
        title: "Already Subscribed",
        text: "You are already on this plan",
      });
      return;
    }

    Swal.fire({
      title: "Upgrade to " + planId.charAt(0).toUpperCase() + planId.slice(1) + " Plan",
      text: "You will be redirected to Stripe for payment",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0284c7",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Proceed to Payment",
    }).then((result) => {
      if (result.isConfirmed) {
        checkoutMutation.mutate(planId);
      }
    });
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Cancel Subscription?",
      text: "Your subscription will remain active until the end of the current billing period",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#0284c7",
      confirmButtonText: "Yes, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate();
      }
    });
  };

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 0,
      icon: <FiStar size={24} />,
      features: [
        "Up to 50 members",
        "Up to 5 events/month",
        "Basic analytics",
        "Email support",
      ],
      color: "from-gray-500 to-gray-600",
    },
    {
      id: "pro",
      name: "Pro",
      price: 29.99,
      icon: <FiZap size={24} />,
      features: [
        "Up to 200 members",
        "Up to 20 events/month",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
      ],
      color: "from-blue-500 to-blue-600",
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 99.99,
      icon: <FiCrown size={24} />,
      features: [
        "Unlimited members",
        "Unlimited events",
        "Custom branding",
        "Dedicated support",
        "API access",
        "White-label option",
      ],
      color: "from-purple-500 to-purple-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <FiLoader className="animate-spin text-primary text-4xl" />
      </div>
    );
  }

  const currentPlan = subscription?.plan || "basic";
  const isActive = subscription?.status === "active";

  return (
    <div className="pb-10">
      <DashboardHeader
        title="Pricing Plans"
        description="Upgrade your club's plan to unlock more features"
        badgeText="Manager"
      />

      {/* Current Plan Status */}
      <div className="bg-card border-standard rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-text-heading uppercase tracking-tight">
              Current Plan: {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
            </h3>
            <p className="text-sm text-text-body mt-1">
              Status:{" "}
              <span
                className={`font-bold ${
                  isActive ? "text-emerald-500" : "text-secondary"
                }`}
              >
                {isActive ? "Active" : subscription?.status || "Inactive"}
              </span>
              {subscription?.expiresAt && (
                <span className="ml-2 text-text-body/60">
                  • Expires: {new Date(subscription.expiresAt).toLocaleDateString()}
                </span>
              )}
            </p>
          </div>
          {isActive && currentPlan !== "basic" && (
            <button
              onClick={handleCancel}
              disabled={cancelMutation.isPending}
              className="px-6 py-2.5 bg-secondary/10 text-secondary hover:bg-secondary hover:text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all disabled:opacity-50"
            >
              {cancelMutation.isPending ? "Cancelling..." : "Cancel Subscription"}
            </button>
          )}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan === plan.id;
          const isPopular = plan.popular;

          return (
            <div
              key={plan.id}
              className={`relative bg-card border-standard rounded-2xl p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/30 ${
                isPopular ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
              } ${isCurrentPlan ? "bg-primary/5" : ""}`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${plan.color} text-white`}>
                  {plan.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-text-heading uppercase tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-3xl font-black text-primary">
                    ${plan.price}
                    <span className="text-sm font-normal text-text-body/60">/month</span>
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FiCheck className="text-emerald-500 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-sm text-text-body">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={
                  isCurrentPlan ||
                  checkoutMutation.isPending ||
                  (isActive && plan.id === "basic")
                }
                className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                  isCurrentPlan
                    ? "bg-emerald-500/10 text-emerald-500 cursor-default"
                    : `bg-gradient-to-r ${plan.color} text-white hover:opacity-90 disabled:opacity-50`
                }`}
              >
                {isCurrentPlan
                  ? "Current Plan"
                  : checkoutMutation.isPending
                  ? "Processing..."
                  : isActive && plan.id === "basic"
                  ? "Downgrade"
                  : "Upgrade"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingPlans;
