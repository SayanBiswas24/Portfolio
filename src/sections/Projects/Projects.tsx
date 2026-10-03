import React, { useRef, useEffect } from "react";
import { projects } from "@/data/projects";
import { gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight } from "lucide-react";

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

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
      className="py-28 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-[#D8D5CE] dark:border-[#212621]"
    >
      {/* Header */}
      <div className="projects-header-block mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D8D5CE] dark:border-[#212621]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#005A36] dark:text-[#00A865] font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#005A36] dark:bg-[#00A865]" />
            <span>03 // SELECTED WORK</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#111111] dark:text-[#F5F3EE]">
            Things I've Built
          </h2>
        </div>
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] max-w-sm text-left md:text-right">
          04 PROJECTS ARCHIVED // FLUTTER, WEB & SYSTEMS
        </p>
      </div>

      <div className="projects-list-container space-y-12">
        {/* ===================== PROJECT 01: KAUSHAL SAATHI ===================== */}
        <article className="project-editorial-row border border-[#D8D5CE] dark:border-[#212621] bg-[#FFFFFF] dark:bg-[#111411] p-6 lg:p-10 transition-colors duration-300 hover:border-[#005A36] dark:hover:border-[#00A865]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CE]/60 dark:border-[#212621]/60 font-mono text-[11px] text-[#005A36] dark:text-[#00A865] font-semibold uppercase tracking-wider">
                  <span>PROJECT // 01</span>
                  <span className="text-[#5F5F5A] dark:text-[#9E9E98]">
                    FEATURED SYSTEM // 2026
                  </span>
                </div>

                <div className="mt-5 mb-3">
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#111111] dark:text-[#F5F3EE] font-normal tracking-tight">
                    {p1.title}
                  </h3>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#005A36] dark:text-[#00A865] mt-1.5 font-medium">
                    {p1.tagline}
                  </div>
                </div>

                <p className="font-sans text-sm sm:text-base text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed mt-4">
                  {p1.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {p1.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 font-mono text-[11px] border border-[#D8D5CE] dark:border-[#212621] bg-[#FAF9F6] dark:bg-[#161A16] text-[#111111] dark:text-[#F5F3EE] rounded-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-5 border-t border-[#D8D5CE]/50 dark:border-[#212621]/60 flex items-center justify-between font-mono text-xs">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-[#005A36] dark:text-[#00A865] hover:underline uppercase tracking-wider font-semibold group"
                >
                  <span>EXPLORE PROJECT</span>
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <span className="text-[#5F5F5A] dark:text-[#9E9E98] text-[11px]">
                  VERIFIED ARCHIVE
                </span>
              </div>
            </div>

            {/* Right Blueprint HUD Frame */}
            <div className="lg:col-span-6 border border-[#D8D5CE] dark:border-[#212621] bg-[#FAF9F6] dark:bg-[#0E120E] flex flex-col justify-between overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#D8D5CE] dark:border-[#212621] font-mono text-[10px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider bg-[#FFFFFF] dark:bg-[#121612]">
                <span>FIG. 01 // SYSTEM ARCHITECTURE</span>
                <span className="text-[#005A36] dark:text-[#00A865]">STATUS: OK</span>
              </div>

              {/* Blueprint Graphic */}
              <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center p-3">
                <img
                  src={p1.image}
                  alt={p1.title}
                  className="w-full h-full object-cover rounded-xs"
                />
              </div>

              <div className="px-4 py-2 border-t border-[#D8D5CE] dark:border-[#212621] font-mono text-[9px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider bg-[#FFFFFF] dark:bg-[#121612] text-center">
                AUDIO PIPELINE: READY // BHASHINI TTS/STT ENGINE
              </div>
            </div>
          </div>
        </article>

        {/* ===================== PROJECT 02: AI PHONE ASSISTANT (REVERSED) ===================== */}
        <article className="project-editorial-row border border-[#D8D5CE] dark:border-[#212621] bg-[#FFFFFF] dark:bg-[#111411] p-6 lg:p-10 transition-colors duration-300 hover:border-[#005A36] dark:hover:border-[#00A865]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Blueprint HUD Frame */}
            <div className="lg:col-span-6 lg:order-1 border border-[#D8D5CE] dark:border-[#212621] bg-[#FAF9F6] dark:bg-[#0E120E] flex flex-col justify-between overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#D8D5CE] dark:border-[#212621] font-mono text-[10px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider bg-[#FFFFFF] dark:bg-[#121612]">
                <span>FIG. 02 // AUDIO INTEGRATION</span>
                <span className="text-[#005A36] dark:text-[#00A865]">VOICE SYNTHESIS</span>
              </div>

              {/* Sound Waveform Visual Graphic */}
              <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center p-3">
                <img
                  src={p2.image}
                  alt={p2.title}
                  className="w-full h-full object-cover rounded-xs"
                />
              </div>

              <div className="px-4 py-2 border-t border-[#D8D5CE] dark:border-[#212621] font-mono text-[9px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider bg-[#FFFFFF] dark:bg-[#121612] text-center">
                SPEECH-TO-TEXT // LLM INTENT PARSER // CALL ROUTER
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-6 lg:order-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CE]/60 dark:border-[#212621]/60 font-mono text-[11px] text-[#005A36] dark:text-[#00A865] font-semibold uppercase tracking-wider">
                  <span>PROJECT // 02</span>
                  <span className="text-[#5F5F5A] dark:text-[#9E9E98]">
                    VOICE & AUTOMATION
                  </span>
                </div>

                <div className="mt-5 mb-3">
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#111111] dark:text-[#F5F3EE] font-normal tracking-tight">
                    {p2.title}
                  </h3>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#005A36] dark:text-[#00A865] mt-1.5 font-medium">
                    {p2.tagline}
                  </div>
                </div>

                <p className="font-sans text-sm sm:text-base text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed mt-4">
                  {p2.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {p2.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 font-mono text-[11px] border border-[#D8D5CE] dark:border-[#212621] bg-[#FAF9F6] dark:bg-[#161A16] text-[#111111] dark:text-[#F5F3EE] rounded-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-5 border-t border-[#D8D5CE]/50 dark:border-[#212621]/60 flex items-center justify-between font-mono text-xs">
                <span className="text-[#005A36] dark:text-[#00A865] font-semibold tracking-wider uppercase">
                  STATUS: PRODUCTION
                </span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] uppercase tracking-wider font-semibold group"
                >
                  <span>CASE STUDY</span>
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* ===================== PROJECTS 03 & 04 (2 COLUMNS SIDE-BY-SIDE) ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project 03: Nagar Alert Hub */}
          <article className="project-editorial-row border border-[#D8D5CE] dark:border-[#212621] bg-[#FFFFFF] dark:bg-[#111411] p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 hover:border-[#005A36] dark:hover:border-[#00A865]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CE]/60 dark:border-[#212621]/60 font-mono text-[11px] text-[#005A36] dark:text-[#00A865] font-semibold uppercase tracking-wider">
                <span>PROJECT // 03</span>
                <span className="text-[#5F5F5A] dark:text-[#9E9E98]">
                  CIVIC DISRUPTION
                </span>
              </div>

              <div className="mt-4 mb-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] dark:text-[#F5F3EE] font-normal tracking-tight">
                  {p3.title}
                </h3>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#005A36] dark:text-[#00A865] mt-1">
                  {p3.tagline}
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed mt-3">
                {p3.description}
              </p>

              {/* Graphic container */}
              <div className="my-5 border border-[#D8D5CE] dark:border-[#212621] bg-[#FAF9F6] dark:bg-[#0E120E] p-2 overflow-hidden aspect-[16/9]">
                <img
                  src={p3.image}
                  alt={p3.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {p3.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 font-mono text-[10px] border border-[#D8D5CE] dark:border-[#212621] bg-[#FAF9F6] dark:bg-[#161A16] text-[#111111] dark:text-[#F5F3EE]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D8D5CE]/50 dark:border-[#212621]/60 flex items-center justify-between font-mono text-xs">
              <span className="text-[#5F5F5A] dark:text-[#9E9E98] text-[10px]">
                RELEASE // 2026
              </span>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-[#005A36] dark:text-[#00A865] hover:underline uppercase tracking-wider font-semibold"
              >
                <span>VIEW PROJECT</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </article>

          {/* Project 04: Kings & Pigs */}
          <article className="project-editorial-row border border-[#D8D5CE] dark:border-[#212621] bg-[#FFFFFF] dark:bg-[#111411] p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 hover:border-[#005A36] dark:hover:border-[#00A865]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CE]/60 dark:border-[#212621]/60 font-mono text-[11px] text-[#005A36] dark:text-[#00A865] font-semibold uppercase tracking-wider">
                <span>PROJECT // 04</span>
                <span className="text-[#5F5F5A] dark:text-[#9E9E98]">
                  INTERACTIVE ENGINE
                </span>
              </div>

              <div className="mt-4 mb-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] dark:text-[#F5F3EE] font-normal tracking-tight">
                  {p4.title}
                </h3>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#005A36] dark:text-[#00A865] mt-1">
                  {p4.tagline}
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed mt-3">
                {p4.description}
              </p>

              {/* Graphic container */}
              <div className="my-5 border border-[#D8D5CE] dark:border-[#212621] bg-[#FAF9F6] dark:bg-[#0E120E] p-2 overflow-hidden aspect-[16/9]">
                <img
                  src={p4.image}
                  alt={p4.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {p4.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 font-mono text-[10px] border border-[#D8D5CE] dark:border-[#212621] bg-[#FAF9F6] dark:bg-[#161A16] text-[#111111] dark:text-[#F5F3EE]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D8D5CE]/50 dark:border-[#212621]/60 flex items-center justify-between font-mono text-xs">
              <span className="text-[#5F5F5A] dark:text-[#9E9E98] text-[10px]">
                FRAMEWORK // FLUTTER GAME ENGINE
              </span>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-[#005A36] dark:text-[#00A865] hover:underline uppercase tracking-wider font-semibold"
              >
                <span>ONLINE DEMO</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
