import React, { useRef, useEffect } from "react";
import { personalInfo } from "@/data/personal";
import { Button } from "@/components/Button/Button";
import { HeroNetwork } from "@/three/HeroNetwork/HeroNetwork";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ScrollTrigger } from "@/animations/gsapInit";
import { ArrowDown } from "lucide-react";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mouse = useMousePosition();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Entrance animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-meta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2 }
      )
        .fromTo(
          ".hero-heading-line",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, stagger: 0.15 },
          "-=0.4"
        )
        .fromTo(
          ".hero-description",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          visualRef.current,
          { scale: 0.88, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2 },
          "-=0.8"
        );

      // 2. Hero exit scroll animation
      if (containerRef.current && contentRef.current && visualRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(contentRef.current, {
              y: -p * 60,
              opacity: 1 - p * 0.75,
            });
            gsap.set(visualRef.current, {
              y: -p * 50,
              rotationZ: p * 12,
              opacity: 1 - p * 0.6,
            });
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        {/* Left Typography Column: 55-60% */}
        <div ref={contentRef} className="lg:col-span-7 flex flex-col z-10">
          {/* Header Metadata */}
          <div className="hero-meta flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#005A36] dark:text-[#00A865] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#005A36] dark:bg-[#00A865] animate-pulse" />
            <span className="font-semibold">{personalInfo.name.toUpperCase()}</span>
            <span className="text-[#D8D5CE] dark:text-[#272B26]">/</span>
            <span className="text-[#5F5F5A] dark:text-[#9E9E98]">{personalInfo.role.toUpperCase()}</span>
          </div>

          {/* Main Editorial Heading */}
          <h1
            ref={headingRef}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#111111] dark:text-[#F5F3EE] leading-[1.08] my-4"
          >
            <span className="hero-heading-line block overflow-hidden">
              I BUILD SOFTWARE
            </span>
            <span className="hero-heading-line block overflow-hidden text-[#005A36] dark:text-[#00A865]">
              THAT SOLVES
            </span>
            <span className="hero-heading-line block overflow-hidden">
              REAL PROBLEMS.
            </span>
          </h1>

          {/* Description */}
          <p className="hero-description font-sans text-base sm:text-lg text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed max-w-xl mt-4 mb-8">
            {personalInfo.shortBio}
          </p>

          {/* Call to Actions */}
          <div className="hero-cta flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              onClick={scrollToWork}
              showArrow={false}
              id="hero-view-work-btn"
            >
              VIEW MY WORK
            </Button>
            <Button
              variant="secondary"
              href={personalInfo.github}
              target="_blank"
              showArrow={true}
              id="hero-github-btn"
            >
              GITHUB
            </Button>
          </div>

          {/* Technical Status Pill */}
          <div className="hero-meta mt-10 pt-6 border-t border-[#D8D5CE]/60 dark:border-[#272B26]/60 flex items-center gap-4 font-mono text-[11px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider">
            <span className="inline-flex items-center gap-1.5 text-[#005A36] dark:text-[#00A865]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#005A36] dark:bg-[#00A865]" />
              AVAILABILITY: OPEN
            </span>
            <span className="text-[#D8D5CE] dark:text-[#272B26]">•</span>
            <span>STACK: FLUTTER / NODE / TYPESCRIPT</span>
          </div>
        </div>

        {/* Right 3D Object Column: 40-45% */}
        <div
          ref={visualRef}
          className="lg:col-span-5 flex items-center justify-center relative w-full h-[320px] sm:h-[400px] lg:h-[500px]"
        >
          {/* Subtle background guide box */}
          <div className="absolute inset-2 border border-[#D8D5CE]/40 dark:border-[#272B26]/60 pointer-events-none rounded-xs hidden sm:block" />
          <div className="absolute top-4 left-4 font-mono text-[9px] text-[#5F5F5A]/50 dark:text-[#9E9E98]/50 uppercase tracking-widest pointer-events-none">
            3D.NODE.NETWORK // v1.0
          </div>
          <HeroNetwork mouse={mouse} />
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex items-center justify-between pt-8 border-t border-[#D8D5CE]/50 dark:border-[#272B26]/50 font-mono text-[10px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider select-none">
        <span className="hidden sm:inline">COORDINATES: LAT 22.57° N / LON 88.36° E</span>
        <button
          onClick={scrollToWork}
          className="flex items-center gap-2 hover:text-[#005A36] dark:hover:text-[#00A865] transition-colors mx-auto sm:mx-0 group cursor-pointer"
          aria-label="Scroll down to explore work"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={12} className="transition-transform group-hover:translate-y-1" />
        </button>
        <span className="hidden sm:inline">INDEX // 2026 ARCHIVE</span>
      </div>
    </section>
  );
};
