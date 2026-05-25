"use client";

const BRAND_BLUE = "#1E3A8A";

interface SectionDividerProps {
  label?: string;
  tilt?: number;
}

export function SectionDivider({
  label = "ENGINEER ★ CREATIVE ★ SYSTEMS ★ BUILDER ★",
  tilt = -1.6,
}: SectionDividerProps) {
  const repeatedText = `${label}   `.repeat(30);

  return (
    /*
     * Single element — the whole thing rotates.
     * No nested containers, no overflow:hidden, no absolute children.
     *
     * Width: 110% + marginLeft: -5% so the rotated corners always
     * extend past the viewport edges (no white-gap bleed at corners).
     *
     * Negative vertical margins pull it over both adjacent sections.
     * z-index: 40 beats the sections' z-index: auto.
     */
    <div
      style={{
        position: "relative",
        zIndex: 40,
        height: 46,
        width: "110%",
        marginLeft: "-5%",
        marginTop: "-23px",
        marginBottom: "-23px",
        transform: `rotate(${tilt}deg)`,
        transformOrigin: "center",
        background: BRAND_BLUE,
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(255,255,255,0.045) 14px, rgba(255,255,255,0.045) 15px)",
        boxShadow:
          "0 5px 14px rgba(0,0,0,0.50), inset 0 2px 0 rgba(255,255,255,0.20), inset 0 -2px 0 rgba(0,0,0,0.28)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <p
        style={{
          margin: 0,
          padding: 0,
          whiteSpace: "nowrap",
          fontFamily: "var(--font-pixel), 'Press Start 2P', monospace",
          fontSize: "10px",
          letterSpacing: "0.24em",
          color: "rgba(255,255,255,0.92)",
          lineHeight: 1,
        }}
      >
        {repeatedText}
      </p>
    </div>
  );
}
