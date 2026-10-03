import React from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";

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
  arrowDirection = "right",
  id,
}) => {
  const baseStyles =
    "group inline-flex items-center justify-center font-mono text-sm uppercase tracking-wider transition-all duration-200 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-[#005A36] dark:focus-visible:outline-[#00A865] focus-visible:outline-offset-2 rounded-full active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-[#005A36] dark:bg-[#00A865] text-[#F5F3EE] dark:text-[#151815] px-6 py-2.5 border border-[#005A36] dark:border-[#00A865] font-semibold shadow-xs hover:bg-[#007A4A] dark:hover:bg-[#1DE48F] hover:border-[#008A54] dark:hover:border-[#2BE092] hover:brightness-110 dark:hover:brightness-115 hover:shadow-[0_0_20px_rgba(0,90,54,0.35)] dark:hover:shadow-[0_0_22px_rgba(0,168,101,0.5)] hover:-translate-y-0.5",
    secondary:
      "bg-transparent text-[#111111] dark:text-[#F5F3EE] px-5 py-2.5 border border-[#D8D5CE] dark:border-[#2A322A] font-medium hover:bg-[#FFFFFF] dark:hover:bg-[#232823] hover:border-[#005A36] dark:hover:border-[#00A865] hover:text-[#005A36] dark:hover:text-[#00A865] hover:shadow-[0_2px_14px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_18px_rgba(0,168,101,0.25)] hover:brightness-105 dark:hover:brightness-110 hover:-translate-y-0.5",
    outline:
      "bg-transparent text-[#111111] dark:text-[#F5F3EE] px-5 py-2.5 border border-[#D8D5CE] dark:border-[#2A322A] hover:bg-[#FFFFFF] dark:hover:bg-[#232823] hover:border-[#005A36] dark:hover:border-[#00A865] hover:text-[#005A36] dark:hover:text-[#00A865] hover:shadow-[0_2px_14px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_18px_rgba(0,168,101,0.25)] hover:-translate-y-0.5",
    link:
      "bg-transparent text-[#111111] dark:text-[#F5F3EE] px-1 py-1 hover:text-[#005A36] dark:hover:text-[#00A865] border-b border-transparent hover:border-[#005A36] dark:hover:border-[#00A865] rounded-none hover:brightness-110",
  };

  const ArrowIcon = arrowDirection === "up-right" ? ArrowUpRight : ArrowRight;

  const content = (
    <>
      <span className="relative z-10 transition-transform duration-300">
        {children}
      </span>
      {showArrow && (
        <ArrowIcon
          size={13}
          className="ml-2 transition-transform duration-300 ease-out group-hover:translate-x-1 text-current shrink-0"
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
