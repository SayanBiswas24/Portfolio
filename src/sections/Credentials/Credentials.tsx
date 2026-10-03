import React, { useRef, useEffect } from "react";
import { credentials } from "@/data/credentials";
import { gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
          stagger: 0.1,
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
      id="credentials"
      className="py-24 sm:py-28 px-4 sm:px-6 max-w-[1520px] mx-auto w-full border-t border-[#D8D5CE] dark:border-[#212621]"
    >
      {/* Header */}
      <div className="credentials-header-block mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D8D5CE] dark:border-[#212621]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#005A36] dark:text-[#00A865] font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#005A36] dark:bg-[#00A865]" />
            <span>05 // CREDENTIALS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#111111] dark:text-[#F5F3EE]">
            Certificates & Recognition
          </h2>
        </div>
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] max-w-sm text-left md:text-right">
          OFFICIAL AND INDUSTRY-VERIFIED CREDENTIAL ARCHIVE
        </p>
      </div>

      {/* Grid of 3 Cards */}
      <div className="credentials-cards-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        {credentials.map((item, idx) => {
          const badgeLabel =
            idx === 0
              ? "VERIFICATION"
              : idx === 1
              ? "HACKATHON"
              : "SPECIALIZED";

          return (
            <div
              key={item.id}
              className="credential-editorial-card border border-[#D8D5CE] dark:border-[#212621] bg-[#FFFFFF] dark:bg-[#111411] p-6 sm:p-7 flex flex-col justify-between transition-colors hover:border-[#005A36] dark:hover:border-[#00A865]"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CE]/50 dark:border-[#212621]/50 mb-5">
                  <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider bg-[#005A36]/10 dark:bg-[#00A865]/15 text-[#005A36] dark:text-[#00A865] border border-[#005A36]/30 dark:border-[#00A865]/30 font-semibold">
                    {badgeLabel}
                  </span>
                  <span className="font-mono text-xs text-[#5F5F5A] dark:text-[#9E9E98]">
                    {item.year}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#111111] dark:text-[#F5F3EE] font-normal leading-snug">
                  {item.title}
                </h3>

                <p className="font-mono text-xs uppercase tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] mt-2.5">
                  {item.organization}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#D8D5CE]/50 dark:border-[#212621]/60 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#5F5F5A] dark:text-[#9E9E98]">
                <span className="text-[#005A36] dark:text-[#00A865]">
                  STATUS: VERIFIED
                </span>
                <span>RECORD PENDING</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
