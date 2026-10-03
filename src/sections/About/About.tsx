import React, { useRef, useEffect } from "react";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Terminal, Cpu, Layers } from "lucide-react";

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".about-label",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      )
        .fromTo(
          ".about-heading-line",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.15 },
          "-=0.2"
        )
        .fromTo(
          ".about-content-p",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
          "-=0.4"
        )
        .fromTo(
          ".about-card",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-28 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-[#D8D5CE] dark:border-[#272B26]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Label & Heading */}
        <div className="lg:col-span-6">
          <SectionLabel label="01 — ABOUT" className="about-label mb-8" />

          <h2
            ref={headingRef}
            className="font-serif text-3xl sm:text-5xl lg:text-5xl font-medium tracking-tight text-[#111111] dark:text-[#F5F3EE] leading-[1.15]"
          >
            <span className="about-heading-line block">
              I LIKE BUILDING THINGS
            </span>
            <span className="about-heading-line block text-[#005A36] dark:text-[#00A865]">
              AND UNDERSTANDING
            </span>
            <span className="about-heading-line block">
              HOW THEY WORK.
            </span>
          </h2>

          {/* Core Focus Badges */}
          <div className="mt-12 pt-8 border-t border-[#D8D5CE]/60 dark:border-[#272B26]/60 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="about-card p-4 border border-[#D8D5CE] dark:border-[#272B26] bg-[#FAF9F6] dark:bg-[#141714] transition-colors hover:border-[#005A36] dark:hover:border-[#00A865]">
              <Terminal size={18} className="text-[#005A36] dark:text-[#00A865] mb-3" />
              <div className="font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#F5F3EE] font-semibold">
                FULL-STACK
              </div>
              <div className="font-sans text-xs text-[#5F5F5A] dark:text-[#9E9E98] mt-1">
                From DB queries to UI state
              </div>
            </div>

            <div className="about-card p-4 border border-[#D8D5CE] dark:border-[#272B26] bg-[#FAF9F6] dark:bg-[#141714] transition-colors hover:border-[#005A36] dark:hover:border-[#00A865]">
              <Layers size={18} className="text-[#005A36] dark:text-[#00A865] mb-3" />
              <div className="font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#F5F3EE] font-semibold">
                MOBILE APPS
              </div>
              <div className="font-sans text-xs text-[#5F5F5A] dark:text-[#9E9E98] mt-1">
                Flutter cross-platform logic
              </div>
            </div>

            <div className="about-card p-4 border border-[#D8D5CE] dark:border-[#272B26] bg-[#FAF9F6] dark:bg-[#141714] transition-colors hover:border-[#005A36] dark:hover:border-[#00A865]">
              <Cpu size={18} className="text-[#005A36] dark:text-[#00A865] mb-3" />
              <div className="font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#F5F3EE] font-semibold">
                AI SYSTEMS
              </div>
              <div className="font-sans text-xs text-[#5F5F5A] dark:text-[#9E9E98] mt-1">
                Conversational & voice workflows
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio Prose & Principles */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:pl-6">
          <p className="about-content-p font-sans text-lg sm:text-xl text-[#111111] dark:text-[#F5F3EE] font-normal leading-relaxed">
            I'm Sayan Biswas, a developer focused primarily on Flutter and full-stack development.
          </p>

          <p className="about-content-p font-sans text-base text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed">
            I enjoy building products from the interface all the way to the backend, experimenting with new technologies, and learning by actually creating things.
          </p>

          <p className="about-content-p font-sans text-base text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed">
            My current interests include mobile development, backend systems, APIs, AI-powered applications, and developer tooling.
          </p>

          {/* Technical Spec Quote Box */}
          <div className="about-content-p mt-6 p-6 border-l-2 border-[#005A36] dark:border-[#00A865] bg-[#E9E4D9]/30 dark:bg-[#1A201A]/50">
            <div className="font-mono text-xs text-[#005A36] dark:text-[#00A865] tracking-wider uppercase mb-1">
              PHILOSOPHY // ENGINEERING PRINCIPLE
            </div>
            <p className="font-serif italic text-base text-[#111111] dark:text-[#F5F3EE]">
              "Clarity over complexity. Build the smallest functional kernel, measure its real-world behavior, and refine through continuous iterations."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
