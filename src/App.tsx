import { Navigation } from "@/components/Navigation/Navigation";
import { Hero } from "@/sections/Hero/Hero";
import { About } from "@/sections/About/About";
import { Skills } from "@/sections/Skills/Skills";
import { Projects } from "@/sections/Projects/Projects";
import { Experience } from "@/sections/Experience/Experience";
import { Credentials } from "@/sections/Credentials/Credentials";
import { Contact } from "@/sections/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";
import { CustomCursor } from "@/components/CustomCursor/CustomCursor";
import { ThemeProvider } from "@/context/ThemeContext";

export function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300 overflow-x-hidden selection:bg-[#005A36] dark:selection:bg-[#00A865] selection:text-[#F5F3EE] dark:selection:text-[#090B09]">
        {/* Subtle architectural vertical grid columns matching reference screenshot */}
        <div
          className="fixed inset-0 max-w-[1520px] mx-auto px-3 sm:px-6 pointer-events-none z-0 grid grid-cols-4 md:grid-cols-6 border-x border-[#D8D5CE]/30 dark:border-[#212621]/40"
          aria-hidden="true"
        >
          <div className="border-r border-[#D8D5CE]/20 dark:border-[#212621]/30 h-full" />
          <div className="border-r border-[#D8D5CE]/20 dark:border-[#212621]/30 h-full" />
          <div className="border-r border-[#D8D5CE]/20 dark:border-[#212621]/30 h-full hidden md:block" />
          <div className="border-r border-[#D8D5CE]/20 dark:border-[#212621]/30 h-full hidden md:block" />
          <div className="border-r border-[#D8D5CE]/20 dark:border-[#212621]/30 h-full" />
        </div>

        {/* Interactive custom cursor for desktop */}
        <CustomCursor />

        {/* Fixed editorial navigation */}
        <Navigation />

        {/* Main Single Page Content without Process section */}
        <main id="main-content" className="relative z-10 w-full">
          {/* Hero */}
          <Hero />

          {/* 01 // About */}
          <About />

          {/* 02 // Technologies */}
          <Skills />

          {/* 03 // Selected Work */}
          <Projects />

          {/* 04 // Timeline & Background */}
          <Experience />

          {/* 05 // Credentials */}
          <Credentials />

          {/* 06 // Contact */}
          <Contact />
        </main>

        {/* Minimalist Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
