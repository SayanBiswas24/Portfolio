import React, { useRef, useState, useCallback, useEffect } from "react";
import type { Project } from "@/data/projects";
import {
  ArrowUpRight,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Smartphone,
  Gamepad2,
} from "lucide-react";
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
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
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

  const openModal = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveModalIndex(idx);
  };

  const closeModal = () => {
    setActiveModalIndex(null);
  };

  const nextScreenshot = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (project.screenshots && activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex + 1) % project.screenshots.length);
    }
  };

  const prevScreenshot = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (project.screenshots && activeModalIndex !== null) {
      setActiveModalIndex(
        (activeModalIndex - 1 + project.screenshots.length) % project.screenshots.length
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextScreenshot();
      if (e.key === "ArrowLeft") prevScreenshot();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex]);

  useEffect(() => {
    if (activeModalIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModalIndex]);

  const isEven = index % 2 === 0;

  return (
    <article
      ref={cardRef}
      id={`project-${project.id}`}
      className="project-card border-t border-[#D8D5CE] dark:border-[#2A322A] pt-16 pb-20 transition-colors duration-500 hover:border-[#111111] dark:hover:border-[#F5F3EE]"
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
            <div className="flex items-center justify-between pb-4 border-b border-[#D8D5CE]/60 dark:border-[#2A322A]/60">
              <span className="font-mono text-base tracking-widest text-[#005A36] dark:text-[#00A865] font-medium">
                PROJECT // {project.number}
              </span>
              <span className="font-mono text-sm tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] uppercase">
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
              <div className="text-[13px] font-mono tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] uppercase mb-3">
                Stack & Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-sm px-2.5 py-1 bg-[#E9E4D9]/60 dark:bg-[#232823] text-[#111111] dark:text-[#F5F3EE] border border-[#D8D5CE] dark:border-[#2A322A] hover:border-[#005A36] dark:hover:border-[#00A865] hover:text-[#005A36] dark:hover:text-[#00A865] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-10 pt-6 border-t border-[#D8D5CE]/60 dark:border-[#2A322A]/60 flex items-center gap-4">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-[#005A36] dark:text-[#00A865] hover:text-[#007A4A] dark:hover:text-[#1DE48F] px-3.5 py-1.5 rounded-full hover:bg-[#005A36]/10 dark:hover:bg-[#00A865]/15 hover:shadow-[0_0_12px_rgba(0,90,54,0.15)] dark:hover:shadow-[0_0_14px_rgba(0,168,101,0.25)] transition-all duration-200"
              >
                <span>Live Experience</span>
                <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <span className="font-mono text-sm tracking-wider text-[#5F5F5A]/70 dark:text-[#9E9E98]/70 uppercase px-2 py-1">
                System In Deployment
              </span>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] px-3.5 py-1.5 rounded-full hover:bg-[#005A36]/8 dark:hover:bg-[#00A865]/15 transition-all duration-200"
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
            className="relative overflow-hidden border border-[#D8D5CE] dark:border-[#2A322A] bg-[#FAF9F6] dark:bg-[#1D211D] p-2 sm:p-4 transition-all duration-300"
            style={{
              transform: prefersReducedMotion
                ? "none"
                : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? "-4px" : "0px"})`,
              borderColor: isHovered
                ? isDark
                  ? "#00A865"
                  : "#005A36"
                : isDark
                ? "#2A322A"
                : "#D8D5CE",
              boxShadow: isHovered
                ? isDark
                  ? "0 0 25px rgba(0,168,101,0.18)"
                  : "0 6px 24px rgba(0,90,54,0.12)"
                : "none",
            }}
          >
            {project.screenshots && project.screenshots.length > 0 ? (
              project.screenshots.length === 2 ? (
                /* Dual-Scene 2D Game Showcase */
                <div className="relative overflow-hidden bg-[#FAF9F6] dark:bg-[#191D19] border border-[#D8D5CE]/60 dark:border-[#2A322A]/60 p-3 sm:p-4">
                  {/* Top CAD Studio Bar */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D8D5CE]/50 dark:border-[#2A322A]/60 font-mono text-[12px] uppercase tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] select-none">
                    <span className="flex items-center gap-1.5 text-[#111111] dark:text-[#F5F3EE] font-medium">
                      <Gamepad2 size={13} className="text-[#005A36] dark:text-[#00A865]" />
                      <span>2D GAME ENGINE // 2 LEVEL SCENES</span>
                    </span>
                    <span className="text-[#005A36] dark:text-[#00A865] flex items-center gap-1 font-semibold">
                      <span>INSPECT LEVEL VIEW</span>
                      <ArrowUpRight size={11} />
                    </span>
                  </div>

                  {/* 2 Widescreen Game Scene Displays */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.screenshots.map((ss, idx) => (
                      <div
                        key={ss.id}
                        onClick={(e) => openModal(idx, e)}
                        className="group/scene relative rounded-xl border-2 border-[#1C201C] dark:border-[#2E372E] bg-[#111411] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#005A36] dark:hover:border-[#00A865] hover:shadow-[0_8px_24px_rgba(0,90,54,0.22)] dark:hover:shadow-[0_8px_24px_rgba(0,168,101,0.28)] hover:-translate-y-1"
                        role="button"
                        tabIndex={0}
                        aria-label={`View ${ss.label} scene`}
                      >
                        {/* Scene Title Bar */}
                        <div className="flex items-center justify-between px-3 py-1.5 bg-[#171B17] border-b border-[#2A332A] font-mono text-[12px] select-none">
                          <span className="text-[#00A865] font-semibold tracking-wider">
                            {ss.tag.split("//")[0].trim()}
                          </span>
                          <span className="text-[#F5F3EE] text-[11px] font-sans truncate ml-2 font-medium">
                            {ss.label}
                          </span>
                        </div>

                        {/* Scene Image */}
                        <div className="relative aspect-[16/9] overflow-hidden bg-[#241E2F]">
                          <img
                            src={ss.image}
                            alt={`${project.title} - ${ss.label}`}
                            loading="lazy"
                            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/scene:scale-105"
                          />

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-[#005A36]/15 dark:bg-[#00A865]/20 opacity-0 group-hover/scene:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <span className="p-2 rounded-full bg-[#FFFFFF]/90 dark:bg-[#191D19]/90 text-[#005A36] dark:text-[#00A865] shadow-xs">
                              <Maximize2 size={14} />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Multi-Device Smartphone Gallery Showcase (4 screens) */
                <div className="relative overflow-hidden bg-[#E9E4D9]/20 dark:bg-[#191D19]/60 border border-[#D8D5CE]/60 dark:border-[#2A322A]/60 p-3 sm:p-5">
                  {/* Top CAD Studio Bar */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D8D5CE]/50 dark:border-[#2A322A]/60 font-mono text-[12px] uppercase tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] select-none">
                    <span className="flex items-center gap-1.5 text-[#111111] dark:text-[#F5F3EE] font-medium">
                      <Smartphone size={12} className="text-[#005A36] dark:text-[#00A865]" />
                      <span>FLUTTER MOBILE CLIENT // 4 VIEWS</span>
                    </span>
                    <span className="text-[#005A36] dark:text-[#00A865] flex items-center gap-1 font-semibold">
                      <span>INSPECT INTERACTION</span>
                      <ArrowUpRight size={11} />
                    </span>
                  </div>

                  {/* 4 Phone Mockup Frames */}
                  <div className="flex sm:grid sm:grid-cols-4 gap-2.5 sm:gap-3.5 overflow-x-auto pb-2 sm:pb-0 snap-x snap-mandatory no-scrollbar">
                    {project.screenshots.map((ss, idx) => (
                      <div
                        key={ss.id}
                        onClick={(e) => openModal(idx, e)}
                        className="group/phone relative flex-1 shrink-0 w-[145px] sm:w-auto snap-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
                        role="button"
                        tabIndex={0}
                        aria-label={`View ${ss.label} screenshot`}
                      >
                        {/* Phone Bezel */}
                        <div className="relative rounded-[16px] sm:rounded-[18px] border-[2.5px] border-[#1C201C] dark:border-[#2F392F] bg-[#111411] p-1 shadow-md transition-all duration-300 group-hover/phone:border-[#005A36] dark:group-hover/phone:border-[#00A865] group-hover/phone:shadow-[0_8px_20px_rgba(0,90,54,0.2)] dark:group-hover/phone:shadow-[0_8px_20px_rgba(0,168,101,0.25)]">
                          {/* Speaker Notch */}
                          <div className="w-6 h-1 bg-[#2C332C] dark:bg-[#445244] rounded-full mx-auto my-0.5" />

                          {/* Screen Visual */}
                          <div className="relative aspect-[9/20] overflow-hidden rounded-[11px] sm:rounded-[13px] bg-[#E9E4D9]/40 dark:bg-[#1A201A]">
                            <img
                              src={ss.image}
                              alt={`${project.title} - ${ss.label}`}
                              loading="lazy"
                              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/phone:scale-105"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-[#005A36]/15 dark:bg-[#00A865]/20 opacity-0 group-hover/phone:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                              <span className="p-1.5 rounded-full bg-[#FFFFFF]/90 dark:bg-[#191D19]/90 text-[#005A36] dark:text-[#00A865] shadow-xs">
                                <Maximize2 size={12} />
                              </span>
                            </div>
                          </div>

                          {/* Bottom Home Indicator */}
                          <div className="w-10 h-0.5 bg-[#2C332C] dark:bg-[#445244] rounded-full mx-auto my-1" />
                        </div>

                        {/* Screen Caption */}
                        <div className="mt-2 text-center">
                          <div className="font-mono text-[11px] uppercase tracking-wider text-[#005A36] dark:text-[#00A865] font-semibold">
                            {ss.tag.split("//")[0].trim()}
                          </div>
                          <div className="font-sans text-[11px] text-[#111111] dark:text-[#F5F3EE] truncate font-medium">
                            {ss.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ) : (
              /* Single Image Standard Visual Container */
              <div className="relative overflow-hidden aspect-[16/10] bg-[#E9E4D9]/40 dark:bg-[#191D19]/60 border border-[#D8D5CE]/60 dark:border-[#2A322A]/60">
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
                  <div className="bg-[#F5F3EE] dark:bg-[#151815] px-4 py-2 border border-[#005A36] dark:border-[#00A865] text-[#005A36] dark:text-[#00A865] font-mono text-sm uppercase tracking-widest flex items-center gap-2 shadow-xs">
                    <span>EXPAND VIEW</span>
                    <ArrowUpRight size={13} />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Technical Bar */}
            <div className="mt-3 flex items-center justify-between px-1 font-mono text-[12px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider">
              <span>FIG. {project.number} — {project.screenshots ? (project.screenshots.length === 2 ? "2D GAME ENGINE" : "MOBILE UI CLIENT") : "SYSTEM ARCHITECTURE"}</span>
              <span className="text-[#005A36] dark:text-[#00A865]">STATUS: VERIFIED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Screenshot Lightbox Modal */}
      {project.screenshots && activeModalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#000000]/80 backdrop-blur-md transition-all duration-300"
          onClick={closeModal}
        >
          <div
            className={`relative w-full max-h-[94vh] flex flex-col items-center bg-[#FFFFFF] dark:bg-[#191D19] border border-[#D8D5CE] dark:border-[#2A322A] p-4 sm:p-6 shadow-2xl rounded-2xl ${
              project.screenshots.length === 2 ? "max-w-4xl" : "max-w-lg"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-[#D8D5CE]/60 dark:border-[#2A322A]/60 font-mono text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[#005A36] dark:text-[#00A865] font-semibold">
                  {project.screenshots[activeModalIndex].tag}
                </span>
                <span className="text-[#111111] dark:text-[#F5F3EE] font-sans font-medium">
                  {project.screenshots[activeModalIndex].label}
                </span>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 rounded-full hover:bg-[#005A36]/10 dark:hover:bg-[#00A865]/15 text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] transition-colors cursor-pointer"
                aria-label="Close image modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Image with Navigation Arrows */}
            <div className="relative w-full flex items-center justify-center my-auto py-2">
              <button
                type="button"
                onClick={prevScreenshot}
                className="absolute left-1 sm:left-2 z-10 p-2 sm:p-2.5 rounded-full bg-[#FFFFFF]/90 dark:bg-[#232823]/90 border border-[#D8D5CE] dark:border-[#2A322A] text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] shadow-md transition-all hover:scale-110 cursor-pointer"
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={20} />
              </button>

              <div
                className={`overflow-hidden rounded-[16px] border-[3px] border-[#1C201C] dark:border-[#2E372E] shadow-2xl bg-black ${
                  project.screenshots.length === 2
                    ? "max-h-[72vh] aspect-[16/9] sm:aspect-[21/10] w-full"
                    : "max-h-[66vh] aspect-[9/20]"
                }`}
              >
                <img
                  src={project.screenshots[activeModalIndex].image}
                  alt={project.screenshots[activeModalIndex].label}
                  className="w-full h-full object-contain"
                />
              </div>

              <button
                type="button"
                onClick={nextScreenshot}
                className="absolute right-1 sm:right-2 z-10 p-2 sm:p-2.5 rounded-full bg-[#FFFFFF]/90 dark:bg-[#232823]/90 border border-[#D8D5CE] dark:border-[#2A322A] text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] shadow-md transition-all hover:scale-110 cursor-pointer"
                aria-label="Next screenshot"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Bottom Screen Switcher Dots / Pills */}
            <div className="w-full pt-3 mt-2 border-t border-[#D8D5CE]/50 dark:border-[#2A322A]/50 flex items-center justify-between font-mono text-[12px] text-[#5F5F5A] dark:text-[#9E9E98]">
              <span>SCENE {activeModalIndex + 1} OF {project.screenshots.length}</span>
              <div className="flex items-center gap-1.5">
                {project.screenshots.map((s, sIdx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveModalIndex(sIdx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      sIdx === activeModalIndex
                        ? "w-6 bg-[#005A36] dark:bg-[#00A865]"
                        : "w-2 bg-[#D8D5CE] dark:bg-[#2A322A] hover:bg-[#005A36]/50"
                    }`}
                    aria-label={`Jump to scene ${sIdx + 1}`}
                  />
                ))}
              </div>
              <span className="hidden sm:inline">ARROWS OR ESC</span>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
