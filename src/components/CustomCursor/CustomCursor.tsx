import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/context/ThemeContext";

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  let isDark = false;
  try {
    const themeContext = useTheme();
    isDark = themeContext.isDark;
  } catch {
    // safe fallback
  }

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

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Detect if cursor is hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveElement = target.closest(
        "a, button, [data-cursor], input, textarea, select, [role='button'], label, summary, .project-editorial-row, .tool-column-card, .trajectory-card, .credential-editorial-card, .about-feature-box"
      );

      const hasPointerCursor =
        interactiveElement !== null ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(Boolean(hasPointerCursor));
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
    };

    const render = () => {
      // Smooth physical lerp
      currentX += (targetX - currentX) * 0.25;
      currentY += (targetY - currentY) * 0.25;

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
      className={`fixed top-0 left-0 pointer-events-none z-50 transition-all duration-200 ease-out ${
        isVisible
          ? isHovering
            ? "opacity-0 scale-50"
            : "opacity-100 scale-100"
          : "opacity-0 scale-50"
      }`}
      style={{ willChange: "transform" }}
    >
      <div
        className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
          isDark
            ? "bg-[#00A865] shadow-[0_0_8px_rgba(0,168,101,0.6)]"
            : "bg-[#005A36] shadow-[0_0_6px_rgba(0,90,54,0.4)]"
        }`}
      />
    </div>
  );
};
