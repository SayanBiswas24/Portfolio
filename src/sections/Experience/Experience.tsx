import React, { useRef, useEffect } from "react";
import { experiences, education } from "@/data/experience";
import { gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Briefcase, GraduationCap } from "lucide-react";

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".experience-header-block",
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
        ".trajectory-card",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".trajectory-list",
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
      id="experience"
      className="py-28 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-[#D8D5CE] dark:border-[#212621]"
    >
      {/* Header */}
      <div className="experience-header-block mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D8D5CE] dark:border-[#212621]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#005A36] dark:text-[#00A865] font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#005A36] dark:bg-[#00A865]" />
            <span>04 // TIMELINE & BACKGROUND</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#111111] dark:text-[#F5F3EE]">
            Trajectory & Background
          </h2>
        </div>
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] max-w-sm text-left md:text-right">
          CHRONOLOGICAL RECORD OF PROFESSIONAL PRACTICE & FOUNDATIONS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
        {/* Left 7 Columns: Professional Trajectory */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#D8D5CE]/60 dark:border-[#212621]/60 font-mono text-xs text-[#111111] dark:text-[#F5F3EE] uppercase tracking-widest font-semibold">
            <Briefcase size={14} className="text-[#005A36] dark:text-[#00A865]" />
            <span>PROFESSIONAL TRAJECTORY</span>
          </div>

          <div className="trajectory-list space-y-4">
            {experiences.map((item, idx) => (
              <div
                key={item.id}
                className="trajectory-card border border-[#D8D5CE] dark:border-[#212621] bg-[#FFFFFF] dark:bg-[#111411] p-6 sm:p-7 transition-colors hover:border-[#005A36] dark:hover:border-[#00A865]"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CE]/50 dark:border-[#212621]/50">
                  <span className="font-serif text-xl sm:text-2xl text-[#111111] dark:text-[#F5F3EE] font-normal">
                    {item.role}
                  </span>
                  <span className="px-3 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider bg-[#005A36]/10 dark:bg-[#00A865]/15 text-[#005A36] dark:text-[#00A865] border border-[#005A36]/30 dark:border-[#00A865]/30 font-semibold">
                    {idx === 0 ? `${item.year} // PRESENT` : item.year}
                  </span>
                </div>

                <div className="font-mono text-xs text-[#005A36] dark:text-[#00A865] uppercase tracking-wider mt-3 font-medium">
                  {item.organization}
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed mt-3">
                  {item.description}
                </p>

                {item.technologies && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[#D8D5CE]/40 dark:border-[#212621]/50">
                    {item.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 font-mono text-[10px] border border-[#D8D5CE] dark:border-[#212621] bg-[#FAF9F6] dark:bg-[#161A16] text-[#111111] dark:text-[#F5F3EE]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Columns: Academic Foundation */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#D8D5CE]/60 dark:border-[#212621]/60 font-mono text-xs text-[#111111] dark:text-[#F5F3EE] uppercase tracking-widest font-semibold">
            <GraduationCap size={15} className="text-[#005A36] dark:text-[#00A865]" />
            <span>ACADEMIC FOUNDATION</span>
          </div>

          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="border border-[#D8D5CE] dark:border-[#212621] bg-[#FFFFFF] dark:bg-[#111411] p-6 sm:p-7 transition-colors hover:border-[#005A36] dark:hover:border-[#00A865]"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CE]/50 dark:border-[#212621]/50">
                  <span className="font-serif text-xl text-[#111111] dark:text-[#F5F3EE] font-normal">
                    {edu.degree}
                  </span>
                  <span className="px-2.5 py-0.5 font-mono text-[10px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase">
                    2026
                  </span>
                </div>

                <div className="font-mono text-xs text-[#005A36] dark:text-[#00A865] uppercase tracking-wider mt-3 font-medium">
                  {edu.institution}
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed mt-3">
                  {edu.detail}
                </p>
              </div>
            ))}

            {/* Note box */}
            <div className="p-4 border border-dashed border-[#D8D5CE] dark:border-[#212621] bg-[#FAF9F6] dark:bg-[#121612] font-mono text-[10px] text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed">
              <span className="text-[#005A36] dark:text-[#00A865] font-semibold">
                NOTE:{" "}
              </span>
              Trajectory and background data are structured placeholders ready for verified records.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
