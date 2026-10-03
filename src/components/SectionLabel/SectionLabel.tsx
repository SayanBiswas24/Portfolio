import React from "react";

interface SectionLabelProps {
  label: string;
  className?: string;
  id?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  label,
  className = "",
  id,
}) => {
  return (
    <div
      id={id}
      className={`section-label inline-flex items-center gap-2.5 font-mono text-sm uppercase tracking-widest text-[#005A36] dark:text-[#00A865] select-none ${className}`}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#005A36] dark:bg-[#00A865]" />
      <span>{label}</span>
    </div>
  );
};
