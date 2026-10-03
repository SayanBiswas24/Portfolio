import React from "react";
import { ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-[#D8D5CE] dark:border-[#212621] py-8 px-4 sm:px-6 bg-[#FFFFFF] dark:bg-[#0E120E] transition-colors duration-300">
      <div className="max-w-[1520px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider">
        <div>
          © {new Date().getFullYear()} SAYAN BISWAS
        </div>

        {/* Right: Back to top */}
        <div>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[#5F5F5A] dark:text-[#9E9E98] hover:text-[#005A36] dark:hover:text-[#00A865] hover:bg-[#005A36]/8 dark:hover:bg-[#00A865]/12 transition-all duration-200 cursor-pointer font-semibold"
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
