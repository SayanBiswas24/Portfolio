import React, { useRef, useEffect } from "react";
import { personalInfo } from "@/data/personal";
import { Button } from "@/components/Button/Button";
import { gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content-block",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const emailHref = personalInfo.email.includes("@")
    ? `mailto:${personalInfo.email}`
    : `mailto:contact@sayanbiswas.dev`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 sm:py-28 px-4 sm:px-6 max-w-[1520px] mx-auto w-full border-t border-[#D8D5CE] dark:border-[#212621]"
    >
      <div className="contact-content-block grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-[#005A36] dark:text-[#00A865] font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#005A36] dark:bg-[#00A865]" />
            <span>06 // CONTACT</span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#111111] dark:text-[#F5F3EE] leading-[1.08] mb-6">
            <span className="block">Let's build something</span>
            <span className="block italic text-[#005A36] dark:text-[#00A865]">
              useful.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed max-w-xl mb-10">
            Have a project, opportunity, collaboration idea, or just want to talk about technology? Reach out directly via email or social links.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <Button
              variant="primary"
              href={emailHref}
              showArrow={true}
              arrowDirection="right"
              id="contact-email-btn"
            >
              SEND DIRECT EMAIL
            </Button>

            <Button
              variant="secondary"
              href={personalInfo.github}
              target="_blank"
              showArrow={true}
              arrowDirection="up-right"
              id="contact-github-btn"
            >
              GITHUB
            </Button>

            <Button
              variant="secondary"
              href={personalInfo.linkedin}
              target="_blank"
              showArrow={true}
              arrowDirection="up-right"
              id="contact-linkedin-btn"
            >
              LINKEDIN
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border border-[#D8D5CE] dark:border-[#212621] bg-[#FFFFFF] dark:bg-[#111411] p-6 sm:p-8 shadow-xs transition-all duration-300 hover:border-[#005A36]/60 dark:hover:border-[#00A865]/60 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_24px_rgba(0,168,101,0.08)]">
            <div className="flex items-center justify-between pb-4 border-b border-[#D8D5CE]/60 dark:border-[#212621]/60 font-mono text-sm uppercase tracking-wider font-semibold">
              <span className="text-[#111111] dark:text-[#F5F3EE]">
                CONTACT DETAILS
              </span>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <div className="font-mono text-[12px] uppercase tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] mb-1">
                  EMAIL
                </div>
                <a
                  href={emailHref}
                  className="inline-flex items-center font-mono text-base text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] px-2 py-1 -ml-2 rounded-md hover:bg-[#005A36]/8 dark:hover:bg-[#00A865]/12 transition-all duration-200 break-all"
                >
                  {personalInfo.email}
                </a>
              </div>

              <div>
                <div className="font-mono text-[12px] uppercase tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] mb-1">
                  GITHUB
                </div>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-mono text-base text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] px-2 py-1 -ml-2 rounded-md hover:bg-[#005A36]/8 dark:hover:bg-[#00A865]/12 transition-all duration-200 break-all"
                >
                  {personalInfo.github.replace(/^https?:\/\//, "")}
                </a>
              </div>

              <div>
                <div className="font-mono text-[12px] uppercase tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] mb-1">
                  LINKEDIN
                </div>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-mono text-base text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] px-2 py-1 -ml-2 rounded-md hover:bg-[#005A36]/8 dark:hover:bg-[#00A865]/12 transition-all duration-200 break-all"
                >
                  {personalInfo.linkedin.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
