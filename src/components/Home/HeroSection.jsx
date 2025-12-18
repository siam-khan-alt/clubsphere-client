import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import heroImage from "../../assets/heroimage.avif";

const HERO_IMAGE_URL = heroImage;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const HeroSection = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative text-center py-12 md:py-16 bg-cover bg-center shadow-xl"
      style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
    >
      <div className="absolute inset-0 bg-indigo-800 opacity-60"></div>

      <div className="relative z-10 container mx-auto px-4 text-white">
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Discover Your Perfect Club. <br /> Start Connecting Today.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-xl md:text-2xl font-light max-w-3xl mx-auto"
        >
          Find communities based on your passions, manage events, and build your
          network effortlessly.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center"
        >
          <Link to="/clubs" className="w-full sm:w-auto">
            <motion.button
              whileHover={{
                scale: 1.05,
                shadow: "0px 10px 20px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-4 bg-white text-indigo-700 font-bold rounded-full transition-all duration-300 shadow-[0_4px_15px_rgba(255,255,255,0.3)] hover:text-indigo-800"
            >
              Join a Club
            </motion.button>
          </Link>
          <Link to="dashboard/manager/my-clubs" className="w-full sm:w-auto">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-4 border-2 border-white/70 text-white font-bold rounded-full backdrop-blur-sm transition-all duration-300"
            >
              Create a Club
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
