import React, { useRef, useEffect } from "react";
import { gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ToolCategory {
  number: string;
  category: string;
  items: string[];
  footer: string;
}

const toolCategories: ToolCategory[] = [
  {
    number: "01",
    category: "MOBILE",
    items: ["Flutter", "Dart"],
    footer: "PRIMARY FRAMEWORK",
  },
  {
    number: "02",
    category: "FRONTEND",
    items: ["React", "TypeScript", "JavaScript", "HTML / CSS", "Tailwind CSS"],
    footer: "DESIGN SYSTEMS & SPAs",
  },
  {
    number: "03",
    category: "BACKEND",
    items: ["Node.js", "Express", "NestJS", "REST APIs"],
    footer: "MICROSERVICES & APIS",
  },
  {
    number: "04",
    category: "DATABASES",
    items: ["MongoDB", "PostgreSQL", "Firebase", "Supabase"],
    footer: "SCHEMAS & DATA STORES",
  },
  {
    number: "05",
    category: "BLOCKCHAIN",
    items: ["Ethereum", "Solidity", "Algorand", "Algo"],
    footer: "SMART CONTRACTS & WEB3",
  },
  {
    number: "06",
    category: "TOOLS",
    items: ["Git / GitHub", "Docker", "Linux", "VS Code"],
    footer: "ENVIRONMENT & TOOLING",
  },
];

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-header-block",
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
        ".tool-column-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".tools-columns-grid",
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
      className="py-24 sm:py-28 px-4 sm:px-6 max-w-[1520px] mx-auto w-full border-t border-[#D8D5CE] dark:border-[#212621]"
    >
      <div className="skills-header-block mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D8D5CE] dark:border-[#212621]">
        <div>
          <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-[#005A36] dark:text-[#00A865] font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#005A36] dark:bg-[#00A865]" />
            <span>02 // SKILLS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#111111] dark:text-[#F5F3EE]">
            Tools I Work With
          </h2>
        </div>
      </div>

      <div className="tools-columns-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {toolCategories.map((group) => (
          <div
            key={group.category}
            className="tool-column-card border border-[#D8D5CE] dark:border-[#212621] bg-[#FFFFFF] dark:bg-[#111411] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#005A36] dark:hover:border-[#00A865] hover:bg-[#FAF9F5] dark:hover:bg-[#161B16] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_20px_rgba(0,168,101,0.08)] group"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CE]/60 dark:border-[#212621]/60 mb-5">
                <span className="font-mono text-sm text-[#005A36] dark:text-[#00A865] uppercase tracking-widest font-semibold">
                  {group.number} // {group.category}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D8D5CE] dark:bg-[#212621] group-hover:bg-[#005A36] dark:group-hover:bg-[#00A865] transition-colors" />
              </div>

              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-sans text-sm text-[#111111] dark:text-[#F5F3EE] flex items-center gap-2 group/item transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#005A36] dark:bg-[#00A865]" />
                    <span className="group-hover/item:text-[#005A36] dark:group-hover/item:text-[#00A865] transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
