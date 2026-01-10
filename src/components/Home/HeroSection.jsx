import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const sliderData = [
  {
    id: 1,
    title: "Discover Your <span class='text-primary italic'>Perfect Club</span>",
    description: "Connect with communities that share your passion. From coding to photography, find your tribe today.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1470&auto=format&fit=crop",
    cta: "Explore Clubs",
    link: "/clubs"
  },
  {
    id: 2,
    title: "Lead & <span class='text-secondary italic'>Manage Events</span>",
    description: "Organize campus events seamlessly. Empower your club members and track growth with our dashboard.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop",
    cta: "Start Hosting",
    link: "/dashboard/manager/my-clubs"
  }
];

const HeroSection = () => {
  return (
    <section className="h-[60vh] min-h-[450px] md:min-h-[420px] relative overflow-hidden bg-base-100">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    transition={{ duration: 5 }}
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/10 dark:bg-black/70"></div>
                  </motion.div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
                  <div className="max-w-3xl text-white">
                    <AnimatePresence>
                      {isActive && (
                        <>
                          <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 drop-shadow-2xl"
                            dangerouslySetInnerHTML={{ __html: slide.title }}
                          />
                          
                          <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto drop-shadow-lg"
                          >
                            {slide.description}
                          </motion.p>

                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                          >
                            <Link to={slide.link} className="btn-primary-gradient px-10 py-4 flex items-center justify-center gap-2 group min-w-[200px]">
                              {slide.cta} <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/about" className="px-10 py-4 border-2 border-white/50 text-white font-bold rounded-full backdrop-blur-md hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-lg min-w-[200px]">
                              Learn More
                            </Link>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-pagination-bullet { background: rgba(255,255,255,0.7) !important; }
        .swiper-pagination-bullet-active { 
          background: #7C3AED !important; 
          width: 30px !important; 
          border-radius: 5px !important; 
          transition: all 0.3s ease;
        }
      `}} />
    </section>
  );
};

export default HeroSection;