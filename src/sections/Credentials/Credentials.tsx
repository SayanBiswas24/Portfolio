import React, { useRef, useEffect } from "react";
import { credentials } from "@/data/credentials";
import { gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Trophy } from "lucide-react";

export const Credentials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".credentials-header-block",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".credential-editorial-card",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".credentials-cards-grid",
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="py-24 sm:py-28 px-4 sm:px-6 max-w-[1520px] mx-auto w-full border-t border-[#D8D5CE] dark:border-[#2A322A]"
    >
      <div className="credentials-header-block mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D8D5CE] dark:border-[#2A322A]">
        <div>
          <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-[#005A36] dark:text-[#00A865] font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#005A36] dark:bg-[#00A865]" />
            <span>05 // ACHIEVEMENTS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#111111] dark:text-[#F5F3EE]">
            Achievements & Recognition
          </h2>
        </div>
      </div>

      {/* Grid of 2 Hackathon Achievement Cards */}
      <div className="credentials-cards-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {credentials.map((item) => (
          <div
            key={item.id}
            className="credential-editorial-card border border-[#D8D5CE] dark:border-[#2A322A] bg-[#FFFFFF] dark:bg-[#1D211D] p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:border-[#005A36] dark:hover:border-[#00A865] hover:bg-[#FAF9F5] dark:hover:bg-[#232823] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_24px_rgba(0,168,101,0.08)]"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CE]/50 dark:border-[#2A322A]/50 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[12px] sm:text-[13px] uppercase tracking-wider bg-[#005A36]/10 dark:bg-[#00A865]/15 text-[#005A36] dark:text-[#00A865] border border-[#005A36]/30 dark:border-[#00A865]/30 font-semibold">
                  <Trophy size={13} className="text-[#005A36] dark:text-[#00A865]" />
                  <span>{item.badge || "HACKATHON FINALIST"}</span>
                </span>
                <span className="font-mono text-sm text-[#5F5F5A] dark:text-[#9E9E98] uppercase font-medium">
                  {item.year}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] dark:text-[#F5F3EE] font-normal leading-snug">
                {item.title}
              </h3>

              <div className="font-mono text-sm text-[#005A36] dark:text-[#00A865] uppercase tracking-wider mt-3 font-semibold">
                {item.organization}
              </div>

              {item.description && (
                <p className="font-sans text-sm text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed mt-4">
                  {item.description}
                </p>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-[#D8D5CE]/50 dark:border-[#2A322A]/60 flex items-center justify-between font-mono text-[12px] uppercase tracking-wider text-[#5F5F5A] dark:text-[#9E9E98]">
              <span className="text-[#005A36] dark:text-[#00A865] font-medium">
                STATUS: VERIFIED
              </span>
              <span>HONOR & ACHIEVEMENT</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

