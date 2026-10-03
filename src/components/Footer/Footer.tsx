import React from "react";
import { ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-[#D8D5CE] dark:border-[#212621] py-8 px-6 md:px-12 bg-[#FFFFFF] dark:bg-[#0E120E] transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider">
        {/* Left */}
        <div>
          TOTAL VISITS // 2026 EDITION
        </div>

        {/* Center */}
        <div className="hidden md:block">
          COORDINATES: 22°34' N 88°21' E // LAT 22.57° LON 88.36°
        </div>

        {/* Right: Back to top */}
        <div>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 hover:text-[#005A36] dark:hover:text-[#00A865] transition-colors cursor-pointer font-semibold"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp
              size={12}
              className="transition-transform group-hover:-translate-y-1 text-[#005A36] dark:text-[#00A865]"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
