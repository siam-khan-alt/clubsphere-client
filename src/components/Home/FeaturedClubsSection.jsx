import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axios from "axios";
import ClubCard from "../public/ClubCard";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { FiInbox } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const FeaturedClubsSection = () => {
  const {
    data: clubs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featuredClubs"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/featuredClubs`
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isError) {
    return (
      <div className="container bg-base-100 mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
          Featured <span className="text-primary not-italic">Clubs</span>
        </h2>
        <p className="text-error font-bold bg-error/10 p-4 rounded-2xl inline-block border border-error/20 uppercase text-xs tracking-widest">
          Error loading clubs. Please check the network connection.
        </p>
      </div>
    );
  }

  return (
    <section className="py-5 bg-base-100 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          Featured Club 
        </motion.h2>

        <div className="relative min-h-[350px]">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-base-100/10 backdrop-blur-[2px] z-10">
              <LoadingSpinner />
            </div>
          ) : clubs.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              {clubs.map((club) => (
                <motion.div key={club._id} variants={itemVariants}>
                  <ClubCard club={club} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-base-content/10 rounded-[40px] flex flex-col items-center">
              <FiInbox size={48} className="text-primary mb-4 opacity-30" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-base-content/40">
                No featured clubs found at the moment
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: scaleX(0);
            transform-origin: left;
          }
          50% {
            transform: scaleX(1);
            transform-origin: left;
          }
          50.1% {
            transform: scaleX(1);
            transform-origin: right;
          }
          100% {
            transform: scaleX(0);
            transform-origin: right;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedClubsSection;
