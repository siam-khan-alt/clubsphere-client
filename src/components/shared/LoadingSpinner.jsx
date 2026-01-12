import { FiHexagon } from "react-icons/fi";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-base-100 dark:bg-[#050505] transition-colors duration-500">
      <div className="relative flex flex-col items-center">
        
        <div className="absolute w-48 h-48 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>

        <div className="relative w-32 h-32 flex items-center justify-center">
          
          <div className="absolute animate-[spin_4s_linear_infinite] text-primary/20">
            <FiHexagon size={120} strokeWidth={1} />
          </div>

          <div className="absolute animate-[spin_2.5s_linear_infinite_reverse] text-primary/40">
            <FiHexagon size={80} strokeWidth={1.5} />
          </div>

          <div className="relative animate-bounce text-primary drop-shadow-[0_0_15px_rgba(var(--p),0.5)]">
            <FiHexagon size={40} strokeWidth={3} />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center space-y-2">
          <div className="relative">
            <h2 className="text-4xl font-black tracking-tighter text-base-content dark:text-white uppercase italic">
              Club<span className="text-primary not-italic">Sphere</span>
            </h2>
            <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary/20 overflow-hidden">
                <div className="w-1/3 h-full bg-primary animate-[scan_1.5s_ease-in-out_infinite]"></div>
            </div>
          </div>
          
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-base-content/40">
            Synchronizing Networks
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-110%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;