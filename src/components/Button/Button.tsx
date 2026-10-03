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
    "group inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider transition-all duration-300 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-[#005A36] dark:focus-visible:outline-[#00A865] focus-visible:outline-offset-2";

  const variantStyles = {
    primary:
      "bg-[#005A36] dark:bg-[#00A865] text-[#F5F3EE] dark:text-[#0E100E] border border-[#005A36] dark:border-[#00A865] hover:bg-[#2F7D5B] dark:hover:bg-[#34B37D] hover:border-[#2F7D5B] dark:hover:border-[#34B37D] font-medium shadow-xs",
    secondary:
      "bg-transparent text-[#111111] dark:text-[#F5F3EE] px-6 py-3.5 border border-[#D8D5CE] dark:border-[#272B26] hover:border-[#005A36] dark:hover:border-[#00A865] hover:text-[#005A36] dark:hover:text-[#00A865] hover:bg-[#E9E4D9]/40 dark:hover:bg-[#1A201A]/60",
    outline:
      "bg-[#F5F3EE] dark:bg-[#0E100E] text-[#111111] dark:text-[#F5F3EE] px-5 py-3 border border-[#D8D5CE] dark:border-[#272B26] hover:border-[#005A36] dark:hover:border-[#00A865] hover:text-[#005A36] dark:hover:text-[#00A865]",
    link:
      "bg-transparent text-[#111111] dark:text-[#F5F3EE] px-0 py-1 hover:text-[#005A36] dark:hover:text-[#00A865] border-b border-transparent hover:border-[#005A36] dark:hover:border-[#00A865]",
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
        className={`${baseStyles} ${variantStyles[variant]} ${
          variant === "primary" ? "px-6 py-3.5" : ""
        } ${className}`}
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
      className={`${baseStyles} ${variantStyles[variant]} ${
        variant === "primary" ? "px-6 py-3.5" : ""
      } ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
