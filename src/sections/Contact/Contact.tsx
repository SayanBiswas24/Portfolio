import React, { useRef, useEffect } from "react";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { personalInfo } from "@/data/personal";
import { Button } from "@/components/Button/Button";
import { gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Mail, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons/SocialIcons";

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { y: 40, opacity: 0 },
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
      className="py-28 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-[#D8D5CE]"
    >
      <div className="contact-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Heading (7 Cols) */}
        <div className="lg:col-span-7">
          <SectionLabel label="07 — CONTACT" className="mb-6" />

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#111111] leading-[1.08] mb-8">
            <span className="block">LET'S BUILD</span>
            <span className="block text-[#005A36]">SOMETHING</span>
            <span className="block">USEFUL.</span>
          </h2>

          <p className="font-sans text-lg sm:text-xl text-[#5F5F5A] leading-relaxed max-w-xl">
            Have a project, opportunity, collaboration idea, or just want to talk about technology?
          </p>

          <p className="font-sans text-base text-[#5F5F5A] leading-relaxed max-w-xl mt-3">
            I'd be happy to hear from you.
          </p>

          {/* Direct CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              href={emailHref}
              showArrow={true}
              id="contact-email-btn"
            >
              EMAIL ME
            </Button>

            <Button
              variant="secondary"
              href={personalInfo.github}
              target="_blank"
              showArrow={true}
              id="contact-github-btn"
            >
              GITHUB
            </Button>

            <Button
              variant="secondary"
              href={personalInfo.linkedin}
              target="_blank"
              showArrow={true}
              id="contact-linkedin-btn"
            >
              LINKEDIN
            </Button>
          </div>
        </div>

        {/* Right Column: Direct Channels & Information Card (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="border border-[#D8D5CE] bg-[#FAF9F6] p-8 shadow-xs">
            <div className="flex items-center gap-2 pb-4 border-b border-[#D8D5CE]/60 text-[#005A36] font-mono text-xs uppercase tracking-widest font-semibold">
              <MessageSquare size={16} />
              <span>DIRECT INQUIRIES & DISPATCH</span>
            </div>

            <div className="mt-6 space-y-6">
              {/* Email channel */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-[#D8D5CE] bg-[#F5F3EE] flex items-center justify-center shrink-0 text-[#005A36]">
                  <Mail size={14} />
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#5F5F5A]">
                    ELECTRONIC MAIL
                  </div>
                  <a
                    href={emailHref}
                    className="font-mono text-sm text-[#111111] hover:text-[#005A36] transition-colors break-all"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              {/* GitHub channel */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-[#D8D5CE] bg-[#F5F3EE] flex items-center justify-center shrink-0 text-[#005A36]">
                  <GithubIcon size={14} />
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#5F5F5A]">
                    SOURCE CODE REPOSITORY
                  </div>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-[#111111] hover:text-[#005A36] transition-colors"
                  >
                    {personalInfo.github}
                  </a>
                </div>
              </div>

              {/* LinkedIn channel */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-[#D8D5CE] bg-[#F5F3EE] flex items-center justify-center shrink-0 text-[#005A36]">
                  <LinkedinIcon size={14} />
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#5F5F5A]">
                    PROFESSIONAL NETWORK
                  </div>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-[#111111] hover:text-[#005A36] transition-colors"
                  >
                    {personalInfo.linkedin}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#D8D5CE]/60 font-mono text-[11px] text-[#5F5F5A]">
              Response latency typically &lt; 24 business hours.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
