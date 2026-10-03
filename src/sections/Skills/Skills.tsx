import React, { useRef, useEffect } from "react";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { skillCategories } from "@/data/skills";
import { gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight } from "lucide-react";

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-header",
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
        ".skill-group",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".skills-grid",
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
      id="skills"
      className="py-28 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-[#D8D5CE]"
    >
      {/* Header */}
      <div className="skills-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#D8D5CE]">
        <div>
          <SectionLabel label="02 — TECHNOLOGIES" className="mb-4" />
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#111111]">
            TOOLS I WORK WITH
          </h2>
        </div>
        <p className="font-mono text-xs uppercase tracking-wider text-[#5F5F5A] max-w-xs">
          Modular stack selected for type safety, performance, and real-world scalability.
        </p>
      </div>

      {/* Editorial Grid */}
      <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((group) => (
          <div
            key={group.category}
            className="skill-group border border-[#D8D5CE] bg-[#FAF9F6] p-7 transition-all duration-300 hover:border-[#005A36] flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#D8D5CE]/60 mb-6">
                <span className="font-mono text-xs text-[#005A36] uppercase tracking-widest font-semibold">
                  {group.code}
                </span>
                <span className="font-mono text-[11px] text-[#5F5F5A] uppercase tracking-wider">
                  {group.category}
                </span>
              </div>

              {/* Skills Item List with Hover Micro-Interactions */}
              <ul className="space-y-3">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="group relative flex items-center justify-between py-2 border-b border-[#D8D5CE]/30 hover:border-[#005A36]/60 cursor-default transition-all duration-200"
                    data-cursor="TOOL"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D8D5CE] group-hover:bg-[#005A36] transition-colors duration-200" />
                      <span className="font-sans text-base text-[#111111] group-hover:text-[#005A36] group-hover:translate-x-1.5 transition-all duration-200 font-medium">
                        {skill.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {skill.focus && (
                        <span className="font-mono text-[10px] text-[#5F5F5A] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:inline">
                          {skill.focus}
                        </span>
                      )}
                      <ArrowUpRight
                        size={12}
                        className="text-[#005A36] opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description note */}
            <div className="mt-6 pt-4 border-t border-[#D8D5CE]/40 font-mono text-[11px] text-[#5F5F5A]">
              {group.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
