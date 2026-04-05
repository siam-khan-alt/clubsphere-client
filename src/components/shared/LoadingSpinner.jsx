import React from "react";
import { FiHexagon } from "react-icons/fi";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background transition-colors duration-500 overflow-hidden">
      {/* Background Animated Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px] animate-[pulse_3s_ease-in-out_infinite]"></div>

      <div className="relative flex flex-col items-center">
        {/* Hexagon Core Animation */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          
          {/* Outer Ring - Electric Violet */}
          <div className="absolute animate-[spin_6s_linear_infinite] text-secondary/30">
            <FiHexagon size={140} strokeWidth={0.5} />
          </div>

          {/* Middle Ring - Sky Blue */}
          <div className="absolute animate-[spin_3s_linear_infinite_reverse] text-primary/50">
            <FiHexagon size={90} strokeWidth={1} />
          </div>

          {/* Inner Core - Primary to Secondary Gradient Style */}
          <div className="relative animate-[pulse_2s_ease-in-out_infinite] flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary blur-lg opacity-40 animate-ping"></div>
             <FiHexagon 
                size={50} 
                strokeWidth={2.5} 
                className="text-primary drop-shadow-[0_0_15px_rgba(2,132,199,0.6)]" 
             />
             <div className="absolute w-3 h-3 bg-secondary rounded-full shadow-[0_0_10px_#7c3aed]"></div>
          </div>
        </div>

        {/* Brand Text Section */}
        <div className="mt-12 text-center relative">
          <h2 className="text-5xl font-black tracking-tighter mb-0 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ">
            Club Sphere
          </h2>
          
          {/* Progress Bar Container */}
          <div className="mt-4 w-48 h-[3px] bg-slate-200 dark:bg-slate-800 rounded-full mx-auto overflow-hidden border border-standard/5">
            <div className="h-full bg-gradient-to-r from-primary to-secondary w-full animate-[loading_1.5s_infinite] origin-left"></div>
          </div>

          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.6em] text-text-body opacity-60">
            Initializing Core Systems
          </p>
        </div>
      </div>

      {/* Custom Keyframes */}
      <style jsx>{`
        @keyframes loading {
          0% { transform: scaleX(0); opacity: 0; transform-origin: left; }
          45% { transform: scaleX(1); opacity: 1; transform-origin: left; }
          50% { transform-origin: right; }
          100% { transform: scaleX(0); opacity: 0; transform-origin: right; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;