"use client";

import { useState } from "react";
import type { PortfolioSectionId } from "@/lib/portfolio-sections";

type PersonalSkillsSectionProps = { id: PortfolioSectionId };

const skillGroups = [
  {
    category: "LANGUAGES",
    color: "#6A7FD4",
    glow: "rgba(106,127,212,0.4)",
    skills: [
      { label: "JavaScript", short: "JS",  icon: "🟨" },
      { label: "TypeScript", short: "TS",  icon: "🔷" },
      { label: "Python",     short: "PY",  icon: "🐍" },
      { label: "PHP",        short: "PHP", icon: "🐘" },
      { label: "SQL",        short: "SQL", icon: "🗄" },
    ],
  },
  {
    category: "FRONTEND",
    color: "#5AC8C0",
    glow: "rgba(90,200,192,0.4)",
    skills: [
      { label: "React",       short: "⚛",   icon: "⚛" },
      { label: "Next.js",     short: "NEXT", icon: "▲" },
      { label: "Astro",       short: "ASTR", icon: "🚀" },
      { label: "Tailwind",    short: "TW",   icon: "🌊" },
      { label: "HTML5/CSS3",  short: "HTM",  icon: "🌐" },
    ],
  },
  {
    category: "BACKEND",
    color: "#D4A058",
    glow: "rgba(212,160,88,0.4)",
    skills: [
      { label: "Node.js",    short: "NODE", icon: "💚" },
      { label: "Express.js", short: "EXP",  icon: "⚡" },
      { label: "FastAPI",    short: "FAP",  icon: "🔥" },
      { label: "Flask",      short: "FLK",  icon: "🧪" },
      { label: "REST API",   short: "API",  icon: "🔗" },
    ],
  },
  {
    category: "DATA & CLOUD",
    color: "#58C88A",
    glow: "rgba(88,200,138,0.4)",
    skills: [
      { label: "PostgreSQL", short: "PG",  icon: "🐘" },
      { label: "MySQL",      short: "MY",  icon: "🐬" },
      { label: "Supabase",   short: "SB",  icon: "⚡" },
      { label: "AWS",        short: "AWS", icon: "☁" },
      { label: "Vercel",     short: "▲",   icon: "▲" },
    ],
  },
  {
    category: "TOOLS",
    color: "#C878A0",
    glow: "rgba(200,120,160,0.4)",
    skills: [
      { label: "Git/GitHub",     short: "GIT", icon: "🐙" },
      { label: "TanStack Query", short: "TQ",  icon: "🔄" },
      { label: "TanStack Table", short: "TT",  icon: "📊" },
      { label: "Axios",          short: "AXS", icon: "📡" },
      { label: "ExcelJS",        short: "XLS", icon: "📑" },
    ],
  },
];

export function PersonalSkillsSection({ id }: PersonalSkillsSectionProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id={id}
      className="min-h-screen flex items-center justify-center px-6 py-16"
      style={{ background: "#0D0B1A" }}
    >
      {/* Pixel grid background */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: [
          "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        ].join(","),
        backgroundSize: "32px 32px",
      }} />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Section title */}
        <div className="game-section-title mb-8" data-reveal style={{
          color: "#A8A0E8",
          textShadow: "0 0 20px rgba(168,160,232,0.4)",
        }}>
          EQUIPMENT
        </div>

        {/* Inventory panel */}
        <div data-reveal style={{
          background: "rgba(16,14,28,0.95)",
          border: "3px solid rgba(168,160,232,0.25)",
          boxShadow: "0 0 40px rgba(106,127,212,0.08), 6px 6px 0 rgba(0,0,0,0.5)",
        }}>
          {/* Inventory header */}
          <div style={{
            background: "#0A0816",
            borderBottom: "3px solid rgba(168,160,232,0.2)",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"8px", color:"#A8A0E8", letterSpacing:"0.1em" }}>
              ▶ SKILL INVENTORY
            </span>
            <span style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"7px", color:"rgba(168,160,232,0.4)", letterSpacing:"0.06em" }}>
              {skillGroups.reduce((a, g) => a + g.skills.length, 0)} ITEMS EQUIPPED
            </span>
          </div>

          {/* Tab bar */}
          <div style={{
            display: "flex",
            overflowX: "auto",
            borderBottom: "3px solid rgba(168,160,232,0.12)",
          }}>
            {skillGroups.map((g, i) => (
              <button
                key={g.category}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: "8px 14px",
                  background: activeTab === i ? g.color + "22" : "transparent",
                  border: "none",
                  borderBottom: activeTab === i ? `3px solid ${g.color}` : "3px solid transparent",
                  marginBottom: "-3px",
                  fontFamily: "var(--font-pixel),monospace",
                  fontSize: "7px",
                  color: activeTab === i ? g.color : "rgba(255,255,255,0.3)",
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {g.category}
              </button>
            ))}
          </div>

          {/* Inventory grid — ALL groups shown */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {skillGroups.map((group, gi) => (
              <div key={group.category} data-reveal style={{ transitionDelay: `${gi * 80}ms` }}>
                {/* Category label */}
                <div style={{
                  fontFamily: "var(--font-pixel),monospace",
                  fontSize: "7px",
                  color: group.color,
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                  paddingBottom: "6px",
                  borderBottom: `2px solid ${group.color}40`,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}>
                  <span style={{
                    width: "8px", height: "8px",
                    background: group.color,
                    display: "inline-block",
                    boxShadow: `0 0 6px ${group.glow}`,
                  }} />
                  {group.category}
                </div>

                {/* Item slots */}
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => {
                    const key = `${group.category}-${skill.label}`;
                    const isHovered = hovered === key;
                    return (
                      <div
                        key={skill.label}
                        title={skill.label}
                        className="inv-slot"
                        onMouseEnter={() => setHovered(key)}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                          background: isHovered ? `${group.color}18` : "rgba(255,255,255,0.03)",
                          borderColor: isHovered ? group.color : "rgba(255,255,255,0.1)",
                          boxShadow: isHovered ? `0 0 12px ${group.glow}, inset 0 0 8px ${group.color}18` : "none",
                          color: isHovered ? group.color : "rgba(255,255,255,0.5)",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "14px", lineHeight: 1, marginBottom: "2px", textAlign: "center" }}>
                            {skill.icon}
                          </div>
                          <div style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"5px", textAlign:"center", lineHeight: 1.4 }}>
                            {skill.short}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Tooltip bar at bottom */}
          <div style={{
            borderTop: "2px solid rgba(168,160,232,0.12)",
            padding: "8px 16px",
            minHeight: "34px",
            display: "flex",
            alignItems: "center",
          }}>
            {hovered ? (
              <span style={{ fontFamily:"var(--font-vt323),monospace", fontSize:"18px", color:skillGroups.find(g => hovered.startsWith(g.category))?.color ?? "#A8A0E8" }}>
                ▸ {hovered.split("-")[1]}
              </span>
            ) : (
              <span style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"6px", color:"rgba(255,255,255,0.18)", letterSpacing:"0.06em" }}>
                HOVER AN ITEM FOR INFO
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
