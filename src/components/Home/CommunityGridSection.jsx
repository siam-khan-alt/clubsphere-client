import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiZap, FiTarget, FiAward, FiCompass, FiShield } from "react-icons/fi";

const CommunityGridSection = () => {
  const topContent = [
    { 
      title: "Global Leadership Network", 
      desc: "Connect with elite industry professionals and club alumni spanning across 50+ countries. Gain insights from mentors who have scaled massive organizations.",
      icon: <FiUsers size={18} />
    },
    { 
      title: "Priority Ecosystem Access", 
      desc: "Get early-bird invitations to high-stakes networking events, private workshops, and professional certification programs before they go public.",
      icon: <FiAward size={18} />
    },
    { 
      title: "Advanced Skill Labs", 
      desc: "Participate in hands-on community projects that mirror real-world corporate challenges, building a portfolio that stands out to top-tier recruiters.",
      icon: <FiTarget size={18} />
    }
  ];

  const bottomContent = [
    { 
      title: "Intelligent Resource Hub", 
      desc: "Access a curated library of proprietary tools, case studies, and documentation specifically developed for our community’s accelerated growth.",
      icon: <FiZap size={18} />
    },
    { 
      title: "Verified Professional Identity", 
      desc: "Build a credible, verified profile within our ecosystem. Showcase your contributions and earn blockchain-backed badges recognized by our partners.",
      icon: <FiShield size={18} />
    },
    { 
      title: "Strategic Career Mapping", 
      desc: "Use our community's roadmap tools to align your club activities with your long-term career goals, ensuring every interaction adds tangible value.",
      icon: <FiCompass size={18} />
    }
  ];

  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-6">
        
        <div className="mb-16 grid text-center items-center justify-center md:mb-24 mx-auto max-w-3xl">
          <h2 className=" !mb-4 leading-tight">
            Elevate your <span className="text-primary ">Potential</span> <br /> 
            through our interconnected ecosystem.
          </h2>
          <p className="text-text-body text-base md:text-lg opacity-70 leading-relaxed">
            We don't just offer memberships; we provide a high-performance environment where 
            ambitious individuals transform into community leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          <div className="lg:col-span-7 space-y-12">
            {topContent.map((item, i) => (
              <motion.div 
                whileHover={{ x: 10 }}
                key={i} 
                className="flex gap-6 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-black text-text-heading mb-2 tracking-tight uppercase">{item.title}</h4>
                  <p className="text-sm text-text-body leading-relaxed opacity-80">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-5 relative h-[350px] lg:h-auto rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
             <img 
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
               alt="Collaboration"
               className="w-full h-full object-cover"
             />
          </div>

          {/* Bottom Row: Image (5 columns) & Points (7 columns) */}
          <div className="lg:col-span-5 relative h-[350px] lg:h-auto rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl order-last lg:order-none">
             <img 
               src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800" 
               alt="Growth"
               className="w-full h-full object-cover"
             />
          </div>

          <div className="lg:col-span-7 space-y-12">
            {bottomContent.map((item, i) => (
              <motion.div 
                whileHover={{ x: 10 }}
                key={i} 
                className="flex gap-6 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-black text-text-heading mb-2 tracking-tight uppercase">{item.title}</h4>
                  <p className="text-sm text-text-body leading-relaxed opacity-80">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CommunityGridSection;