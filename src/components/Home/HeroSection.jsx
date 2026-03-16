import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

import {
  FiArrowUpRight,
  FiZap,
  FiShield,
  FiCreditCard,
  FiLayers,
  FiPlus,
  FiCheckCircle,
  FiGlobe,
  FiCpu,
  FiUsers,
  FiActivity,
  FiCalendar,
  FiLock,
  FiTrendingUp,
  FiSearch
} from "react-icons/fi";

const HeroSection = () => {
  const featureSets = [
    {
      id: 1,
      items: [
        { icon: <FiShield />, title: "Governance", desc: "Robust RBAC systems for secure role management.", color: "text-primary" },
        { icon: <FiActivity />, title: "Intelligence", desc: "Data-driven insights to track community engagement.", color: "text-secondary" }, // চার্ট অপশন সরিয়ে দেওয়া হয়েছে
        { icon: <FiCreditCard />, title: "Commerce", desc: "Secure Stripe billing for memberships.", color: "text-green-500" },
        { icon: <FiLayers />, title: "Command Center", desc: "Tailored interface synchronized with your rank.", color: "text-blue-500" },
      ]
    },
    {
      id: 2,
      items: [
        { icon: <FiGlobe />, title: "Global Reach", desc: "Connect with clubs across different campuses.", color: "text-cyan-500" },
        { icon: <FiCpu />, title: "Automation", desc: "Automated event scheduling and reminders.", color: "text-purple-500" },
        { icon: <FiUsers />, title: "Community", desc: "Foster growth through collaborative tools.", color: "text-orange-500" },
        { icon: <FiZap />, title: "Real-time Sync", desc: "Instant data updates across all devices.", color: "text-yellow-500" },
      ]
    },
    {
      id: 3,
      items: [
        { icon: <FiCalendar />, title: "Event Matrix", desc: "Dynamic calendars for upcoming club activities.", color: "text-rose-500" },
        { icon: <FiLock />, title: "Encryption", desc: "End-to-end data protection for every member.", color: "text-emerald-500" },
        { icon: <FiTrendingUp />, title: "Scalability", desc: "Built to handle thousands of active clubs.", color: "text-indigo-500" },
        { icon: <FiSearch />, title: "Discovery", desc: "Smart search to find your perfect community.", color: "text-pink-500" },
      ]
    }
  ];

  return (
    <section className="relative min-h-[70vh] flex flex-col overflow-hidden bg-background transition-colors duration-500">
      <div className="plaid-bg absolute inset-0 opacity-[0.07] pointer-events-none"></div>

      <div className="flex-grow container mx-auto grid grid-cols-1 lg:grid-cols-12 w-full relative z-10">
        
        {/* --- LEFT SIDE: Content --- */}
        <div className="lg:col-span-6 p-6 flex flex-col justify-between relative">
          <FiPlus className="absolute top-10 right-0 text-slate-300 dark:text-slate-700 hidden lg:block" />
          <FiPlus className="absolute bottom-10 right-0 text-slate-300 dark:text-slate-700 hidden lg:block" />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex gap-6 mb-8">
              {[{ name: "Admin", dot: "bg-primary" }, { name: "Manager", dot: "bg-secondary" }, { name: "Member", dot: "bg-slate-400" }].map((role) => (
                <div key={role.name} className="flex items-center gap-2 group cursor-default">
                  <div className="relative flex items-center justify-center">
                    <span className={`h-1.5 w-1.5 rounded-full ${role.dot} z-10`}></span>
                    <span className={`absolute h-3 w-3 rounded-full ${role.dot} opacity-20 group-hover:scale-150 transition-transform duration-500`}></span>
                  </div>
                  <span className="text-[10px] font-black text-text-heading tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                    {role.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold mb-6 tracking-[0.2em] uppercase">
              <FiZap className="animate-pulse" /> Future of Campus Life
            </div>

            <h1 style={{ fontFamily: "Outfit, sans-serif" }} className="text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-[1.1] text-text-heading mb-8 tracking-tighter">
              CLUB <span className="text-secondary ">SPHERE.</span>
            </h1>

            <p className="text-lg text-text-body max-w-lg font-medium mb-8 leading-relaxed">
              Managing leadership, events, and membership in one{" "}
              <span className="text-text-heading font-bold underline decoration-primary/30">
                decentralized portal.
              </span>
            </p>

            <div className="grid grid-cols-2 gap-y-3 mb-10">
              {["Real-time Data Sync", "Secure Stripe Payment", "Adaptive Workspaces", "Dynamic Event Tracking"].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-[11px] font-bold text-text-body">
                  <FiCheckCircle className="text-primary" /> {item}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-8">
              <Link to="/clubs" className="btn-primary-gradient px-10 py-4 !rounded-full text-md font-bold flex items-center gap-3">
                Join Now <FiArrowUpRight size={20} />
              </Link>
              <div className="hidden sm:flex flex-col border-l border-slate-200 dark:border-slate-800 pl-6">
                <span className="text-xl font-black text-text-heading leading-none">2.4k+</span>
                <span className="text-[9px] uppercase font-bold text-text-body tracking-widest mt-1">Active Members</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT SIDE: Fast Animated Grid --- */}
        <div className="lg:col-span-6 relative h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-10 h-10 text-slate-300 dark:text-slate-700 pointer-events-none">
            <FiPlus size={30} className="animate-pulse opacity-30" />
          </div>

          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="h-full w-full"
          >
            {featureSets.map((set) => (
              <SwiperSlide key={set.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  {set.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`p-6 lg:p-10 flex flex-col justify-center border-slate-200 dark:border-slate-800 
                        ${idx < 2 ? "border-b" : ""} 
                        ${idx % 2 === 0 ? "md:border-r" : ""}`}
                    >
                      <div className={`text-[28px] mb-5 ${item.color}`}>
                        {item.icon}
                      </div>

                      <h4 className="font-bold text-xl mb-3 text-text-heading">
                        {item.title}
                      </h4>

                      <p className="text-xs text-text-body leading-relaxed max-w-[180px]">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;