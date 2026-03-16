import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaLaptopCode, FaCamera, FaFootballBall, FaBookOpen, 
  FaPalette, FaHiking, FaMusic, FaUtensils 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CLUB_CATEGORIES = [
  { name: "Technology", icon: <FaLaptopCode />, img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400&h=400&fit=crop" },
  { name: "Photography", icon: <FaCamera />, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&h=400&fit=crop" },
  { name: "Sports", icon: <FaFootballBall />, img: "https://i.ibb.co.com/nsh7nC1s/image.png" },
  { name: "Book Club", icon: <FaBookOpen />, img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&h=400&fit=crop" },
  { name: "Art & Design", icon: <FaPalette />, img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400&h=400&fit=crop" },
  { name: "Hiking & Travel", icon: <FaHiking />, img: "https://i.ibb.co.com/G4qbTn1B/image.png" },
  { name: "Music & Film", icon: <FaMusic />, img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&h=400&fit=crop" },
  { name: "Food & Cooking", icon: <FaUtensils />, img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400&h=400&fit=crop" },
];

const PopularCategorySection = () => {
  return (
    <section className="py-28 bg-background relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decorative Element */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-5xl grid justify-center items-center text-center mx-auto mb-20">
          
          
          <h2 className="!text-center !mb-6 leading-[1.1] tracking-tight">
             Connect with <span className="text-primary">Passionate</span>  
             Communities.
          </h2>
          
          <p className="text-text-body text-lg md:text-xl opacity-80 leading-relaxed max-w-2xl">
            Dive into specialized circles where interests turn into expertise. From high-tech labs to creative studios, find your tribe and start building something extraordinary today.
          </p>
        </div>

        {/* The Grid - No Grayscale, Always Sharp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CLUB_CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-card  transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(2,132,199,0.15)] group-hover:-translate-y-2">
                
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Explore Category</p>
                            <h4 className="text-xl font-black text-white tracking-wide">
                                {cat.name}
                            </h4>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-lg group-hover:bg-primary group-hover:border-primary transition-all">
                            {cat.icon}
                        </div>
                    </div>
                </div>

                {/* Top Spotlight Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Unique Hover Badge (Visible only on Hover) */}
              <div className="absolute -top-3 -right-3 px-4 py-1.5 bg-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg translate-y-2 group-hover:translate-y-0 rotate-12 group-hover:rotate-0">
                Join Now
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Navigation Element */}
        <div className="mt-24 flex flex-col md:flex-row items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-10 gap-6">
            <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-slate-200">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                    </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-background bg-card flex items-center justify-center text-[10px] font-bold text-text-body">
                    +2k
                </div>
                <span className="pl-6 flex items-center text-xs font-bold text-text-body opacity-60 italic">Already joined by 2,000+ members</span>
            </div>

            <Link to="/clubs">
              <button className="btn-primary-gradient !rounded-full text-xs tracking-widest uppercase px-10">
                  Browse All Categories
              </button>
            </Link>
        </div>

      </div>
    </section>
  );
};

export default PopularCategorySection;