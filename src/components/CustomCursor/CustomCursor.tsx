import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/context/ThemeContext";

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  let isDark = false;
  try {
    const themeContext = useTheme();
    isDark = themeContext.isDark;
  } catch {
    // safe fallback
  }

  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 1024;

    setIsTouchDevice(isTouch);
    if (isTouch || prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check if hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveElement = target.closest(
        "a, button, [data-cursor], input, textarea, select"
      ) as HTMLElement | null;

      if (interactiveElement) {
        setIsHovering(true);
        const customLabel = interactiveElement.getAttribute("data-cursor");
        if (customLabel) {
          setCursorText(customLabel);
        } else if (interactiveElement.tagName === "A") {
          setCursorText("LINK");
        } else if (interactiveElement.tagName === "BUTTON") {
          setCursorText("CLICK");
        } else {
          setCursorText("");
        }
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const render = () => {
      // Smooth lerp: 0.18
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, prefersReducedMotion]);

  if (isTouchDevice || prefersReducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ willChange: "transform" }}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-300 ${
          isHovering
            ? isDark
              ? "w-10 h-10 bg-[#00A865] text-[#0E100E] shadow-sm"
              : "w-10 h-10 bg-[#005A36] text-[#F5F3EE] shadow-sm"
            : isDark
            ? "w-2.5 h-2.5 bg-[#00A865]/90"
            : "w-2.5 h-2.5 bg-[#005A36]/80"
        }`}
      >
        {isHovering && cursorText && (
          <span
            ref={cursorTextRef}
            className="font-mono text-[9px] uppercase tracking-wider font-semibold select-none"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
