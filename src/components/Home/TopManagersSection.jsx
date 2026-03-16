import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import axios from "axios";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { FiUsers, FiCalendar, FiMapPin, FiShield } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const EliteManagersSection = () => {
  const { data: managers = [], isLoading } = useQuery({
    queryKey: ["popularClubsManagers"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/popular-clubsManagers`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="py-12 md:py-16 lg:py-20  bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section*/}
        <div className="text-center max-w-5xl mx-auto mb-16">
    <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className=" mb-4 tracking-tight "
    >
        The Visionary <span className="text-primary ">Commanders</span>
    </motion.h2>
    
    <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="text-text-body text-sm md:text-base opacity-70 leading-relaxed max-w-2xl mx-auto"
    >
        Meet the masterminds behind our most successful clubs. These elite leaders 
        bring the strategy, passion, and community spirit that keep the pulse of 
        excellence beating.
    </motion.p>
</div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="perspective-swiper !overflow-visible"
        >
          {managers.map((item) => (
            <SwiperSlide key={item._id}>
              {({ isActive, isPrev, isNext }) => (
                <div
                  className={`relative transition-all duration-700 ease-out py-10 ${
                    isActive 
                      ? "scale-110 z-30 opacity-100" 
                      : isPrev 
                        ? "rotate-y-[-25deg] scale-90 translate-x-8 z-10 opacity-40 blur-[1px]" 
                        : isNext 
                          ? "rotate-y-[25deg] scale-90 -translate-x-8 z-10 opacity-40 blur-[1px]" 
                          : "opacity-0 scale-75"
                  }`}
                  style={{ perspective: "1200px" }}
                >
                  <div className="card-style p-0 overflow-hidden border-standard bg-card/80 backdrop-blur-xl shadow-2xl flex flex-col h-[480px]">
                    
                    {/* Header: Banner with Manager Spotlight */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <img src={item.bannerImage} className="w-full h-full object-cover opacity-60" alt={item.clubName} />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                      
                      {/* Manager Profile Image & Name */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full border-[4px] border-primary/50 p-1 overflow-hidden bg-card shadow-2xl">
                             <img src={item.managerImage} alt={item.managerName} className="w-full h-full object-cover rounded-full" />
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-full shadow-lg border-2 border-card">
                             <FiShield size={12} />
                          </div>
                        </div>
                        <div className="mt-3 text-center px-4">
                           <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none mb-1">Club Manager</p>
                           <h4 className="text-xl font-black text-text-heading line-clamp-1">{item.managerName}</h4>
                        </div>
                      </div>
                    </div>

                    {/* Content: Club Info */}
                    <div className="p-6 flex flex-col flex-grow text-center">
                      <div className="mb-4">
                        <span className="text-[9px] font-bold text-secondary uppercase bg-secondary/10 px-3 py-1 rounded-full">
                          {item.clubName}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="flex items-center gap-1 text-text-body/70 text-[10px] font-bold">
                          <FiMapPin className="text-primary" /> {item.location}
                        </div>
                        <div className="flex items-center gap-1 text-text-body/70 text-[10px] font-bold">
                          <FiCalendar className="text-secondary" /> {item.meetingSchedule}
                        </div>
                      </div>

                      <p className="text-text-body text-xs opacity-70 line-clamp-3 italic mb-6 leading-relaxed px-2">
                        "{item.description}"
                      </p>

                      {/* Bottom Stats: Now at the very bottom of the card */}
                      <div className="mt-auto grid grid-cols-2 gap-4  pt-6">
                        <div className="flex flex-col items-center ">
                          <span className="text-[8px] uppercase font-bold opacity-40 mb-1">Total Members</span>
                          <span className="text-sm font-black text-primary flex items-center gap-1">
                            <FiUsers /> {item.membersCount}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[8px] uppercase font-bold opacity-40 mb-1">Entry Fee</span>
                          <span className="text-sm font-black text-secondary">${item.membershipFee}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .rotate-y-[-25deg] { transform: rotateY(-25deg); }
        .rotate-y-[25deg] { transform: rotateY(25deg); }
        .perspective-swiper { perspective: 1500px; }
        .perspective-swiper .swiper-pagination-bullet-active {
          width: 30px;
          border-radius: 4px;
          background: var(--color-primary) !important;
        }
      `}</style>
    </section>
  );
};

export default EliteManagersSection;