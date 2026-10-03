import React, { useRef, useEffect } from "react";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
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
        ".experience-header",
        { y: 30, opacity: 0 },
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
        ".timeline-block",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".experience-timeline",
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
      className="py-28 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-[#D8D5CE] dark:border-[#272B26]"
    >
      {/* Header */}
      <div className="experience-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#D8D5CE] dark:border-[#272B26]">
        <div>
          <SectionLabel label="05 — EXPERIENCE" className="mb-4" />
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#111111] dark:text-[#F5F3EE]">
            TIMELINE & EDUCATION
          </h2>
        </div>
        <p className="font-mono text-xs uppercase tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] max-w-xs">
          Structured records of engineering roles, internships, and academic foundation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Experience Timeline (Left 7 Cols) */}
        <div className="lg:col-span-7 experience-timeline space-y-8">
          <div className="flex items-center gap-3 pb-3 border-b border-[#D8D5CE]/60 dark:border-[#272B26]/60">
            <Briefcase size={16} className="text-[#005A36] dark:text-[#00A865]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#111111] dark:text-[#F5F3EE] font-semibold">
              PROFESSIONAL TRAJECTORY
            </h3>
          </div>

          <div className="relative pl-6 border-l border-[#D8D5CE] dark:border-[#272B26] space-y-10">
            {experiences.map((item) => (
              <div
                key={item.id}
                className="timeline-block relative group"
              >
                {/* Node indicator on line */}
                <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#005A36] dark:border-[#00A865] bg-[#F5F3EE] dark:bg-[#0E100E] group-hover:bg-[#005A36] dark:group-hover:bg-[#00A865] transition-colors" />

                <div className="p-6 border border-[#D8D5CE] dark:border-[#272B26] bg-[#FAF9F6] dark:bg-[#141714] transition-colors hover:border-[#005A36] dark:hover:border-[#00A865]">
                  {/* Top Bar: Year & Tag */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CE]/50 dark:border-[#272B26]/50">
                    <span className="font-mono text-xs text-[#005A36] dark:text-[#00A865] font-semibold tracking-wider">
                      {item.year}
                    </span>
                    {item.isPlaceholder && (
                      <span className="font-mono text-[10px] text-[#5F5F5A] dark:text-[#9E9E98] bg-[#E9E4D9] dark:bg-[#1A201A] px-2 py-0.5 tracking-wider uppercase">
                        STRUCTURED PLACEHOLDER
                      </span>
                    )}
                  </div>

                  {/* Role & Company */}
                  <div className="mt-4 mb-2">
                    <h4 className="font-serif text-xl sm:text-2xl text-[#111111] dark:text-[#F5F3EE] font-medium">
                      {item.role}
                    </h4>
                    <p className="font-sans text-xs uppercase tracking-wider text-[#005A36] dark:text-[#00A865] mt-1 font-semibold">
                      {item.organization}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-sm text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed mt-3">
                    {item.description}
                  </p>

                  {/* Tech stack */}
                  {item.technologies && (
                    <div className="mt-4 pt-3 border-t border-[#D8D5CE]/40 dark:border-[#272B26]/40 flex flex-wrap gap-2">
                      {item.technologies.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[11px] px-2 py-0.5 bg-[#E9E4D9]/60 dark:bg-[#1A201A] text-[#111111] dark:text-[#F5F3EE] border border-[#D8D5CE] dark:border-[#272B26]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education (Right 5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="flex items-center gap-3 pb-3 border-b border-[#D8D5CE]/60 dark:border-[#272B26]/60">
            <GraduationCap size={16} className="text-[#005A36] dark:text-[#00A865]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#111111] dark:text-[#F5F3EE] font-semibold">
              ACADEMIC BACKGROUND
            </h3>
          </div>

          <div className="space-y-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="p-6 border border-[#D8D5CE] dark:border-[#272B26] bg-[#FAF9F6] dark:bg-[#141714] transition-colors hover:border-[#005A36] dark:hover:border-[#00A865]"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CE]/50 dark:border-[#272B26]/50">
                  <span className="font-mono text-xs text-[#005A36] dark:text-[#00A865] font-semibold tracking-wider">
                    {edu.period}
                  </span>
                  {edu.isPlaceholder && (
                    <span className="font-mono text-[10px] text-[#5F5F5A] dark:text-[#9E9E98] bg-[#E9E4D9] dark:bg-[#1A201A] px-2 py-0.5 tracking-wider uppercase">
                      VERIFIABLE
                    </span>
                  )}
                </div>

                <div className="mt-4 mb-2">
                  <h4 className="font-serif text-xl text-[#111111] dark:text-[#F5F3EE] font-medium">
                    {edu.degree}
                  </h4>
                  <p className="font-sans text-xs uppercase tracking-wider text-[#005A36] dark:text-[#00A865] mt-1 font-semibold">
                    {edu.institution}
                  </p>
                </div>

                <p className="font-sans text-sm text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed mt-3">
                  {edu.detail}
                </p>
              </div>
            ))}

            {/* Note on data updates */}
            <div className="p-4 border border-dashed border-[#D8D5CE] dark:border-[#272B26] font-mono text-[11px] text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed">
              <span className="text-[#005A36] dark:text-[#00A865] font-semibold">NOTE: </span>
              Timeline data is modular and configurable directly via <code className="text-[#111111] dark:text-[#F5F3EE]">src/data/experience.ts</code>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
