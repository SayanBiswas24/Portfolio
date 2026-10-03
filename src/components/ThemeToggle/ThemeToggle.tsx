import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  showLabel = false,
}) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative inline-flex items-center justify-center gap-2 p-2 border transition-all duration-200 cursor-pointer select-none rounded-full focus-visible:outline-2 focus-visible:outline-[#005A36] dark:focus-visible:outline-[#00A865] ${
        isDark
          ? "border-[#272B26] bg-[#151815] text-[#F5F3EE] hover:bg-[#1E261E] hover:border-[#00A865] hover:text-[#00A865] hover:shadow-[0_0_16px_rgba(0,168,101,0.35)] hover:brightness-115"
          : "border-[#D8D5CE] bg-[#FAF9F6] text-[#111111] hover:bg-[#FFFFFF] hover:border-[#005A36] hover:text-[#005A36] hover:shadow-[0_0_14px_rgba(0,90,54,0.2)] hover:brightness-105"
      } ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Icon with smooth flip/rotation */}
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        <Sun
          size={15}
          className={`absolute transition-all duration-500 transform ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100 text-[#005A36]"
          }`}
        />
        <Moon
          size={15}
          className={`absolute transition-all duration-500 transform ${
            isDark
              ? "rotate-0 scale-100 opacity-100 text-[#00A865]"
              : "-rotate-90 scale-0 opacity-0 text-[#111111]"
          }`}
        />
      </div>

      {showLabel && (
        <span className="font-mono text-[10px] uppercase tracking-wider font-medium">
          {isDark ? "DARK" : "LIGHT"}
        </span>
      )}
    </button>
  );
};
