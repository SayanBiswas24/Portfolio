import React, { useRef, useEffect, useState } from "react";
import { projects, type ProjectScreenshot } from "@/data/projects";
import { gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  ArrowUpRight,
  Smartphone,
  Gamepad2,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeModalProject, setActiveModalProject] = useState<{
    title: string;
    screenshots: ProjectScreenshot[];
    index: number;
    isLandscape: boolean;
  } | null>(null);

  const openModal = (
    title: string,
    screenshots: ProjectScreenshot[],
    index: number,
    isLandscape = false
  ) => {
    setActiveModalProject({ title, screenshots, index, isLandscape });
  };

  const closeModal = () => {
    setActiveModalProject(null);
  };

  const nextModalScreenshot = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeModalProject) {
      setActiveModalProject((prev) =>
        prev
          ? { ...prev, index: (prev.index + 1) % prev.screenshots.length }
          : null
      );
    }
  };

  const prevModalScreenshot = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeModalProject) {
      setActiveModalProject((prev) =>
        prev
          ? {
              ...prev,
              index:
                (prev.index - 1 + prev.screenshots.length) %
                prev.screenshots.length,
            }
          : null
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalProject) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextModalScreenshot();
      if (e.key === "ArrowLeft") prevModalScreenshot();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalProject]);

  useEffect(() => {
    if (activeModalProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModalProject]);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-header-block",
        { y: 25, opacity: 0 },
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

      gsap.fromTo(
        ".project-editorial-row",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".projects-list-container",
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const p1 = projects[0];
  const p2 = projects[1];
  const p3 = projects[2];
  const p4 = projects[3];

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-24 sm:py-28 px-4 sm:px-6 max-w-[1520px] mx-auto w-full border-t border-[#D8D5CE] dark:border-[#2A322A]"
    >
      <div className="projects-header-block mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D8D5CE] dark:border-[#2A322A]">
        <div>
          <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-[#005A36] dark:text-[#00A865] font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#005A36] dark:bg-[#00A865]" />
            <span>03 // SELECTED WORK</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#111111] dark:text-[#F5F3EE]">
            Things I've Built
          </h2>
        </div>
      </div>

      <div className="projects-list-container space-y-12">
        {/* ===================== PROJECT 01: KAUSHAL SAATHI ===================== */}
        <article className="project-editorial-row border border-[#D8D5CE] dark:border-[#2A322A] bg-[#FFFFFF] dark:bg-[#1D211D] p-6 lg:p-10 transition-colors duration-300 hover:border-[#005A36] dark:hover:border-[#00A865]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CE]/60 dark:border-[#2A322A]/60 font-mono text-[14px] text-[#005A36] dark:text-[#00A865] font-semibold uppercase tracking-wider">
                  <span>PROJECT // 01</span>
                </div>

                <div className="mt-5 mb-3">
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#111111] dark:text-[#F5F3EE] font-normal tracking-tight">
                    {p1.title}
                  </h3>
                  <div className="font-mono text-[13px] uppercase tracking-wider text-[#005A36] dark:text-[#00A865] mt-1.5 font-medium">
                    {p1.tagline}
                  </div>
                </div>

                <p className="font-sans text-sm sm:text-base text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed mt-4">
                  {p1.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {p1.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 font-mono text-[13px] border border-[#D8D5CE] dark:border-[#2A322A] bg-[#FAF9F6] dark:bg-[#232823] text-[#111111] dark:text-[#F5F3EE] rounded-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 border border-[#D8D5CE] dark:border-[#2A322A] bg-[#FAF9F6] dark:bg-[#191D19] flex flex-col justify-between overflow-hidden shadow-xs transition-colors">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#D8D5CE] dark:border-[#2A322A] font-mono text-[12px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider bg-[#FFFFFF] dark:bg-[#191D19]">
                <span className="flex items-center gap-1.5 text-[#111111] dark:text-[#F5F3EE] font-medium">
                  <Smartphone size={12} className="text-[#005A36] dark:text-[#00A865]" />
                  <span>FLUTTER MULTILINGUAL CLIENT</span>
                </span>
                <span className="text-[#005A36] dark:text-[#00A865] font-semibold flex items-center gap-1">
                  <span>CLICK TO INSPECT</span>
                  <ArrowUpRight size={11} />
                </span>
              </div>

              {/* 4 Phone Mockups Showcase */}
              <div className="p-3 sm:p-4 bg-[#FAF9F6] dark:bg-[#191D19]">
                <div className="flex sm:grid sm:grid-cols-4 gap-2 sm:gap-2.5 overflow-x-auto pb-2 sm:pb-0 snap-x snap-mandatory no-scrollbar">
                  {p1.screenshots?.map((ss, idx) => (
                    <div
                      key={ss.id}
                      onClick={() => openModal(p1.title, p1.screenshots!, idx, false)}
                      className="group/phone relative flex-1 shrink-0 w-[125px] sm:w-auto snap-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 select-none"
                      role="button"
                      tabIndex={0}
                      aria-label={`Inspect ${ss.label} screenshot`}
                    >
                      {/* Phone Bezel */}
                      <div className="relative rounded-[16px] border-[2px] border-[#1C201C] dark:border-[#2E372E] bg-[#111411] p-1 shadow-md transition-all duration-300 group-hover/phone:border-[#005A36] dark:group-hover/phone:border-[#00A865] group-hover/phone:shadow-[0_6px_20px_rgba(0,90,54,0.22)] dark:group-hover/phone:shadow-[0_6px_20px_rgba(0,168,101,0.25)]">
                        {/* Speaker Notch */}
                        <div className="w-5 h-0.5 bg-[#2C332C] dark:bg-[#445244] rounded-full mx-auto my-0.5" />

                        {/* Screen Image Container */}
                        <div className="relative aspect-[9/20] overflow-hidden rounded-[11px] bg-[#E9E4D9]/40 dark:bg-[#1A201A]">
                          <img
                            src={ss.image}
                            alt={`${p1.title} - ${ss.label}`}
                            loading="lazy"
                            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/phone:scale-105"
                          />

                          {/* Hover Overlay Hint */}
                          <div className="absolute inset-0 bg-[#005A36]/15 dark:bg-[#00A865]/20 opacity-0 group-hover/phone:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <span className="p-1.5 rounded-full bg-[#FFFFFF]/90 dark:bg-[#191D19]/90 text-[#005A36] dark:text-[#00A865] shadow-xs">
                              <Maximize2 size={12} />
                            </span>
                          </div>
                        </div>

                        {/* Bottom Home Indicator */}
                        <div className="w-8 h-0.5 bg-[#2C332C] dark:bg-[#445244] rounded-full mx-auto my-0.5" />
                      </div>

                      {/* Screen Caption */}
                      <div className="mt-2 text-center">
                        <div className="font-mono text-[11px] uppercase tracking-wider text-[#005A36] dark:text-[#00A865] font-semibold">
                          {ss.tag.split("//")[0].trim()}
                        </div>
                        <div className="font-sans text-[10px] text-[#111111] dark:text-[#F5F3EE] truncate font-medium">
                          {ss.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="project-editorial-row border border-[#D8D5CE] dark:border-[#2A322A] bg-[#FFFFFF] dark:bg-[#1D211D] p-6 lg:p-10 transition-colors duration-300 hover:border-[#005A36] dark:hover:border-[#00A865]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 lg:order-1 border border-[#D8D5CE] dark:border-[#2A322A] bg-[#FAF9F6] dark:bg-[#191D19] flex flex-col justify-between overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#D8D5CE] dark:border-[#2A322A] font-mono text-[12px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider bg-[#FFFFFF] dark:bg-[#191D19]">
                <span>VOICE & CALL INTELLIGENCE</span>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center p-3">
                <img
                  src={p2.image}
                  alt={p2.title}
                  className="w-full h-full object-cover rounded-xs"
                />
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CE]/60 dark:border-[#2A322A]/60 font-mono text-[14px] text-[#005A36] dark:text-[#00A865] font-semibold uppercase tracking-wider">
                  <span>PROJECT // 02</span>
                </div>

                <div className="mt-5 mb-3">
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#111111] dark:text-[#F5F3EE] font-normal tracking-tight">
                    {p2.title}
                  </h3>
                  <div className="font-mono text-[13px] uppercase tracking-wider text-[#005A36] dark:text-[#00A865] mt-1.5 font-medium">
                    {p2.tagline}
                  </div>
                </div>

                <p className="font-sans text-sm sm:text-base text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed mt-4">
                  {p2.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {p2.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 font-mono text-[13px] border border-[#D8D5CE] dark:border-[#2A322A] bg-[#FAF9F6] dark:bg-[#232823] text-[#111111] dark:text-[#F5F3EE] rounded-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ===================== PROJECTS 03 & 04 (2 COLUMNS SIDE-BY-SIDE) ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project 03: Nagar Alert Hub */}
          <article className="project-editorial-row border border-[#D8D5CE] dark:border-[#2A322A] bg-[#FFFFFF] dark:bg-[#1D211D] p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 hover:border-[#005A36] dark:hover:border-[#00A865]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CE]/60 dark:border-[#2A322A]/60 font-mono text-[14px] text-[#005A36] dark:text-[#00A865] font-semibold uppercase tracking-wider">
                <span>PROJECT // 03</span>
              </div>

              <div className="mt-4 mb-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] dark:text-[#F5F3EE] font-normal tracking-tight">
                  {p3.title}
                </h3>
                <div className="font-mono text-[12px] uppercase tracking-wider text-[#005A36] dark:text-[#00A865] mt-1">
                  {p3.tagline}
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed mt-3">
                {p3.description}
              </p>

              <div className="my-4 border border-[#D8D5CE] dark:border-[#2A322A] bg-[#FAF9F6] dark:bg-[#191D19] p-2.5 sm:p-3 overflow-hidden">
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D8D5CE]/50 dark:border-[#2A322A]/60 font-mono text-[12px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-[#111111] dark:text-[#F5F3EE] font-medium">
                    <Smartphone size={12} className="text-[#005A36] dark:text-[#00A865]" />
                    <span>CIVIC CLIENT</span>
                  </span>
                  <span className="text-[#005A36] dark:text-[#00A865] font-semibold flex items-center gap-1">
                    <span>CLICK TO INSPECT</span>
                    <ArrowUpRight size={10} />
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {p3.screenshots?.map((ss, idx) => (
                    <div
                      key={ss.id}
                      onClick={() => openModal(p3.title, p3.screenshots!, idx, false)}
                      className="group/phone relative flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1 select-none"
                      role="button"
                      tabIndex={0}
                      aria-label={`Inspect ${ss.label} screenshot`}
                    >
                      <div className="relative rounded-[14px] border-[2px] border-[#1C201C] dark:border-[#2E372E] bg-[#111411] p-1 shadow-sm transition-all duration-300 group-hover/phone:border-[#005A36] dark:group-hover/phone:border-[#00A865] group-hover/phone:shadow-[0_4px_16px_rgba(0,90,54,0.2)] dark:group-hover/phone:shadow-[0_4px_16px_rgba(0,168,101,0.22)]">
                        <div className="w-4 h-0.5 bg-[#2C332C] dark:bg-[#445244] rounded-full mx-auto my-0.5" />

                        <div className="relative aspect-[9/20] overflow-hidden rounded-[9px] bg-[#E9E4D9]/40 dark:bg-[#1A201A]">
                          <img
                            src={ss.image}
                            alt={`${p3.title} - ${ss.label}`}
                            loading="lazy"
                            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/phone:scale-105"
                          />

                          <div className="absolute inset-0 bg-[#005A36]/15 dark:bg-[#00A865]/20 opacity-0 group-hover/phone:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <span className="p-1 rounded-full bg-[#FFFFFF]/90 dark:bg-[#191D19]/90 text-[#005A36] dark:text-[#00A865] shadow-xs">
                              <Maximize2 size={11} />
                            </span>
                          </div>
                        </div>

                        <div className="w-6 h-0.5 bg-[#2C332C] dark:bg-[#445244] rounded-full mx-auto my-0.5" />
                      </div>

                      <div className="mt-1.5 text-center">
                        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#005A36] dark:text-[#00A865] font-semibold truncate">
                          {ss.tag.split("//")[0].trim()}
                        </div>
                        <div className="font-sans text-[9px] sm:text-[10px] text-[#111111] dark:text-[#F5F3EE] truncate font-medium">
                          {ss.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {p3.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 font-mono text-[12px] border border-[#D8D5CE] dark:border-[#2A322A] bg-[#FAF9F6] dark:bg-[#232823] text-[#111111] dark:text-[#F5F3EE]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className="project-editorial-row border border-[#D8D5CE] dark:border-[#2A322A] bg-[#FFFFFF] dark:bg-[#1D211D] p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 hover:border-[#005A36] dark:hover:border-[#00A865]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CE]/60 dark:border-[#2A322A]/60 font-mono text-[14px] text-[#005A36] dark:text-[#00A865] font-semibold uppercase tracking-wider">
                <span>PROJECT // 04</span>
              </div>

              <div className="mt-4 mb-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] dark:text-[#F5F3EE] font-normal tracking-tight">
                  {p4.title}
                </h3>
                <div className="font-mono text-[12px] uppercase tracking-wider text-[#005A36] dark:text-[#00A865] mt-1">
                  {p4.tagline}
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed mt-3">
                {p4.description}
              </p>

              <div className="my-4 border border-[#D8D5CE] dark:border-[#2A322A] bg-[#FAF9F6] dark:bg-[#191D19] p-2.5 sm:p-3 overflow-hidden">
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D8D5CE]/50 dark:border-[#2A322A]/60 font-mono text-[12px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-[#111111] dark:text-[#F5F3EE] font-medium">
                    <Gamepad2 size={12} className="text-[#005A36] dark:text-[#00A865]" />
                    <span>2D GAME ENGINE</span>
                  </span>
                  <span className="text-[#005A36] dark:text-[#00A865] font-semibold flex items-center gap-1">
                    <span>INSPECT SCENE</span>
                    <ArrowUpRight size={10} />
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {p4.screenshots?.map((ss, idx) => (
                    <div
                      key={ss.id}
                      onClick={() => openModal(p4.title, p4.screenshots!, idx, true)}
                      className="group/scene relative rounded-lg border-2 border-[#1C201C] dark:border-[#2E372E] bg-[#111411] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#005A36] dark:hover:border-[#00A865] hover:shadow-[0_6px_20px_rgba(0,90,54,0.22)] dark:hover:shadow-[0_6px_20px_rgba(0,168,101,0.25)] hover:-translate-y-0.5"
                      role="button"
                      tabIndex={0}
                      aria-label={`Inspect ${ss.label} scene`}
                    >
                      <div className="flex items-center justify-between px-2.5 py-1 bg-[#171B17] border-b border-[#2A332A] font-mono text-[11px] select-none">
                        <span className="text-[#00A865] font-semibold">{ss.tag.split("//")[0].trim()}</span>
                        <span className="text-[#F5F3EE] truncate ml-1 text-[10px] font-sans">{ss.label}</span>
                      </div>

                      <div className="relative aspect-[16/9] overflow-hidden bg-[#241E2F]">
                        <img
                          src={ss.image}
                          alt={`${p4.title} - ${ss.label}`}
                          loading="lazy"
                          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/scene:scale-105"
                        />

                        <div className="absolute inset-0 bg-[#005A36]/15 dark:bg-[#00A865]/20 opacity-0 group-hover/scene:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <span className="p-1.5 rounded-full bg-[#FFFFFF]/90 dark:bg-[#191D19]/90 text-[#005A36] dark:text-[#00A865] shadow-xs">
                            <Maximize2 size={13} />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {p4.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 font-mono text-[12px] border border-[#D8D5CE] dark:border-[#2A322A] bg-[#FAF9F6] dark:bg-[#232823] text-[#111111] dark:text-[#F5F3EE]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Fullscreen Screenshot Lightbox Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#000000]/80 backdrop-blur-md transition-all duration-300"
          onClick={closeModal}
        >
          <div
            className={`relative w-full max-h-[94vh] flex flex-col items-center bg-[#FFFFFF] dark:bg-[#191D19] border border-[#D8D5CE] dark:border-[#2A322A] p-4 sm:p-6 shadow-2xl rounded-2xl ${
              activeModalProject.isLandscape ? "max-w-4xl" : "max-w-lg"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-[#D8D5CE]/60 dark:border-[#2A322A]/60 font-mono text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[#005A36] dark:text-[#00A865] font-semibold">
                  {activeModalProject.screenshots[activeModalProject.index].tag}
                </span>
                <span className="text-[#111111] dark:text-[#F5F3EE] font-sans font-medium">
                  {activeModalProject.screenshots[activeModalProject.index].label}
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
                onClick={prevModalScreenshot}
                className="absolute left-1 sm:left-2 z-10 p-2 sm:p-2.5 rounded-full bg-[#FFFFFF]/90 dark:bg-[#232823]/90 border border-[#D8D5CE] dark:border-[#2A322A] text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] shadow-md transition-all hover:scale-110 cursor-pointer"
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={20} />
              </button>

              <div
                className={`overflow-hidden rounded-[16px] border-[3px] border-[#1C201C] dark:border-[#2E372E] shadow-2xl bg-black ${
                  activeModalProject.isLandscape
                    ? "max-h-[72vh] aspect-[16/9] sm:aspect-[21/10] w-full"
                    : "max-h-[66vh] aspect-[9/20]"
                }`}
              >
                <img
                  src={activeModalProject.screenshots[activeModalProject.index].image}
                  alt={activeModalProject.screenshots[activeModalProject.index].label}
                  className="w-full h-full object-contain"
                />
              </div>

              <button
                type="button"
                onClick={nextModalScreenshot}
                className="absolute right-1 sm:right-2 z-10 p-2 sm:p-2.5 rounded-full bg-[#FFFFFF]/90 dark:bg-[#232823]/90 border border-[#D8D5CE] dark:border-[#2A322A] text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] shadow-md transition-all hover:scale-110 cursor-pointer"
                aria-label="Next screenshot"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Bottom Screen Switcher Dots / Pills */}
            <div className="w-full pt-3 mt-2 border-t border-[#D8D5CE]/50 dark:border-[#2A322A]/50 flex items-center justify-between font-mono text-[12px] text-[#5F5F5A] dark:text-[#9E9E98]">
              <span>VIEW {activeModalProject.index + 1} OF {activeModalProject.screenshots.length}</span>
              <div className="flex items-center gap-1.5">
                {activeModalProject.screenshots.map((s, sIdx) => (
                  <button
                    key={s.id}
                    onClick={() =>
                      setActiveModalProject((prev) =>
                        prev ? { ...prev, index: sIdx } : null
                      )
                    }
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      sIdx === activeModalProject.index
                        ? "w-6 bg-[#005A36] dark:bg-[#00A865]"
                        : "w-2 bg-[#D8D5CE] dark:bg-[#2A322A] hover:bg-[#005A36]/50"
                    }`}
                    aria-label={`Jump to view ${sIdx + 1}`}
                  />
                ))}
              </div>
              <span className="hidden sm:inline">ARROWS OR ESC</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

