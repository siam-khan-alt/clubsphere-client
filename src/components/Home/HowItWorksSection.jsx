import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiUsers, FiCalendar, FiShare2 } from 'react-icons/fi';

const WORK_STEPS = [
    {
       id: 1,
        title: "Explore & Discover",
        description: "Find your perfect club by category or location easily.",
        icon: FiSearch,
        color: "text-primary",
    },
    {
        id: 2,
        title: "Join & Connect",
        description: "Join communities and start engaging with fellow members.",
        icon: FiUsers,
        color: "text-secondary",
    },
    {
        id: 3,
        title: "Participate & Grow",
        description: "Attend exciting events and manage your club activities.",
        icon: FiCalendar,
        color: "text-accent"
    },
    {
        id: 4,
        title: "Share & Invite",
        description: "Invite friends and build a stronger campus community.",
        icon: FiShare2,
        color: "text-primary",
    },
];

const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HowItWorksSection = () => {
    return (
        <section className="py-5 bg-base-100 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          How ClubSphere Works
        </motion.h2>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {WORK_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  variants={stepVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="card-style flex flex-col items-center text-center group border-t-4 border-primary"
                >
                  <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-opacity-10 dark:bg-opacity-20  transition-all duration-300 group-hover:scale-110 ">
                    <Icon className={`w-10 h-10 ${step.color}`} />
                  </div>

                  <span className={`text-xs font-black tracking-widest uppercase mb-2 ${step.color}`}>
                    STEP {step.id}
                  </span>

                  <h4 className="mb-4">
                    {step.title}
                  </h4>

                  <p className="opacity-70 dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-6">
          <a
            href="/clubs"
            className="btn-primary-gradient px-10 py-4 inline-block shadow-xl"
          >
            Start Exploring Clubs
          </a>
        </div>
      </div>
    </section>
    );
};

export default HowItWorksSection;