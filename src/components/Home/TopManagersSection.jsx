import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { FiUsers, FiShield, FiActivity, FiArrowRight, FiX } from "react-icons/fi";

const EliteManagersSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const { data: managers = [], isLoading } = useQuery({
    queryKey: ["popularClubsManagers"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/clubs/popular-clubsManagers`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 plaid-bg opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-4 tracking-tight"
          >
            The Visionary <span className="text-primary">Commanders</span>
          </motion.h2>
          <p className="text-text-body text-sm md:text-base opacity-70 leading-relaxed max-w-2xl mx-auto">
            Meet the masterminds behind our most successful clubs.
          </p>
        </div>

        {/* Layout Container */}
        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[600px]">
          
          {/* DESKTOP ONLY: Active Manager View (Left Side) */}
          <div className="hidden lg:block lg:w-2/3 relative h-full rounded-2xl overflow-hidden border border-standard bg-card group">
            <AnimatePresence mode="wait">
              <motion.div
                key={managers[hoveredIndex]?._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute inset-0 flex flex-col md:flex-row"
              >
                <div className="md:w-1/2 h-full relative overflow-hidden">
                  <img src={managers[hoveredIndex]?.managerImage} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card" />
                </div>
                <div className="md:w-1/2 p-16 flex flex-col justify-center space-y-6">
                  <span className="text-[10px] font-black text-secondary uppercase tracking-[0.4em]">Level 0{hoveredIndex + 1} Manager</span>
                  <h3 className="text-5xl font-black text-text-heading m-0 leading-tight">{managers[hoveredIndex]?.managerName}</h3>
                  <p className="text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2"><FiActivity /> {managers[hoveredIndex]?.clubName}</p>
                  <p className="text-text-body/70 text-lg">"{managers[hoveredIndex]?.description}"</p>
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-primary">
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold opacity-40 uppercase">Retention</p>
                      <div className="flex items-center gap-2 text-2xl text-secondary font-bold text-text-heading"><FiUsers className="text-primary" /> {managers[hoveredIndex]?.membersCount}</div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold opacity-40 uppercase">Entry Fee</p>
                      <div className="text-2xl text-secondary font-bold text-text-heading uppercase">{managers[hoveredIndex]?.membershipFee === 0 ? "Free" : `$${managers[hoveredIndex]?.membershipFee}`}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* MOBILE & DESKTOP LIST: Right Side list that expands on Mobile */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
            {managers.map((item, idx) => {
              const isExpanded = hoveredIndex === idx;
              return (
                <motion.div
                  key={item._id}
                  onClick={() => setHoveredIndex(idx)}
                  animate={{ height: isExpanded ? "auto" : "90px" }} 
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className={`cursor-pointer overflow-hidden relative rounded-2xl border transition-all duration-300 ${
                    isExpanded 
                    ? "bg-card border-primary shadow-xl ring-1 ring-primary/20" 
                    : "bg-card/50 border-standard hover:border-primary"
                  }`}
                >
                  {/* The Header of Card (Always Visible) */}
                  <div className="p-4 flex items-center gap-4 h-[90px]">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-standard">
                       <img src={item.managerImage} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-grow">
                       <h5 className={`font-bold text-lg m-0 leading-none  ${isExpanded && "text-primary"}`}>{item.managerName}</h5>
                       <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-60">{item.clubName}</p>
                    </div>
                    <FiArrowRight className={`transition-transform duration-500 ${isExpanded ? "rotate-90 text-primary" : "opacity-30"}`} />
                  </div>

                  {/* Expanded Content (Visible only on Mobile when clicked) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden px-6 pb-8 space-y-6"
                      >
                        <div className="aspect-square w-full rounded-2xl overflow-hidden border border-standard/20">
                           <img src={item.managerImage} className="w-full h-full object-cover" alt="" />
                        </div>
                        
                        <p className="text-text-body/80  text-sm leading-relaxed border-l-2 border-primary pl-4">
                           "{item.description}"
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/50">
                           <div className="bg-background/50 p-3 rounded-xl border border-standard">
                              <p className="text-[8px] font-bold opacity-50 uppercase">Total Members</p>
                              <p className="text-lg font-black text-primary flex items-center gap-2"><FiUsers size={14}/> {item.membersCount}</p>
                           </div>
                           <div className="bg-background/50 p-3 rounded-xl border border-standard">
                              <p className="text-[8px] font-bold opacity-50 uppercase">Entry Fee</p>
                              <p className="text-lg font-black text-secondary ">{item.membershipFee === 0 ? "Free" : `$${item.membershipFee}`}</p>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-primary); border-radius: 10px; opacity: 0.2; }
        @media (min-width: 1024px) {
          /* Desktop layout height stays fixed */
          .lg\\:h-\\[600px\\] { height: 600px; }
        }
      `}</style>
    </section>
  );
};

export default EliteManagersSection;