import React, { useState, useEffect } from "react";
import { personalInfo } from "@/data/personal";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { Menu, X } from "lucide-react";

interface NavItem {
  number: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { number: "01", label: "ABOUT", href: "#about" },
  { number: "02", label: "SKILLS", href: "#skills" },
  { number: "03", label: "WORK", href: "#work" },
  { number: "04", label: "ACADEMICS & EXP", href: "#experience" },
  { number: "05", label: "CREDENTIALS", href: "#credentials" },
  { number: "06", label: "CONTACT", href: "#contact" },
];

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = navItems.map((item) => item.href.substring(1));
      let current = "";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
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
          ? "bg-[#F5F3EE]/95 dark:bg-[#090B09]/95 backdrop-blur-md py-3.5 border-b border-[#D8D5CE] dark:border-[#212621]"
          : "bg-transparent py-5 border-b border-[#D8D5CE]/50 dark:border-[#212621]/60"
      }`}
    >
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Name */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="group flex items-center gap-2.5 text-left focus-visible:outline-2 focus-visible:outline-[#005A36] dark:focus-visible:outline-[#00A865] px-2.5 py-1.5 -ml-2.5 rounded-full transition-all duration-200 hover:bg-[#005A36]/8 dark:hover:bg-[#00A865]/15"
          aria-label="Sayan Biswas Home"
        >
          <span className="w-2 h-2 rounded-full bg-[#005A36] dark:bg-[#00A865] animate-pulse group-hover:scale-125 transition-transform" />
          <span className="font-mono text-sm tracking-widest font-semibold uppercase text-[#111111] dark:text-[#F5F3EE] group-hover:text-[#005A36] dark:group-hover:text-[#00A865] transition-colors duration-200">
            {personalInfo.name.toUpperCase()}
          </span>
        </a>

        {/* Center Desktop Nav Links */}
        <nav
          className="hidden lg:flex items-center gap-2.5 xl:gap-3.5"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-mono text-[13px] tracking-wider transition-all duration-200 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 select-none ${
                  isActive
                    ? "text-[#005A36] dark:text-[#00A865] bg-[#005A36]/10 dark:bg-[#00A865]/15 font-semibold"
                    : "text-[#5F5F5A] dark:text-[#9E9E98] hover:text-[#111111] dark:hover:text-[#F5F3EE] hover:bg-[#005A36]/8 dark:hover:bg-[#00A865]/15 hover:shadow-[0_0_12px_rgba(0,90,54,0.1)] dark:hover:shadow-[0_0_12px_rgba(0,168,101,0.15)]"
                }`}
              >
                <span className={`text-[12px] ${isActive ? "text-[#005A36] dark:text-[#00A865]" : "opacity-60"}`}>
                  {item.number}.
                </span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Side: Theme Toggle & Mobile Menu */}
        <div className="flex items-center space-x-3 sm:space-x-4">

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Mobile Menu Hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] hover:bg-[#005A36]/8 dark:hover:bg-[#00A865]/15 transition-all focus-visible:outline-2 focus-visible:outline-[#005A36] dark:focus-visible:outline-[#00A865]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F5F3EE] dark:bg-[#090B09] border-b border-[#D8D5CE] dark:border-[#212621] px-6 py-6 shadow-md transition-all">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-mono text-sm tracking-wider py-2 border-b border-[#D8D5CE]/40 dark:border-[#212621]/60 text-[#111111] dark:text-[#F5F3EE] hover:text-[#005A36] dark:hover:text-[#00A865] flex items-center justify-between"
              >
                <span>
                  <span className="text-[#005A36] dark:text-[#00A865] mr-2">
                    {item.number}.
                  </span>
                  {item.label}
                </span>
                <span className="text-[12px] text-[#5F5F5A] dark:text-[#9E9E98]">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
