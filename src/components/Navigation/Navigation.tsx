import React, { useState, useEffect } from "react";
import { personalInfo } from "@/data/personal";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROCESS", href: "#process" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current section
      const sections = navItems.map((item) => item.href.substring(1));
      let current = "";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = sectionId;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F5F3EE]/90 backdrop-blur-xs py-3 border-b border-[#D8D5CE]"
          : "bg-transparent py-6 border-b border-[#D8D5CE]/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Name */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="group flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-[#005A36]"
          aria-label="Sayan Biswas Home"
        >
          <span className="font-mono text-sm tracking-widest font-semibold uppercase text-[#111111] group-hover:text-[#005A36] transition-colors duration-200">
            {personalInfo.name.toUpperCase()}
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-wider text-[#5F5F5A] border-l border-[#D8D5CE] pl-3">
            DEV / ARCHITECTURE
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center space-x-8"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-mono text-xs tracking-wider transition-colors duration-200 py-1 relative ${
                  isActive
                    ? "text-[#005A36] font-medium"
                    : "text-[#5F5F5A] hover:text-[#111111]"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#005A36]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#111111] hover:text-[#005A36] transition-colors focus-visible:outline-2 focus-visible:outline-[#005A36]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F3EE] border-b border-[#D8D5CE] px-6 py-6 transition-all shadow-xs">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-mono text-sm tracking-wider py-2 border-b border-[#D8D5CE]/50 text-[#111111] hover:text-[#005A36] flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-[#5F5F5A]">↗</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
