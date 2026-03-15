import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiZap,
  FiShield,
  FiCreditCard,
  FiLayers,
  FiPlus,
  FiCheckCircle,
} from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex flex-col overflow-hidden bg-background transition-colors duration-500">
      {/* Background Plaid Effect */}
      <div className="plaid-bg absolute inset-0 opacity-[0.07] pointer-events-none"></div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 w-full relative z-10">
        {/* --- LEFT SIDE: Content --- */}
        <div className="lg:col-span-6 p-6  flex flex-col justify-between relative">
          {/* Decorative Plus Markers */}
          <FiPlus className="absolute top-10 right-0 text-slate-300 dark:text-slate-700 hidden lg:block" />
          <FiPlus className="absolute bottom-10 right-0 text-slate-300 dark:text-slate-700 hidden lg:block" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Role Badges */}
            <div className="flex gap-6 mb-8">
              {[
                { name: "Admin", dot: "bg-primary" },
                { name: "Manager", dot: "bg-secondary" },
                { name: "Member", dot: "bg-slate-400 dark:bg-slate-600" },
              ].map((role) => (
                <div
                  key={role.name}
                  className="flex items-center gap-2 group cursor-default"
                >
                  {/* Minimalist Indicator */}
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${role.dot} z-10`}
                    ></span>
                    <span
                      className={`absolute h-3 w-3 rounded-full ${role.dot} opacity-20 group-hover:scale-150 transition-transform duration-500`}
                    ></span>
                  </div>

                  {/* Label */}
                  <span className="text-[10px] font-black text-text-heading tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                    {role.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold mb-6 tracking-[0.2em] uppercase">
              <FiZap className="animate-pulse" /> Future of Campus Life
            </div>

            {/* Project Name (Clean & Balanced Size) */}
            <h1
              style={{ fontFamily: "Outfit, sans-serif" }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-[1.1] text-text-heading mb-8 tracking-tighter"
            >
              CLUB <span className="text-secondary ">SPHERE.</span>
            </h1>

            <p className="text-lg text-text-body max-w-lg font-medium mb-8 leading-relaxed">
              Managing leadership, events, and membership in one{" "}
              <span className="text-text-heading font-bold underline decoration-primary/30">
                decentralized portal.
              </span>
            </p>

            {/* Core Feature Checklist */}
            <div className="grid grid-cols-2 gap-y-3 mb-10">
              {[
                "Real-time Data Sync",
                "Secure Stripe Payment",
                "Adaptive Workspaces", // Updated
                "Dynamic Event Tracking",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-[11px] font-bold text-text-body"
                >
                  <FiCheckCircle className="text-primary" /> {item}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-8">
              <Link
                to="/clubs"
                className="btn-primary-gradient px-10 py-4 !rounded-full text-md font-bold flex items-center gap-3 "
              >
                Join Now <FiArrowUpRight size={20} />
              </Link>
              <div className="hidden sm:flex flex-col border-l border-slate-200 dark:border-slate-800 pl-6">
                <span className="text-xl font-black text-text-heading leading-none">
                  2.4k+
                </span>
                <span className="text-[9px] uppercase font-bold text-text-body tracking-widest mt-1">
                  Active Members
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT SIDE: Grid Matrix (Minimalist) --- */}
        <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 relative h-full">
          {/* Central Intersection Plus Symbol */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-10 h-10 text-slate-300 dark:text-slate-700 font-light">
            <FiPlus size={30} />
          </div>

          {/* Feature 1: Governance */}
          <div className="p-6 lg:p-10 flex flex-col justify-center border-b border-slate-200 dark:border-slate-800 md:border-r">
            <FiShield size={28} className="text-primary mb-5" />
            <h4 className="font-bold text-text-heading text-xl mb-3">
              Governance
            </h4>
            <p className="text-xs text-text-body leading-relaxed max-w-[180px]">
              Robust RBAC systems for secure campus-wide role management.
            </p>
          </div>

          {/* Feature 2: Intelligence */}
          <div className="p-6 lg:p-10 flex flex-col justify-center border-b border-slate-200 dark:border-slate-800 group">
            <div className="flex gap-1 items-end h-6 mb-5">
              {[40, 70, 50, 90].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className="w-1.5 bg-secondary/40 rounded-full"
                />
              ))}
            </div>
            <h4 className="font-bold text-text-heading text-xl mb-3">
              Intelligence
            </h4>
            <p className="text-xs text-text-body leading-relaxed max-w-[180px]">
              Data-driven insights to track community engagement levels.
            </p>
          </div>

          {/* Feature 3: Commerce */}
          <div className="p-6 lg:p-10 flex flex-col justify-center border-slate-200 dark:border-slate-800 md:border-r">
            <FiCreditCard size={28} className="text-green-500 mb-5" />
            <h4 className="font-bold text-text-heading text-xl mb-3">
              Commerce
            </h4>
            <p className="text-xs text-text-body leading-relaxed max-w-[180px]">
              Secure Stripe billing for memberships and event ticketing.
            </p>
          </div>

          {/* Feature 4: Command Center (Updated) */}
          <Link
            to="/dashboard"
            className="p-6 lg:p-10 flex flex-col justify-center bg-slate-50/50 dark:bg-slate-900/30 group hover:bg-primary transition-all duration-700"
          >
            <div className="flex justify-between items-start mb-5">
              <FiLayers
                size={28}
                className="text-primary group-hover:text-white transition-colors"
              />
              <FaArrowRight
                size={20}
                className="text-slate-400 group-hover:text-white  transition-all"
              />
            </div>
            <h4 className="font-bold text-text-heading text-xl group-hover:text-white transition-colors">
              Command Center
            </h4>
            <p className="text-xs text-text-body group-hover:text-white/80 transition-colors">
              Tailored interface synchronized with your rank.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
