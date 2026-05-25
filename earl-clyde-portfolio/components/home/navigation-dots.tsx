"use client";

import { useEffect, useState } from "react";
import {
  PORTFOLIO_SECTION_IDS,
  type PortfolioSectionId,
} from "@/lib/portfolio-sections";

const LABELS: Record<PortfolioSectionId, string> = {
  hero:       "TITLE",
  intro:      "PROFILE",
  experience: "LOGS",
  works:      "WORLDS",
  contact:    "CREDITS",
};

export function NavigationDots() {
  const [active, setActive] = useState<PortfolioSectionId>("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    PORTFOLIO_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.35 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 md:flex">
      <div
        className="flex flex-col gap-1 py-3 px-3"
        style={{
          background: "var(--panel)",
          border: "3px solid var(--border)",
          boxShadow: "3px 3px 0 0 var(--border)",
        }}
      >
        {PORTFOLIO_SECTION_IDS.map((id) => (
          <button
            key={id}
            type="button"
            aria-label={`Navigate to ${LABELS[id]}`}
            className="group flex items-center gap-2"
            style={{ cursor: "pointer" }}
            onClick={() =>
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {/* Pixel cursor */}
            <span
              style={{
                fontFamily: "var(--font-pixel), monospace",
                fontSize: "8px",
                color: "var(--orange)",
                width: "10px",
                display: "inline-block",
                opacity: active === id ? 1 : 0,
                transition: "opacity 150ms",
              }}
            >
              ▶
            </span>

            {/* Label */}
            <span
              style={{
                fontFamily: "var(--font-pixel), monospace",
                fontSize: "7px",
                color: active === id ? "var(--text)" : "var(--text-muted)",
                letterSpacing: "0.05em",
                transition: "color 150ms",
              }}
            >
              {LABELS[id]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
