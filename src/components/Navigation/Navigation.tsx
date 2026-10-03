import React, { useState, useEffect } from "react";
import { personalInfo } from "@/data/personal";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
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
          ? "bg-[#F5F3EE]/92 dark:bg-[#0E100E]/92 backdrop-blur-xs py-3 border-b border-[#D8D5CE] dark:border-[#272B26]"
          : "bg-transparent py-6 border-b border-[#D8D5CE]/40 dark:border-[#272B26]/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Name */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="group flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-[#005A36] dark:focus-visible:outline-[#00A865]"
          aria-label="Sayan Biswas Home"
        >
          <span className="font-mono text-sm tracking-widest font-semibold uppercase text-[#111111] dark:text-[#F5F3EE] group-hover:text-[#005A36] dark:group-hover:text-[#00A865] transition-colors duration-200">
            {personalInfo.name.toUpperCase()}
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-wider text-[#5F5F5A] dark:text-[#9E9E98] border-l border-[#D8D5CE] dark:border-[#272B26] pl-3">
            DEV / ARCHITECTURE
          </span>
        </a>

        {/* Right side controls (Desktop links + ThemeToggle) */}
        <div className="flex items-center space-x-6 md:space-x-8">
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
                      ? "text-[#005A36] dark:text-[#00A865] font-medium"
                      : "text-[#5F5F5A] dark:text-[#9E9E98] hover:text-[#111111] dark:hover:text-[#F5F3EE]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#005A36] dark:bg-[#00A865]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Theme Toggle Button in Top Right Corner */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] transition-colors focus-visible:outline-2 focus-visible:outline-[#005A36] dark:focus-visible:outline-[#00A865]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F3EE] dark:bg-[#0E100E] border-b border-[#D8D5CE] dark:border-[#272B26] px-6 py-6 transition-all shadow-xs">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-mono text-sm tracking-wider py-2 border-b border-[#D8D5CE]/50 dark:border-[#272B26]/50 text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-[#5F5F5A] dark:text-[#9E9E98]">↗</span>
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between font-mono text-xs text-[#5F5F5A] dark:text-[#9E9E98]">
              <span>APPEARANCE</span>
              <ThemeToggle showLabel={true} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
