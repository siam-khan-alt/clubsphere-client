import React from "react";
import { motion } from "framer-motion";
import { FiActivity, FiGlobe, FiCpu, FiTerminal, FiCommand, FiLayers, FiZap } from "react-icons/fi";

const EcosystemSection = () => {
  return (
    <section className="py-20 bg-background relative">
      
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

      <div className="container mx-auto px-4">
        
        <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] flex-grow bg-slate-200 dark:bg-slate-800"></div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-card shadow-sm">
                <FiZap className="text-secondary animate-pulse" size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-body">Live Engine Status</span>
            </div>
            <div className="h-[1px] flex-grow bg-slate-200 dark:bg-slate-800"></div>
        </div>

        <div className="max-w-full mx-auto bg-card border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl transition-colors duration-300">
          
          <div className="px-8 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-background/30">
             <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/20 border border-red-400/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20 border border-amber-400/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20 border border-emerald-400/40"></div>
             </div>
             <span className="text-[9px] font-mono text-text-body opacity-40 italic">system_orchestrator_v2.log</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Micro Stats (3 Cols) */}
            <div className="lg:col-span-3 p-8 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 space-y-8">
               <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: 'Network Latency', val: '12ms', color: 'text-primary' },
                    { label: 'Uptime Protocol', val: '99.9%', color: 'text-emerald-500' },
                    { label: 'Logic Sync', val: 'Active', color: 'text-secondary' }
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-background/50 rounded-2xl border border-slate-50 dark:border-slate-800/50 group">
                       <p className="text-[9px] font-black uppercase text-text-body opacity-40 mb-1">{item.label}</p>
                       <p className={`text-xl font-black ${item.color}`}>{item.val}</p>
                    </div>
                  ))}
               </div>
               <div className="p-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                  <h5 className="text-[11px] font-black uppercase text-text-heading mb-3">Core Modules</h5>
                  <div className="flex flex-wrap gap-2">
                     {['RBAC', 'SMTP', 'API', 'Webhooks'].map(tag => (
                       <span key={tag} className="px-2 py-1 text-[9px] font-bold border border-slate-200 dark:border-slate-800 rounded text-text-body">{tag}</span>
                     ))}
                  </div>
               </div>
            </div>

            {/* Middle Column: Central Process (6 Cols) */}
            <div className="lg:col-span-6 p-10 bg-background/10 relative overflow-hidden">
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6 text-primary">
                    <FiCpu size={20} />
                    <span className="text-xs font-black uppercase tracking-widest">Internal Logic Engine</span>
                  </div>
                  <h3 className="">
                    Optimizing club <br /> workflows in Real-time.
                  </h3>
                  
                  {/* Interactive Processing View */}
                  <div className="space-y-6 mt-10">
                    {[
                        { title: 'Member Syncing', progress: 85 },
                        { title: 'Event Analytics', progress: 62 }
                    ].map((bar, i) => (
                        <div key={i} className="space-y-2">
                           <div className="flex justify-between text-[10px] font-black uppercase opacity-60">
                             <span>{bar.title}</span>
                             <span>{bar.progress}%</span>
                           </div>
                           <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }} 
                                whileInView={{ width: `${bar.progress}%` }} 
                                transition={{ duration: 2 }}
                                className="h-full bg-primary"
                              />
                           </div>
                        </div>
                    ))}
                  </div>
               </div>
               
               {/* Background Visual - গ্রিড এবং টেকনিক্যাল লাইন */}
               <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
                  <FiTerminal size={200} className="rotate-12 translate-x-10 translate-y-10" />
               </div>
            </div>

            {/* Right Column: Mini Roadmap (3 Cols) */}
            <div className="lg:col-span-3 p-8 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 bg-card">
                <h4 className="text-[11px] font-black uppercase text-text-heading mb-8 tracking-widest">Protocol Stack</h4>
                <div className="space-y-8">
                  {[
                    { t: "Member Portal", s: "Operational", c: "text-primary" },
                    { t: "Automated Finance", s: "In Dev", c: "text-secondary" },
                    { t: "Smart Notifications", s: "Pending", c: "opacity-40" }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary ring-4 ring-primary/10"></div>
                      <div>
                        <h5 className="text-[10px] font-black text-text-heading uppercase">{step.t}</h5>
                        <p className={`text-[9px] font-bold mt-0.5 ${step.c}`}>{step.s}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12">
                   <button className="w-full py-3 bg-text-heading dark:bg-slate-800 text-white dark:text-slate-200 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg hover:opacity-90 transition-all">
                      Detailed Logs
                   </button>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;