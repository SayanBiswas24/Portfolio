import React, { useRef, useEffect } from "react";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { ProjectCard } from "@/components/ProjectCard/ProjectCard";
import { projects } from "@/data/projects";
import { gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        ".projects-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Clip path reveal for each project card visual
      const projectCards = gsap.utils.toArray<HTMLElement>(".project-card");
      projectCards.forEach((card) => {
        const img = card.querySelector(".project-image");
        if (img) {
          gsap.fromTo(
            img,
            { clipPath: "inset(0 0 100% 0)", opacity: 0.4 },
            {
              clipPath: "inset(0 0 0% 0)",
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 78%",
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-28 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-[#D8D5CE]"
    >
      {/* Header */}
      <div className="projects-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#D8D5CE]">
        <div>
          <SectionLabel label="03 — SELECTED WORK" className="mb-4" />
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#111111]">
            THINGS I'VE BUILT
          </h2>
        </div>
        <div className="font-mono text-xs uppercase tracking-wider text-[#5F5F5A] max-w-sm">
          A selection of mobile applications, full-stack systems, and experimental interfaces built for utility.
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};
