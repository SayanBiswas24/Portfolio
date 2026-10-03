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
    "group inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider transition-all duration-300 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-[#005A36] dark:focus-visible:outline-[#00A865] focus-visible:outline-offset-2 rounded-full";

  const variantStyles = {
    primary:
      "bg-[#005A36] dark:bg-[#00A865] text-[#F5F3EE] dark:text-[#090B09] px-6 py-2.5 border border-[#005A36] dark:border-[#00A865] hover:bg-[#2F7D5B] dark:hover:bg-[#34B37D] font-semibold shadow-xs hover:shadow-sm",
    secondary:
      "bg-transparent text-[#111111] dark:text-[#F5F3EE] px-5 py-2.5 border border-[#D8D5CE] dark:border-[#212621] hover:border-[#005A36] dark:hover:border-[#00A865] hover:text-[#005A36] dark:hover:text-[#00A865] hover:bg-[#E9E4D9]/30 dark:hover:bg-[#171E17]/40 font-medium",
    outline:
      "bg-transparent text-[#111111] dark:text-[#F5F3EE] px-5 py-2.5 border border-[#D8D5CE] dark:border-[#212621] hover:border-[#005A36] dark:hover:border-[#00A865] hover:text-[#005A36] dark:hover:text-[#00A865]",
    link:
      "bg-transparent text-[#111111] dark:text-[#F5F3EE] px-0 py-1 hover:text-[#005A36] dark:hover:text-[#00A865] border-b border-transparent hover:border-[#005A36] dark:hover:border-[#00A865] rounded-none",
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
