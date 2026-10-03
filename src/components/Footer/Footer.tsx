import React from "react";
import { personalInfo } from "@/data/personal";
import { ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-[#D8D5CE] dark:border-[#272B26] py-14 px-6 md:px-12 bg-[#FAF9F6] dark:bg-[#121412] transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand & Role */}
        <div>
          <div className="font-mono text-sm tracking-widest font-semibold uppercase text-[#111111] dark:text-[#F5F3EE]">
            {personalInfo.name.toUpperCase()}
          </div>
          <div className="font-sans text-xs text-[#5F5F5A] dark:text-[#9E9E98] mt-1">
            {personalInfo.role}
          </div>
        </div>

        {/* Tech Credits */}
        <div className="font-mono text-xs text-[#5F5F5A] dark:text-[#9E9E98] tracking-wider text-left md:text-center">
          Built with React, Three.js & GSAP
        </div>

        {/* Back to Top & Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] transition-colors cursor-pointer"
            aria-label="Back to top of the page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp
              size={13}
              className="transition-transform group-hover:-translate-y-1 text-[#005A36] dark:text-[#00A865]"
            />
          </button>

          <span className="font-mono text-xs text-[#5F5F5A] dark:text-[#9E9E98] border-t sm:border-t-0 sm:border-l border-[#D8D5CE] dark:border-[#272B26] pt-3 sm:pt-0 sm:pl-6">
            © 2026 {personalInfo.name}
          </span>
        </div>
      </div>
    </footer>
  );
};
