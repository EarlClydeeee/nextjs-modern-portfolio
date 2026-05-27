"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ModernHero } from "@/components/sections/modern/hero";
import { ModernAbout } from "@/components/sections/modern/about";
import { ModernCredentials } from "@/components/sections/modern/credentials";
import { ModernStack } from "@/components/sections/modern/stack";
import { ModernWork } from "@/components/sections/modern/work";
import { ModernWhyMe } from "@/components/sections/modern/why-me";
import { ModernContact } from "@/components/sections/modern/contact";
import { ModernNavigation, ModernNavDots } from "@/components/sections/modern/navigation";

export default function EarlClydePortfolio() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>("section[data-index]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          const idx = section.getAttribute("data-index");
          if (idx !== null) setActiveSection(Number(idx));
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((index: number) => {
    const section = document.querySelector<HTMLElement>(`section[data-index="${index}"]`);
    section?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div 
      className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white" 
      style={{ fontFamily: "var(--font-space), system-ui, sans-serif" }}
    >
      <ModernNavigation scrollToSection={scrollToSection} />
      
      <main>
        <ModernHero scrollToSection={scrollToSection} />
        <ModernAbout />
        <ModernCredentials />
        <ModernStack />
        <ModernWork />
        <ModernWhyMe />
        <ModernContact />
      </main>

      <ModernNavDots 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
      />
    </div>
  );
}
