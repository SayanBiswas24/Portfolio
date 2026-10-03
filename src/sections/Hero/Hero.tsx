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
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-meta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2 }
      )
        .fromTo(
          ".hero-heading-line",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
          "-=0.3"
        )
        .fromTo(
          ".hero-description",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          visualRef.current,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.1 },
          "-=0.7"
        );

      if (containerRef.current && contentRef.current && visualRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(contentRef.current, {
              y: -p * 50,
              opacity: 1 - p * 0.75,
            });
            gsap.set(visualRef.current, {
              y: -p * 40,
              opacity: 1 - p * 0.6,
            });
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-10 px-4 sm:px-6 max-w-[1520px] mx-auto w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto py-8">
        {/* Left Column: Typography */}
        <div ref={contentRef} className="lg:col-span-7 flex flex-col z-10">
          {/* Metadata pill badge */}
          <div className="hero-meta inline-flex items-center gap-2 font-mono text-[14px] uppercase tracking-wider text-[#005A36] dark:text-[#00A865] mb-5">
            <span className="w-1.5 h-1.5 bg-[#005A36] dark:bg-[#00A865] rounded-xs" />
            <span className="font-semibold">
              PERSONAL PORTFOLIO
            </span>
          </div>

          <h1
            ref={headingRef}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#111111] dark:text-[#F5F3EE] leading-[1.08] mb-6"
          >
            <span className="hero-heading-line block">
              I build software
            </span>
            <span className="hero-heading-line block italic font-normal text-[#005A36] dark:text-[#00A865]">
              that solves
            </span>
            <span className="hero-heading-line block">
              real problems.
            </span>
          </h1>

          <p className="hero-description font-sans text-base sm:text-lg text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed max-w-xl mb-9">
            Flutter and Full-Stack developer focused on building durable, scalable systems, intuitive digital products, and decentralized architectures. Bringing analytical rigor and craftsmanship to every product build.
          </p>

          <div className="hero-cta flex flex-wrap items-center gap-3.5">
            <Button
              variant="primary"
              onClick={scrollToContact}
              showArrow={true}
              arrowDirection="right"
              id="hero-get-in-touch-btn"
            >
              GET IN TOUCH
            </Button>

            <Button
              variant="secondary"
              href={personalInfo.github}
              target="_blank"
              showArrow={true}
              arrowDirection="up-right"
              id="hero-github-btn"
            >
              GITHUB
            </Button>

            <Button
              variant="secondary"
              href={personalInfo.linkedin}
              target="_blank"
              showArrow={true}
              arrowDirection="up-right"
              id="hero-linkedin-btn"
            >
              LINKEDIN
            </Button>
          </div>
        </div>

        <div
          ref={visualRef}
          className="lg:col-span-5 relative w-full border border-[#D8D5CE] dark:border-[#212621] bg-[#FFFFFF] dark:bg-[#0E120E] shadow-xs flex flex-col justify-between overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#D8D5CE] dark:border-[#212621] font-mono text-[13px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider select-none bg-[#FAF9F6] dark:bg-[#121612]">
            <span className="flex items-center gap-1.5 text-[#111111] dark:text-[#F5F3EE] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#005A36] dark:bg-[#00A865]" />
              INTERACTIVE SYSTEM GRAPH
            </span>
          </div>

          <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[400px]">
            <HeroNetwork mouse={mouse} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#D8D5CE] dark:border-[#212621] font-mono text-[13px] sm:text-[14px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider select-none">
        <div className="text-left">
          AVAILABLE FOR NEW ROLES
        </div>
        <div className="text-center">
          <button
            onClick={scrollToWork}
            className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[#5F5F5A] dark:text-[#9E9E98] hover:text-[#005A36] dark:hover:text-[#00A865] hover:bg-[#005A36]/8 dark:hover:bg-[#00A865]/12 transition-all duration-200 cursor-pointer"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={11} className="transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
        <div className="text-right text-[#005A36] dark:text-[#00A865] font-medium">
          INDIA
        </div>
      </div>
    </section>
  );
};
