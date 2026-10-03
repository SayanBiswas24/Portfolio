import React, { useRef, useEffect } from "react";
import { gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
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
        ".about-header-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }
      )
        .fromTo(
          ".about-heading",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.2"
        )
        .fromTo(
          ".about-feature-box",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          ".about-prose",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 sm:py-28 px-4 sm:px-6 max-w-[1520px] mx-auto w-full border-t border-[#D8D5CE] dark:border-[#212621]"
    >
      <div className="about-header-item flex items-center justify-between pb-6 mb-12 border-b border-[#D8D5CE] dark:border-[#212621] font-mono text-sm uppercase tracking-wider">
        <div className="flex items-center gap-2 text-[#005A36] dark:text-[#00A865] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#005A36] dark:bg-[#00A865]" />
          <span>01 // ABOUT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <h2 className="about-heading font-serif text-4xl sm:text-5xl lg:text-5xl font-normal tracking-tight text-[#111111] dark:text-[#F5F3EE] leading-[1.14] mb-10">
              <span className="block">I like building things</span>
              <span className="block">and understanding</span>
              <span className="block italic text-[#005A36] dark:text-[#00A865]">
                how they truly work.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="about-feature-box p-4 border border-[#D8D5CE] dark:border-[#212621] bg-[#FFFFFF] dark:bg-[#111411] transition-all duration-200 hover:border-[#005A36] dark:hover:border-[#00A865] hover:bg-[#FAF9F5] dark:hover:bg-[#161B16] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_0_15px_rgba(0,168,101,0.06)]">
              <div className="font-mono text-sm font-semibold text-[#005A36] dark:text-[#00A865] mb-2">
                01 — FULL-STACK
              </div>
              <div className="font-sans text-xs text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed">
                End-to-End System Development
              </div>
            </div>

            <div className="about-feature-box p-4 border border-[#D8D5CE] dark:border-[#212621] bg-[#FFFFFF] dark:bg-[#111411] transition-all duration-200 hover:border-[#005A36] dark:hover:border-[#00A865] hover:bg-[#FAF9F5] dark:hover:bg-[#161B16] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_0_15px_rgba(0,168,101,0.06)]">
              <div className="font-mono text-sm font-semibold text-[#005A36] dark:text-[#00A865] mb-2">
                02 — MOBILE
              </div>
              <div className="font-sans text-xs text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed">
                Cross-platform with native performance
              </div>
            </div>

            <div className="about-feature-box p-4 border border-[#D8D5CE] dark:border-[#212621] bg-[#FFFFFF] dark:bg-[#111411] transition-all duration-200 hover:border-[#005A36] dark:hover:border-[#00A865] hover:bg-[#FAF9F5] dark:hover:bg-[#161B16] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_0_15px_rgba(0,168,101,0.06)]">
              <div className="font-mono text-sm font-semibold text-[#005A36] dark:text-[#00A865] mb-2">
                03 — SYSTEMS
              </div>
              <div className="font-sans text-xs text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed">
                Scalable architectures & API design
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio Prose & Engineering Principle Quote */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <p className="about-prose font-sans text-base sm:text-lg text-[#111111] dark:text-[#F5F3EE] leading-relaxed">
            I'm Sayan Biswas, a software developer focused on Flutter, full-stack systems, clean architecture, and decentralized applications. Passionate about building modern, intuitive products that solve real-world problems. Transitioning complex ideas into working software, with practical logic, clean code, and user-centric execution.
          </p>

          <p className="about-prose font-sans text-sm sm:text-base text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed">
            I approach code with an engineer's mindset: build the smallest functional kernel, measure its real-world behavior, and refine through continuous iterations. In addition to mobile and web platforms, I actively explore smart contracts and distributed ledger technologies across Ethereum and Algorand.
          </p>

          {/* Principle Box */}
          <div className="about-prose p-6 border-l-2 border-[#005A36] dark:border-[#00A865] bg-[#FFFFFF] dark:bg-[#111411] border border-t-[#D8D5CE] border-r-[#D8D5CE] border-b-[#D8D5CE] dark:border-t-[#212621] dark:border-r-[#212621] dark:border-b-[#212621]">
            <div className="font-mono text-[12px] text-[#005A36] dark:text-[#00A865] uppercase tracking-wider font-semibold mb-2">
              ENGINEERING PRINCIPLE
            </div>
            <p className="font-serif italic text-base text-[#111111] dark:text-[#F5F3EE] leading-relaxed mb-3">
              "Clarity over complexity. Build the smallest functional kernel, measure its real-world behavior, and refine through continuous iterations."
            </p>
            <div className="font-mono text-[12px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider">
              — CORE WORKING PHILOSOPHY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
