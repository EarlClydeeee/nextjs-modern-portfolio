"use client";

import { useEffect } from "react";
import { NavigationDots } from "@/components/home/navigation-dots";
import { ScrollIndicator } from "@/components/home/scroll-indicator";
import { TapeDivider } from "@/components/home/tape-divider";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { IntroSection } from "@/components/sections/intro-section";
import { WorkExperienceSection } from "@/components/sections/work-experience-section";
import { WorksThroughLifeSection } from "@/components/sections/works-through-life-section";
import { PORTFOLIO_SECTION_IDS } from "@/lib/portfolio-sections";

const [heroId, introId, experienceId, worksId, contactId] =
  PORTFOLIO_SECTION_IDS;

export function PortfolioView() {
  useEffect(() => {
    // Element-level reveals (data-reveal)
    const revealObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => revealObs.observe(el));

    // Section-level entrance animations (data-enter)
    const enterObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("s-enter"); }),
      { threshold: 0.06, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll("[data-enter]").forEach((el) => enterObs.observe(el));

    return () => { revealObs.disconnect(); enterObs.disconnect(); };
  }, []);

  return (
    <div className="bg-canvas min-h-[100dvh] w-full min-w-0 overflow-x-hidden pb-[max(2rem,env(safe-area-inset-bottom,0px))]">
      <HeroSection id={heroId} />
      <IntroSection id={introId} />
      <TapeDivider text="★ EXPERIENCE LOG ★" color="orange" rotate={1.5} />
      <WorkExperienceSection id={experienceId} />
      <TapeDivider text="✦ WORKS & BUILDS ✦" color="yellow" rotate={-1.5} />
      <WorksThroughLifeSection id={worksId} />
      <TapeDivider text="★ FINAL STAGE ★" color="teal" rotate={2} />
      <ContactSection id={contactId} />
      <NavigationDots />
      <ScrollIndicator />
    </div>
  );
}
