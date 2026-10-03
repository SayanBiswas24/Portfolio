import React, { useRef, useEffect } from "react";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { credentials } from "@/data/credentials";
import { gsap } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Award, ArrowUpRight, ShieldCheck } from "lucide-react";

export const Credentials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".credentials-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".credential-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".credentials-grid",
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="credentials"
      className="py-28 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-[#D8D5CE]"
    >
      {/* Header */}
      <div className="credentials-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#D8D5CE]">
        <div>
          <SectionLabel label="06 — CREDENTIALS" className="mb-4" />
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#111111] leading-tight">
            <span className="block">CERTIFICATES,</span>
            <span className="block text-[#005A36]">ACHIEVEMENTS &</span>
            <span className="block">CREDENTIALS</span>
          </h2>
        </div>
        <p className="font-mono text-xs uppercase tracking-wider text-[#5F5F5A] max-w-sm">
          Archived certifications, hackathon recognitions, and verified technical credentials.
        </p>
      </div>

      {/* Grid */}
      <div className="credentials-grid grid grid-cols-1 md:grid-cols-3 gap-8">
        {credentials.map((item) => (
          <div
            key={item.id}
            className="credential-card border border-[#D8D5CE] bg-[#FAF9F6] p-7 transition-all duration-300 hover:border-[#005A36] flex flex-col justify-between group"
          >
            <div>
              {/* Top tag & Year */}
              <div className="flex items-center justify-between pb-4 border-b border-[#D8D5CE]/60 mb-5">
                <span className="font-mono text-xs uppercase tracking-widest text-[#005A36] font-semibold flex items-center gap-1.5">
                  <Award size={14} />
                  {item.category}
                </span>
                <span className="font-mono text-xs text-[#5F5F5A]">
                  {item.year}
                </span>
              </div>

              {/* Placeholder indicator badge */}
              {item.isPlaceholder && (
                <div className="mb-4 inline-flex items-center gap-1 px-2 py-0.5 bg-[#E9E4D9] text-[#5F5F5A] font-mono text-[10px] uppercase tracking-wider">
                  <ShieldCheck size={11} className="text-[#005A36]" />
                  <span>STRUCTURED ENTRY</span>
                </div>
              )}

              {/* Title & Organization */}
              <h3 className="font-serif text-xl sm:text-2xl text-[#111111] font-medium leading-snug group-hover:text-[#005A36] transition-colors">
                {item.title}
              </h3>

              <p className="font-sans text-xs uppercase tracking-wider text-[#5F5F5A] mt-2 font-medium">
                {item.organization}
              </p>
            </div>

            {/* Action */}
            <div className="mt-8 pt-4 border-t border-[#D8D5CE]/60">
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#005A36] hover:text-[#2F7D5B] transition-colors"
                >
                  <span>VIEW CREDENTIAL</span>
                  <ArrowUpRight size={13} />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[#5F5F5A]">
                  <span>PENDING VERIFICATION</span>
                  <span className="text-xs">→</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modular Config Notice */}
      <div className="mt-12 p-4 border border-dashed border-[#D8D5CE] bg-[#FAF9F6]/50 font-mono text-[11px] text-[#5F5F5A] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[#005A36] font-semibold">CONFIGURATION NOTE: </span>
          Real credentials can be appended directly inside <code className="text-[#111111]">src/data/credentials.ts</code> without modifying template styles.
        </div>
        <div className="text-[10px] text-[#5F5F5A]">
          STATUS: READY FOR DATA INGESTION
        </div>
      </div>
    </section>
  );
};
