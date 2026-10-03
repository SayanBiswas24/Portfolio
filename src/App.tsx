import { Navigation } from "@/components/Navigation/Navigation";
import { Hero } from "@/sections/Hero/Hero";
import { About } from "@/sections/About/About";
import { Skills } from "@/sections/Skills/Skills";
import { Projects } from "@/sections/Projects/Projects";
import { Process } from "@/sections/Process/Process";
import { Experience } from "@/sections/Experience/Experience";
import { Credentials } from "@/sections/Credentials/Credentials";
import { Contact } from "@/sections/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";
import { CustomCursor } from "@/components/CustomCursor/CustomCursor";

export function App() {
  return (
    <div className="relative min-h-screen bg-[#F5F3EE] text-[#111111] overflow-x-hidden selection:bg-[#005A36] selection:text-[#F5F3EE]">
      {/* Interactive custom cursor for desktop */}
      <CustomCursor />

      {/* Fixed editorial navigation */}
      <Navigation />

      {/* Main Single Page Content */}
      <main id="main-content" className="relative z-10 w-full">
        {/* Hero with 3D Systems Network */}
        <Hero />

        {/* 01 — About */}
        <About />

        {/* 02 — Technologies */}
        <Skills />

        {/* 03 — Selected Work */}
        <Projects />

        {/* 04 — Process with Scroll-Linked 3D Pipeline */}
        <Process />

        {/* 05 — Experience & Education */}
        <Experience />

        {/* 06 — Credentials */}
        <Credentials />

        {/* 07 — Contact */}
        <Contact />
      </main>

      {/* Minimalist Footer */}
      <Footer />
    </div>
  );
}

export default App;
