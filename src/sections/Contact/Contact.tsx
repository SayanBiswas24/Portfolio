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
      className="py-28 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-[#D8D5CE] dark:border-[#212621]"
    >
      <div className="contact-content-block grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#005A36] dark:text-[#00A865] font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#005A36] dark:bg-[#00A865]" />
            <span>06 // DISPATCH // INQUIRY</span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#111111] dark:text-[#F5F3EE] leading-[1.08] mb-6">
            <span className="block">Let's build something</span>
            <span className="block italic text-[#005A36] dark:text-[#00A865]">
              useful.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#5F5F5A] dark:text-[#9E9E98] leading-relaxed max-w-xl mb-10">
            Have a project, opportunity, collaboration idea, or just want to talk about technology? Reach out directly via dispatch or electronic mail.
          </p>

          {/* CTA Pill Buttons matching screenshot */}
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

        {/* Right Column: Direct Dispatch Desk Card */}
        <div className="lg:col-span-5">
          <div className="border border-[#D8D5CE] dark:border-[#212621] bg-[#FFFFFF] dark:bg-[#111411] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#D8D5CE]/60 dark:border-[#212621]/60 font-mono text-xs uppercase tracking-wider font-semibold">
              <span className="text-[#111111] dark:text-[#F5F3EE]">
                DIRECT DISPATCH DESK
              </span>
              <span className="text-[#005A36] dark:text-[#00A865]">
                STATUS: OPEN
              </span>
            </div>

            <div className="mt-6 space-y-6">
              {/* Channel 1 */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] mb-1">
                  ELECTRONIC MAIL
                </div>
                <a
                  href={emailHref}
                  className="font-mono text-sm text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] transition-colors break-all"
                >
                  {personalInfo.email}
                </a>
              </div>

              {/* Channel 2 */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] mb-1">
                  SOURCE REPOSITORY
                </div>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] transition-colors"
                >
                  {personalInfo.github}
                </a>
              </div>

              {/* Channel 3 */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] mb-1">
                  PROFESSIONAL NETWORK
                </div>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] transition-colors"
                >
                  {personalInfo.linkedin}
                </a>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#D8D5CE]/50 dark:border-[#212621]/60 flex items-center justify-between font-mono text-[10px] text-[#5F5F5A] dark:text-[#9E9E98] uppercase tracking-wider">
              <span>RESPONSE TIME</span>
              <span className="text-[#005A36] dark:text-[#00A865] font-semibold">
                &lt; 24 HOURS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
