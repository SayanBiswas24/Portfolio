import React, { useRef, useState, useEffect } from "react";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { ProcessNetwork } from "@/three/ProcessNetwork/ProcessNetwork";
import { gsap, ScrollTrigger } from "@/animations/gsapInit";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Lightbulb, PenTool, Code2, Bug, Rocket } from "lucide-react";

interface ProcessStep {
  id: string;
  stageNumber: string;
  name: string;
  text: string;
  details: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const steps: ProcessStep[] = [
  {
    id: "idea",
    stageNumber: "01",
    name: "IDEA",
    text: "Start with the problem rather than the technology.",
    details:
      "Clarify user needs, remove speculative assumptions, and formulate the simplest hypothesis that addresses real human friction.",
    icon: Lightbulb,
  },
  {
    id: "design",
    stageNumber: "02",
    name: "DESIGN",
    text: "Turn the problem into a simple and understandable experience.",
    details:
      "Structure data models, map intuitive user journeys, and establish minimal, high-clarity typographic hierarchy.",
    icon: PenTool,
  },
  {
    id: "code",
    stageNumber: "03",
    name: "CODE",
    text: "Build the smallest working version and iterate from there.",
    details:
      "Implement core architecture with strict typing, clean separation of concerns, and robust state management.",
    icon: Code2,
  },
  {
    id: "test",
    stageNumber: "04",
    name: "TEST",
    text: "Break things, identify problems and improve the experience.",
    details:
      "Stress test edge conditions, verify responsiveness, inspect telemetry, and eliminate latent bugs.",
    icon: Bug,
  },
  {
    id: "deploy",
    stageNumber: "05",
    name: "DEPLOY",
    text: "Put the product into the hands of real users.",
    details:
      "Deploy through automated pipelines, monitor real-world interactions, and gather grounded feedback.",
    icon: Rocket,
  },
];

export const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin/Scrub the process section across scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1800",
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);
          // Calculate stage: 0 to 4
          const stageIndex = Math.min(4, Math.floor(p * 5));
          setActiveStage(stageIndex);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const currentStep = steps[activeStage] || steps[0];
  const StepIcon = currentStep.icon;

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative min-h-screen flex flex-col justify-center py-20 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-[#D8D5CE] overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Explanation (45%) */}
        <div className="lg:col-span-5 flex flex-col justify-center z-10">
          <SectionLabel label="04 — PROCESS" className="mb-4" />

          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#111111] leading-[1.12] mb-8">
            <span className="block">FROM IDEA</span>
            <span className="block text-[#005A36]">TO WORKING</span>
            <span className="block">SOFTWARE.</span>
          </h2>

          {/* Stepper Pills Navigation */}
          <div className="flex items-center gap-2 mb-8">
            {steps.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`flex-1 py-1.5 px-2 border text-center font-mono text-[11px] tracking-wider transition-all duration-300 cursor-pointer ${
                  idx === activeStage
                    ? "border-[#005A36] bg-[#005A36] text-[#F5F3EE] font-semibold"
                    : idx < activeStage
                    ? "border-[#2F7D5B] bg-[#E9E4D9]/40 text-[#2F7D5B]"
                    : "border-[#D8D5CE] bg-transparent text-[#5F5F5A]"
                }`}
                aria-label={`Jump to stage ${s.name}`}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* Active Step Card */}
          <div className="border border-[#D8D5CE] bg-[#FAF9F6] p-7 transition-all duration-500 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#D8D5CE]/60">
              <div className="flex items-center gap-2 text-[#005A36]">
                <StepIcon size={18} />
                <span className="font-mono text-sm uppercase tracking-widest font-semibold">
                  STAGE {currentStep.stageNumber} // {currentStep.name}
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#5F5F5A] tracking-wider">
                0{activeStage + 1} OF 05
              </span>
            </div>

            {/* Core stage prompt text */}
            <blockquote className="font-serif text-xl sm:text-2xl text-[#111111] leading-snug mt-5 mb-4">
              "{currentStep.text}"
            </blockquote>

            {/* In-depth elaboration */}
            <p className="font-sans text-sm text-[#5F5F5A] leading-relaxed">
              {currentStep.details}
            </p>

            {/* Bottom Progress Bar */}
            <div className="mt-6 pt-4 border-t border-[#D8D5CE]/60 flex items-center justify-between font-mono text-[10px] text-[#5F5F5A]">
              <span>PIPELINE CONTINUUM</span>
              <span className="text-[#005A36] font-semibold">
                {Math.round(((activeStage + 1) / 5) * 100)}% COMPLETE
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Scene (55%) */}
        <div className="lg:col-span-7 flex items-center justify-center relative border border-[#D8D5CE] bg-[#FAF9F6] p-2 sm:p-6">
          {/* Subtle architectural coordinates header */}
          <div className="absolute top-4 right-4 font-mono text-[9px] text-[#5F5F5A]/60 uppercase tracking-widest pointer-events-none">
            3D.STATE.SPACE // CAMERA LINKED
          </div>
          <ProcessNetwork activeStage={activeStage} progress={scrollProgress} />
        </div>
      </div>
    </section>
  );
};
