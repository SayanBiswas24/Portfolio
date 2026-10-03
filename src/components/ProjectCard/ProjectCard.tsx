import React, { useRef, useState, useCallback } from "react";
import type { Project } from "@/data/projects";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons/SocialIcons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/context/ThemeContext";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !imageContainerRef.current) return;
      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalize from -1 to 1
      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      // Max tilt: X: ±3 deg, Y: ±4 deg
      setTilt({
        x: -normY * 3,
        y: normX * 4,
      });
    },
    [prefersReducedMotion]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const isEven = index % 2 === 0;

  return (
    <article
      ref={cardRef}
      id={`project-${project.id}`}
      className="project-card border-t border-[#D8D5CE] dark:border-[#272B26] pt-16 pb-20 transition-colors duration-500 hover:border-[#111111] dark:hover:border-[#F5F3EE]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Project Meta & Information */}
        <div
          className={`lg:col-span-5 flex flex-col justify-between h-full ${
            isEven ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div>
            {/* Project Index & Category */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D8D5CE]/60 dark:border-[#272B26]/60">
              <span className="font-mono text-sm tracking-widest text-[#005A36] dark:text-[#00A865] font-medium">
                PROJECT // {project.number}
              </span>
              <span className="font-mono text-xs tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] uppercase">
                {project.technologies[0]} SYSTEM
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="mt-6 mb-4">
              <h3 className="font-serif text-3xl sm:text-4xl text-[#111111] dark:text-[#F5F3EE] tracking-tight leading-tight transition-transform duration-300 group-hover:translate-x-1">
                {project.title}
              </h3>
              <p className="font-sans text-xs tracking-wide uppercase text-[#005A36] dark:text-[#00A865] mt-2 font-medium">
                {project.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="font-sans text-base text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed mt-4 font-normal">
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="mt-8">
              <div className="text-[11px] font-mono tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] uppercase mb-3">
                Stack & Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 bg-[#E9E4D9]/60 dark:bg-[#1A201A] text-[#111111] dark:text-[#F5F3EE] border border-[#D8D5CE] dark:border-[#272B26] hover:border-[#005A36] dark:hover:border-[#00A865] hover:text-[#005A36] dark:hover:text-[#00A865] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-10 pt-6 border-t border-[#D8D5CE]/60 dark:border-[#272B26]/60 flex items-center gap-6">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#005A36] dark:text-[#00A865] hover:text-[#2F7D5B] dark:hover:text-[#34B37D] transition-colors"
                data-cursor="OPEN"
              >
                <span>Live Experience</span>
                <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <span className="font-mono text-xs tracking-wider text-[#5F5F5A]/70 dark:text-[#9E9E98]/70 uppercase">
                System In Deployment
              </span>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] transition-colors"
                data-cursor="CODE"
              >
                <GithubIcon size={13} />
                <span>Source</span>
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>

        {/* Project Visual Container with 3D Tilt */}
        <div
          className={`lg:col-span-7 ${
            isEven ? "lg:order-2" : "lg:order-1"
          }`}
          onMouseMove={handleMouseMove}
        >
          <div
            ref={imageContainerRef}
            className="relative overflow-hidden border border-[#D8D5CE] dark:border-[#272B26] bg-[#FAF9F6] dark:bg-[#141714] p-2 sm:p-4 transition-all duration-300"
            style={{
              transform: prefersReducedMotion
                ? "none"
                : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? "-4px" : "0px"})`,
              borderColor: isHovered
                ? isDark
                  ? "#F5F3EE"
                  : "#111111"
                : isDark
                ? "#272B26"
                : "#D8D5CE",
            }}
            data-cursor="VIEW"
          >
            {/* Visual inner container with subtle clip border */}
            <div className="relative overflow-hidden aspect-[16/10] bg-[#E9E4D9]/40 dark:bg-[#1A201A]/60 border border-[#D8D5CE]/60 dark:border-[#272B26]/60">
              <img
                src={project.image}
                alt={`${project.title} Architectural Visual`}
                loading="lazy"
                className="project-image w-full h-full object-cover transition-transform duration-700 ease-out"
                style={{
                  transform: isHovered && !prefersReducedMotion ? "scale(1.04)" : "scale(1)",
                  filter: isDark ? "brightness(0.92) contrast(1.05)" : "none",
                }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  if (target.parentElement) {
                    target.parentElement.classList.add("flex", "items-center", "justify-center");
                    target.parentElement.innerHTML = `
                      <div class="p-8 text-center font-mono">
                        <div class="text-[#005A36] dark:text-[#00A865] text-sm tracking-wider uppercase mb-2">PROJECT VISUAL // ARCHIVE</div>
                        <div class="text-[#111111] dark:text-[#F5F3EE] font-serif text-2xl">${project.title}</div>
                        <div class="text-[#5F5F5A] dark:text-[#9E9E98] text-xs mt-3">Architectural Blueprint & Spec</div>
                      </div>
                    `;
                  }
                }}
              />

              {/* View Overlay Indicator */}
              <div
                className={`absolute inset-0 bg-[#005A36]/15 dark:bg-[#00A865]/15 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-[#F5F3EE] dark:bg-[#0E100E] px-4 py-2 border border-[#005A36] dark:border-[#00A865] text-[#005A36] dark:text-[#00A865] font-mono text-xs uppercase tracking-widest flex items-center gap-2 shadow-xs">
                  <span>EXPAND VIEW</span>
                  <ArrowUpRight size={13} />
                </div>
              </div>
            </div>

            {/* Bottom Technical Bar */}
            <div className="mt-3 flex items-center justify-between px-1 font-mono text-[10px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider">
              <span>FIG. {project.number} — SYSTEM ARCHITECTURE</span>
              <span className="text-[#005A36] dark:text-[#00A865]">STATUS: VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
