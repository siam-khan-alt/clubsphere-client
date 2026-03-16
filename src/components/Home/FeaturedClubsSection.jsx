import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, FreeMode } from "swiper/modules";
import { motion } from "framer-motion";
import axios from "axios";
import ClubCard from "../public/ClubCard"; 
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { FiInbox } from "react-icons/fi";

// Swiper Styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const FeaturedClubsSection = () => {
  const { data: clubs = [], isLoading, isError } = useQuery({
    queryKey: ["featuredClubs"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/featuredClubs`);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="container mx-auto px-6 py-12 md:py-16 lg:py-20  text-center">
        <p className="text-error font-bold bg-error/10 p-4 rounded-xl inline-block border border-error/20">
          Failed to load featured clubs. Please try again.
        </p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-background relative overflow-hidden">
     
      <div className="container mx-auto px-4 relative z-10">
        {/* Consistent Header */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-text-heading"
          >
            How <span className="text-primary ">ClubSphere</span> Accelerates Growth
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-text-body text-sm md:text-base opacity-70 leading-relaxed max-w-2xl mx-auto"
          >
            A seamless transition from newcomer to community leader. 
            Our structured approach ensures you never miss an opportunity to connect.
          </motion.p>
        </div>

        {clubs.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination, FreeMode]}
            spaceBetween={30}
            slidesPerView={1}
            freeMode={true}
           
            loop={clubs.length > 4} 
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="featured-zigzag-swiper !pb-20 !pt-10"
          >
            {clubs.map((club, index) => (
              <SwiperSlide key={club._id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative transition-all duration-500 ${
                    index % 2 === 0 ? "lg:-translate-y-8" : "lg:translate-y-8"
                  }`}
                >
                  <ClubCard club={club} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-base-content/10 rounded-[40px] flex flex-col items-center">
            <FiInbox size={48} className="text-primary mb-4 opacity-30" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-base-content/40">
              No featured clubs available
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .featured-zigzag-swiper .swiper-pagination-bullet {
          background: #YOUR_PRIMARY_COLOR_CODE; 
          opacity: 0.2;
        }
        .featured-zigzag-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 25px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default FeaturedClubsSection;