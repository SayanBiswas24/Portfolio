import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "link";
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  className?: string;
  showArrow?: boolean;
  arrowDirection?: "up-right" | "right" | "down";
  id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  href,
  onClick,
  target,
  rel,
  className = "",
  showArrow = false,
  id,
}) => {
  const baseStyles =
    "group inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider transition-all duration-300 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-[#005A36] focus-visible:outline-offset-2";

  const variantStyles = {
    primary:
      "bg-[#005A36] text-[#F5F3EE] px-6 py-3.5 border border-[#005A36] hover:bg-[#2F7D5B] hover:border-[#2F7D5B] hover:shadow-xs",
    secondary:
      "bg-transparent text-[#111111] px-6 py-3.5 border border-[#D8D5CE] hover:border-[#005A36] hover:text-[#005A36] hover:bg-[#E9E4D9]/40",
    outline:
      "bg-[#F5F3EE] text-[#111111] px-5 py-3 border border-[#D8D5CE] hover:border-[#005A36] hover:text-[#005A36]",
    link:
      "bg-transparent text-[#111111] px-0 py-1 hover:text-[#005A36] border-b border-transparent hover:border-[#005A36]",
  };

  const content = (
    <>
      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-px">
        {children}
      </span>
      {showArrow && (
        <ArrowUpRight
          size={14}
          className="ml-2 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 text-current shrink-0"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        id={id}
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      id={id}
      type="button"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
