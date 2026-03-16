import React from "react";
import { motion } from "framer-motion";
import {
  FiTarget,
  FiShield,
  FiTrendingUp,
  FiGlobe,
  FiUsers,
  FiLayers,
  FiCreditCard,
  FiZap,
  FiDatabase,
  FiLayout,
  FiLock,
  FiCheckCircle,
  FiSearch,
} from "react-icons/fi";

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="plaid-bg absolute inset-0 opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full -z-10"></div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* --- Section 1: Hero Intro --- */}
        <motion.div {...fadeIn} className="max-w-4xl mx-auto text-center mb-24">
          <h2 className=" leading-[1.1]">Revolutionizing Campus Communities</h2>
          <p className="text-xl text-text-body font-medium leading-relaxed opacity-80">
            ClubSphere is a comprehensive MERN-stack ecosystem designed to
            bridge the gap between passion and community. We empower students
            with professional-grade tools to discover, join, and manage clubs.
          </p>
        </motion.div>

        {/* --- Section 2: Core Workflows (The 3 Pillars) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            {
              role: "Members",
              icon: FiUsers,
              desc: "Discover your interests and grow with the community.",
              features: [
                "Browse & Filter Clubs",
                "Join via Stripe (Free/Paid)",
                "Register for Paid Events",
                "Personalized Dashboard",
                "Payment & Event History",
              ],
              gradient: "hover:border-primary/50",
            },
            {
              role: "Club Managers",
              icon: FiTrendingUp,
              desc: "Take the lead and organize impactful campus activities.",
              features: [
                "Full Club Profile Management",
                "Event CRUD Operations",
                "Participant Tracking Lists",
                "Membership Fee Control",
                "Real-time Analytics View",
              ],
              gradient: "hover:border-secondary/50",
            },
            {
              role: "Admin",
              icon: FiShield,
              desc: "Maintain platform integrity and manage the ecosystem.",
              features: [
                "Review Club Requests",
                "Manage All User Roles",
                "Approve/Reject Content",
                "Monitor Total Revenue",
                "Platform-wide Statistics",
              ],
              gradient: "hover:border-accent/50",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className={`p-8 bg-card rounded-2xl  transition-all duration-300 ${item.gradient} group shadow-sm border-standard flex flex-col`}
            >
              {/* Header Icon */}
              <div className="w-14 h-14 bg-background  rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Title & Desc */}
              <h3 className="text-left !mb-2 !text-2xl uppercase tracking-tighter !bg-none !-webkit-text-fill-color-inherit text-text-heading">
                {item.role}
              </h3>
              <p className="text-sm font-medium text-text-body opacity-70 mb-6 leading-relaxed">
                {item.desc}
              </p>

              {/* Detailed Feature List */}
              <div className="mt-auto space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                {item.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <FiCheckCircle className="w-4 h-4 text-primary shrink-0 opacity-80" />
                    <span className="text-xs font-semibold text-text-body/90">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Section 3: Feature Grid --- */}
        <div className="mb-32">
          <div className="mb-12">
            <h2 className="text-left !mb-2">⚡ Advanced Capabilities</h2>
            <p className="text-text-body font-medium opacity-60">
              Engineered for performance and security.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FiLock,
                title: "RBAC System",
                desc: "Role-Based Access Control security.",
              },
              {
                icon: FiCreditCard,
                title: "Stripe Integration",
                desc: "Seamless and secure transactions.",
              },
              {
                icon: FiZap,
                title: "Real-time Sync",
                desc: "Powered by TanStack Query v5.",
              },
              {
                icon: FiLayout,
                title: "Dynamic UI",
                desc: "Responsive Framer Motion layouts.",
              },
              {
                icon: FiCheckCircle,
                title: "Verification",
                desc: "Firebase Admin SDK & JWT tokens.",
              },
              {
                icon: FiTrendingUp,
                title: "Data Viz",
                desc: "Insights via Recharts visualization.",
              },
              {
                icon: FiSearch,
                title: "Server Search",
                desc: "Advanced filtering and searching.",
              },
              {
                icon: FiDatabase,
                title: "MERN Stack",
                desc: "MongoDB, Express, React, & Node.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.05 }}
                className="p-6 bg-card  rounded-2xl border-standard transition-colors group"
              >
                <feature.icon className="w-6 h-6 text-primary mb-4" />
                <h4 className="font-bold text-text-heading mb-1">
                  {feature.title}
                </h4>
                <p className="text-xs text-text-body opacity-70">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Section 4: Technology Stack --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-card border-standard rounded-2xl p-8 lg:p-16 relative overflow-hidden">
          <motion.div {...fadeIn}>
            <h2 className="text-left !mb-8">Built with Modern Tech</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h5 className="text-primary font-black uppercase text-[10px] tracking-widest mb-4">
                  Frontend
                </h5>
                <ul className="space-y-3">
                  {[
                    "React 19 & Vite",
                    "Tailwind & DaisyUI",
                    "TanStack Query",
                    "Framer Motion",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 text-sm font-bold text-text-body"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>{" "}
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-secondary font-black uppercase text-[10px] tracking-widest mb-4">
                  Backend
                </h5>
                <ul className="space-y-3">
                  {[
                    "Node.js & Express",
                    "MongoDB Atlas",
                    "Firebase Admin",
                    "Stripe SDK",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 text-sm font-bold text-text-body"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>{" "}
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img
              src="https://i.ibb.co.com/Qjm7D6F5/club-spher-admin.png"
              alt="Dashboard Preview"
              className="relative rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800"
            />
            {/* Status Badge */}
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-2xl hidden xl:block">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <FiCheckCircle className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="text-text-heading font-black text-2xl">100%</p>
                  <p className="text-[10px] uppercase font-bold text-text-body opacity-60 tracking-[0.2em]">
                    Secure
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
