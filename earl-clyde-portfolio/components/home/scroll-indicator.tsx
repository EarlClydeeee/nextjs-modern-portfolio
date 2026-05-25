"use client";

import { useEffect, useState } from "react";

export function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY < 160);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 flex flex-col items-center gap-1 pixel-bounce"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 400ms",
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-pixel), monospace",
          fontSize: "8px",
          color: "var(--text-muted)",
          letterSpacing: "0.1em",
        }}
      >
        SCROLL
      </span>
      <span
        style={{
          fontFamily: "var(--font-pixel), monospace",
          fontSize: "12px",
          color: "var(--orange)",
        }}
      >
        ▼
      </span>
    </div>
  );
}
