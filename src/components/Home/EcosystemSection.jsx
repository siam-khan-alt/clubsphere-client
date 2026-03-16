import React from "react";
import { motion } from "framer-motion";
import { FiCpu, FiTerminal, FiZap, FiActivity, FiServer } from "react-icons/fi";

const EcosystemSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20  bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
        
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="!mb-4"
          >
            Powered by Modern Architecture
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-body max-w-2xl mx-auto opacity-80"
          >
            Our high-performance engine ensures seamless real-time
            synchronization, advanced data security, and a lightning-fast
            experience for every community member.
          </motion.p>
        </div>

        {/* Main Dashboard Container */}
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Live Metrics */}
            <div className="lg:col-span-4 space-y-6">
              {[
                {
                  label: "Network Latency",
                  val: "12ms",
                  icon: <FiActivity />,
                  color: "var(--color-primary)",
                },
                {
                  label: "Uptime Status",
                  val: "99.9%",
                  icon: <FiServer />,
                  color: "#10b981",
                },
                {
                  label: "Logic Sync",
                  val: "Active",
                  icon: <FiCpu />,
                  color: "var(--color-secondary)",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  className="card-style flex items-center gap-5 !p-6 border-standard group"
                >
                  <div
                    className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-2xl border border-slate-100 dark:border-slate-800 transition-colors group-hover:border-primary/50"
                    style={{ color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-text-body opacity-50 tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-2xl font-black text-text-heading">
                      {item.val}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Middle Column: Visual Logic Engine */}
            <div className="lg:col-span-8">
              <div className="card-style h-full border-standard relative overflow-hidden bg-gradient-to-br from-card to-background">
                {/* Decorative Terminal Icon */}
                <FiTerminal className="absolute -bottom-10 -right-10 text-[200px] opacity-[0.03] -rotate-12 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                      </div>
                      <span className="text-[10px] font-mono opacity-40 uppercase tracking-tighter">
                        core_orchestrator.sys
                      </span>
                    </div>
                    <div className="px-3 py-1 rounded-md bg-primary/10 text-primary text-[9px] font-black uppercase">
                      Live Processing
                    </div>
                  </div>

                  <h3 className="!text-left !mb-8 text-3xl">
                    Optimizing club workflows in{" "}
                    <span className="text-secondary italic">Real-time</span>.
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    {[
                      {
                        title: "Member Data Syncing",
                        progress: 85,
                        color: "var(--color-primary)",
                      },
                      {
                        title: "Event Analytics Engine",
                        progress: 62,
                        color: "var(--color-secondary)",
                      },
                      {
                        title: "Financial Protocols",
                        progress: 45,
                        color: "#10b981",
                      },
                      {
                        title: "Global CDN Delivery",
                        progress: 92,
                        color: "#f59e0b",
                      },
                    ].map((bar, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-wide">
                          <span className="text-text-heading">{bar.title}</span>
                          <span style={{ color: bar.color }}>
                            {bar.progress}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-[2px]">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${bar.progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: bar.color,
                              boxShadow: `0 0 10px ${bar.color}40`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
