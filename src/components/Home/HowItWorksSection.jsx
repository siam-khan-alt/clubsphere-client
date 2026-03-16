import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiUsers, FiCalendar, FiShare2, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const WORK_STEPS = [
    {
        id: 1,
        title: "Discover Your Niche",
        description: "Your journey starts with finding a community that resonates with your passion. Our intelligent search helps you navigate through diverse campus interests.",
        features: ["Smart category filtering", "Location-based discovery", "Trending club suggestions"],
        icon: FiSearch,
        side: "left"
    },
    {
        id: 2,
        title: "Instant Integration",
        description: "Joining a club is just the beginning. Get instant access to private discussion boards, member directories, and exclusive community resources.",
        features: ["One-click membership", "Real-time chat access", "Digital member ID card"],
        icon: FiUsers,
        side: "right"
    },
    {
        id: 3,
        title: "Active Participation",
        description: "Stay ahead of the curve by engaging in workshops, seminars, and social gatherings. Track your involvement through your personal dashboard.",
        features: ["RSVP to upcoming events", "Activity point system", "Skill-building workshops"],
        icon: FiCalendar,
        side: "left"
    },
    {
        id: 4,
        title: "Lead & Expand",
        description: "Transform from a member to a contributor. Share your expertise, invite peers, and help your community scale to new heights on campus.",
        features: ["Collaborative project tools", "Referral rewards", "Leadership opportunities"],
        icon: FiShare2,
        side: "right"
    },
];

const HowItWorksSection = () => {
    return (
        <section className="py-20 bg-background relative overflow-hidden">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative">
                
                {/* Section Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="mb-4 tracking-tight">How <span className="text-primary ">ClubSphere</span> Accelerates Growth</h2>
                    <p className="text-text-body text-sm md:text-base opacity-70 leading-relaxed max-w-2xl mx-auto">
                        A seamless transition from newcomer to community leader. 
                        Our structured approach ensures you never miss an opportunity to connect.
                    </p>
                </div>

                {/* The Compact Tree Structure */}
                <div className="relative max-w-full mx-auto">
                    
                    {/* The Central Trunk Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-800 to-transparent -translate-x-1/2 hidden lg:block" />

                    <div className="space-y-8 lg:space-y-[-60px]"> {/* Stronger negative margin for extreme compactness */}
                        {WORK_STEPS.map((step) => {
                            const Icon = step.icon;
                            const isLeft = step.side === "left";

                            return (
                                <div key={step.id} className="relative lg:min-h-[220px] flex items-center justify-center">
                                    
                                    {/* Central Indicator Node */}
                                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-standard z-20 hidden lg:flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                                    </div>

                                    {/* Detailed Content Card */}
                                    <motion.div 
                                        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className={`w-full lg:w-[44%] ${isLeft ? 'lg:mr-auto text-left lg:text-right' : 'lg:ml-auto text-left'}`}
                                    >
                                        <div className="relative p-6 md:p-8 rounded-2xl border-standard bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 group shadow-sm hover:shadow-xl">
                                            
                                            {/* Phase Label & Icon */}
                                            <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                                                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <span className="text-[9px] font-black tracking-[0.2em] text-primary uppercase bg-primary/10 px-2 py-1 rounded">
                                                    Phase 0{step.id}
                                                </span>
                                            </div>

                                            <h3 className="text-lg md:text-xl font-black mb-2 text-text-heading group-hover:text-primary transition-colors">
                                                {step.title}
                                            </h3>

                                            <p className="text-text-body text-xs md:text-sm opacity-70 leading-snug mb-4">
                                                {step.description}
                                            </p>

                                            {/* Feature List */}
                                            <ul className={`flex flex-wrap gap-y-1 gap-x-3 ${isLeft ? 'lg:justify-end' : ''}`}>
                                                {step.features.map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-1.5 text-[10px] font-bold text-text-heading opacity-60">
                                                        <FiCheckCircle className="text-primary w-3 h-3" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Branch Line */}
                                            <div className={`absolute top-1/2 -translate-y-1/2 w-10 h-px bg-slate-200 dark:bg-slate-800 hidden lg:block ${isLeft ? '-right-10' : '-left-10'}`} />
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Final CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mt-20 relative z-30"
                >
                    <Link 
                        to="/clubs"
                        className="btn-primary-gradient px-10 py-4 !rounded-full inline-flex items-center gap-3 group shadow-lg"
                    >
                        <span className="font-black tracking-widest text-[10px] uppercase">Get Started Now</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default HowItWorksSection;