"use client";

import type { PortfolioSectionId } from "@/lib/portfolio-sections";

type WorksThroughLifeSectionProps = { id: PortfolioSectionId };

const projects = [
  {
    number: "01", name: "ACCESS Official Website",       year: "2026", status: "ACTIVE",
    tags: ["Next.js", "Supabase", "PostgreSQL", "RBAC"],
    description: "Replaced spreadsheet-based org management with a centralized platform — member directory, asset borrowing workflow, and governance tooling for PUP's CpE student body.",
    color: "#5A8880", nameColor: "#4A9A5A", icon: "🏛",
    href: "https://access-web-tau.vercel.app/",
  },
  {
    number: "02", name: "AWSCCPUP Website & Membership", year: "2026", status: "ACTIVE",
    tags: ["Astro", "React", "FastAPI", "PostgreSQL"],
    description: "Full organizational platform for AWS Cloud Club PUP — member portal, searchable directory, and FastAPI REST backend. Replaced manual member tracking with a searchable, filterable system.",
    color: "#C08A58", nameColor: "#D4A040", icon: "☁",
    href: "https://www.awsccpup.cloud/contributors",
  },
  {
    number: "03", name: "AWS SBD Learning Management System", year: "2025", status: "COMPLETED",
    tags: ["React", "TypeScript", "Express.js", "Supabase"],
    description: "Gamified LMS deployed across 7 departments — leaderboard, real-time progress tracking, and department rankings. Turned skill-building into a measurable, competitive experience.",
    color: "#4A7088", nameColor: "#4A80C0", icon: "📚",
    href: "https://sbd.awsccpup.cloud/contributors",
  },
  {
    number: "04", name: "SOMS — Output Monitoring System", year: "2025", status: "COMPLETED",
    tags: ["HTML", "Tailwind", "JavaScript", "PHP", "MySQL"],
    description: "Industrial dashboard tracking 2M+ factory production cycles at Hayakawa Electronics. ETL pipeline replaced manual paper logs — achieving 45% improvement in reporting efficiency.",
    color: "#7A6A55", nameColor: "#C0704A", icon: "🏭",
    href: null,
  },
  {
    number: "05", name: "ActiveCAMPUS GO",               year: "2025", status: "COMPLETED",
    tags: ["Next.js", "Express", "Firebase", "Google Maps"],
    description: "Location-aware gamified fitness PWA for student wellness — campus challenges, step tracking, and leaderboards. Deployed campus-wide and ranked Top 8 PUP-wide.",
    color: "#6AAA6A", nameColor: "#4AA870", icon: "🏃",
    href: null,
  },
  {
    number: "06", name: "CPE Fair Tournament System",    year: "2025", status: "COMPLETED",
    tags: ["Next.js", "Express.js", "Supabase", "Vercel"],
    description: "Eliminated manual bracket management for CPE Fair — real-time tournament platform with live leaderboard, bracket visualization, role-based staff access, and Excel export.",
    color: "#8B6A9A", nameColor: "#9A5AC0", icon: "🏆",
    href: "https://cpefair2025.vercel.app/contributors",
  },
  {
    number: "07", name: "TEDxPUP Official Website",      year: "2025", status: "COMPLETED",
    tags: ["React", "Typeform"],
    description: "Official event platform for TEDxPUP — Typeform ticketing integration, contributor showcase, FAQ system, and tablet-optimized view for on-site event staff.",
    color: "#C04040", nameColor: "#C04A4A", icon: "🎤",
    href: "https://www.tedxpup.org/contributors",
  },
  {
    number: "08", name: "AWSCC ID Finder System",        year: "2025", status: "COMPLETED",
    tags: ["React", "TypeScript"],
    description: "Complete frontend overhaul of the AWS Cloud Club PUP ID Finder — migrated from legacy RetroUI to modern SBD design system with improved usability and performance.",
    color: "#4A6A9A", nameColor: "#5A70A8", icon: "🪪",
    href: "https://www.awsccpup.cloud/id-finder",
  },
  {
    number: "09", name: "ICpEP Certificate Generator",  year: "2025", status: "COMPLETED",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Figma"],
    description: "Automated bulk certificate creation for large-scale events — CSV input, live template preview, and one-click batch PDF/PNG export. Reduced days of manual work to minutes.",
    color: "#D4785A", nameColor: "#C89A40", icon: "📜",
    href: null,
  },
  {
    number: "10", name: "Evidentia — AI Civic Platform", year: "2025", status: "COMPLETED",
    tags: ["Flask", "Gemini AI", "GPT API"],
    description: "AI-powered civic incident platform — GPT-prioritized reporting, geographic heatmap dashboards, and citizen query chatbot. Tested with 100+ users at Sparkfest hackathon.",
    color: "#5A5888", nameColor: "#6A5A90", icon: "⚖",
    href: null,
  },
];

// Featured pinned cards = projects with live links
const PINNED = projects.filter((p) => p.href);
const ROTS   = [-2.5, 1.5, -3, 2, -1.5, 2.5, -2, 1];
const PIN_COLORS = ["#D4604A", "#4A80C0", "#4A9A5A", "#D4C04A", "#9A5AC0", "#C04040"];

const TECH_STACK = [
  { label: "React",      icon: "⚛" },
  { label: "Next.js",    icon: "▲" },
  { label: "TypeScript", icon: "🔷" },
  { label: "Supabase",   icon: "⚡" },
  { label: "Tailwind",   icon: "🌊" },
  { label: "PostgreSQL", icon: "🐘" },
  { label: "Express",    icon: "🔌" },
  { label: "Python",     icon: "🐍" },
  { label: "Firebase",   icon: "🔥" },
  { label: "FastAPI",    icon: "🚀" },
];

// ─── Pushpin ────────────────────────────────────────────────────
function Pushpin({ color }: { color: string }) {
  return (
    <div style={{
      position: "absolute",
      top: "-9px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 3,
      width: "14px", height: "14px",
      background: color,
      border: "2px solid rgba(0,0,0,0.45)",
      borderRadius: "50%",
      boxShadow: "1px 2px 0 rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
    }} />
  );
}

// ─── Polaroid card ──────────────────────────────────────────────
function Polaroid({ project, rotation, pinColor, idx }: {
  project: typeof projects[0];
  rotation: number;
  pinColor: string;
  idx: number;
}) {
  const card = (
    <div
      data-reveal="scale"
      style={{
        transitionDelay: `${idx * 80}ms`,
        background: "#F6F1E3",
        padding: "5px 5px 22px",
        border: "2px solid rgba(61,48,37,0.18)",
        boxShadow: "4px 5px 0 rgba(0,0,0,0.28)",
        transform: `rotate(${rotation}deg)`,
        position: "relative",
        transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s",
        cursor: project.href ? "pointer" : "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = `rotate(0deg) scale(1.06)`;
        el.style.boxShadow = "6px 8px 0 rgba(0,0,0,0.35)";
        el.style.zIndex = "10";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = `rotate(${rotation}deg)`;
        el.style.boxShadow = "4px 5px 0 rgba(0,0,0,0.28)";
        el.style.zIndex = "1";
      }}
    >
      <Pushpin color={pinColor} />

      {/* Photo area */}
      <div style={{
        background: project.color,
        aspectRatio: "1 / 1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        border: "1px solid rgba(0,0,0,0.1)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Pixel noise overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 4px)",
        }} />
        <div style={{ fontSize: "26px", position: "relative" }}>{project.icon}</div>
        <div style={{
          fontFamily: "var(--font-pixel), monospace",
          fontSize: "5px",
          color: "rgba(255,255,255,0.75)",
          letterSpacing: "0.06em",
          position: "relative",
        }}>
          #{project.number}
        </div>
        {project.href && (
          <div style={{
            position: "absolute", bottom: "4px", right: "4px",
            fontFamily: "var(--font-pixel), monospace", fontSize: "5px",
            background: "rgba(0,0,0,0.45)", color: "rgba(255,255,255,0.9)",
            padding: "2px 4px",
          }}>▶</div>
        )}
      </div>

      {/* Polaroid caption */}
      <div style={{
        fontFamily: "var(--font-pixel), monospace",
        fontSize: "5px",
        color: "#5A3A1A",
        textAlign: "center",
        marginTop: "7px",
        lineHeight: 1.6,
        letterSpacing: "0.04em",
        padding: "0 2px",
      }}>
        {project.name.length > 18 ? project.name.slice(0, 18) + "…" : project.name}
      </div>
    </div>
  );

  return project.href ? (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", display: "block", position: "relative", zIndex: 1 }}
    >
      {card}
    </a>
  ) : (
    <div style={{ position: "relative", zIndex: 1 }}>
      {card}
    </div>
  );
}

// ─── Project list row ────────────────────────────────────────────
function ProjectRow({ project, i }: { project: typeof projects[0]; i: number }) {
  return (
    <div
      data-reveal="right"
      style={{
        transitionDelay: `${i * 60}ms`,
        paddingBottom: "10px",
        marginBottom: "10px",
        borderBottom: "1px dashed rgba(61,48,37,0.22)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "8px", flexWrap: "wrap" }}>
        <span style={{
          fontFamily: "var(--font-vt323), monospace",
          fontSize: "21px",
          color: project.nameColor,
          lineHeight: 1.2,
        }}>
          {project.icon} {project.name}
        </span>
        <div style={{ display: "flex", gap: "6px", alignItems: "center", flexShrink: 0 }}>
          <span style={{
            fontFamily: "var(--font-pixel), monospace", fontSize: "6px",
            color: "rgba(61,48,37,0.5)",
          }}>
            {project.year}
          </span>
          <span style={{
            fontFamily: "var(--font-pixel), monospace", fontSize: "6px",
            padding: "2px 6px",
            background: project.status === "ACTIVE" ? "rgba(74,154,90,0.15)" : "rgba(61,48,37,0.1)",
            border: `1px solid ${project.status === "ACTIVE" ? "rgba(74,154,90,0.4)" : "rgba(61,48,37,0.2)"}`,
            color: project.status === "ACTIVE" ? "#4A9A5A" : "rgba(61,48,37,0.55)",
            letterSpacing: "0.05em",
          }}>
            {project.status === "ACTIVE" ? "● ONGOING" : "✓ DONE"}
          </span>
        </div>
      </div>
      <p style={{
        fontFamily: "var(--font-vt323), monospace", fontSize: "17px",
        color: "rgba(61,48,37,0.65)", lineHeight: 1.4, marginTop: "2px",
      }}>
        {project.description.length > 110 ? project.description.slice(0, 110) + "…" : project.description}
      </p>
    </div>
  );
}

// ─── Main section ────────────────────────────────────────────────
export function WorksThroughLifeSection({ id }: WorksThroughLifeSectionProps) {
  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-20"
      style={{ background: "#C4925A" }}
    >
      {/* Cork dot texture */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }} />
      {/* Wood grain lines */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: "repeating-linear-gradient(87deg, rgba(0,0,0,0.025) 0px, rgba(0,0,0,0.025) 1px, transparent 1px, transparent 36px)",
      }} />

      <div data-enter="slide" className="relative z-10 w-full max-w-6xl">

        {/* ── Binder clip ── */}
        <div data-reveal style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
          <div style={{ position: "relative", width: "48px" }}>
            <div style={{
              height: "18px", background: "#A0A0A0",
              border: "2px solid rgba(0,0,0,0.4)", borderBottom: "none",
              borderRadius: "4px 4px 0 0",
            }} />
            <div style={{
              height: "12px", width: "32px", margin: "0 auto",
              background: "#C8C8C8", border: "2px solid rgba(0,0,0,0.3)",
              borderTop: "none", borderRadius: "0 0 3px 3px",
            }} />
          </div>
        </div>

        {/* ── Two-column board layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-8 lg:gap-12">

          {/* ════════════════════════
              LEFT — Polaroid photo board
          ════════════════════════ */}
          <div>
            {/* "MY PROJECTS" sticky label */}
            <div data-reveal style={{ marginBottom: "28px" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#F6F1E3",
                padding: "7px 16px",
                border: "2px solid rgba(61,48,37,0.3)",
                boxShadow: "3px 3px 0 rgba(0,0,0,0.22)",
                transform: "rotate(-1deg)",
              }}>
                <span style={{
                  fontFamily: "var(--font-pixel), monospace",
                  fontSize: "clamp(8px, 1.5vw, 12px)",
                  color: "#3D3025",
                  letterSpacing: "0.06em",
                }}>
                  MY PROJECTS
                </span>
                <span style={{
                  fontFamily: "var(--font-vt323), monospace",
                  fontSize: "22px",
                  color: "#C05090",
                  fontStyle: "italic",
                  lineHeight: 1,
                }}>
                  Recently
                </span>
              </div>
            </div>

            {/* Polaroid grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6" style={{ paddingTop: "12px" }}>
              {PINNED.map((p, i) => (
                <Polaroid
                  key={p.number}
                  project={p}
                  rotation={ROTS[i] ?? 0}
                  pinColor={PIN_COLORS[i % PIN_COLORS.length]}
                  idx={i}
                />
              ))}
            </div>
          </div>

          {/* ════════════════════════
              RIGHT — Project log
          ════════════════════════ */}
          <div>
            {/* "RECENT BUILDS" label */}
            <div data-reveal style={{ marginBottom: "20px" }}>
              <div style={{
                display: "inline-block",
                background: "#F6F1E3",
                padding: "7px 16px",
                border: "2px solid rgba(61,48,37,0.3)",
                boxShadow: "3px 3px 0 rgba(0,0,0,0.22)",
                transform: "rotate(0.8deg)",
              }}>
                <span style={{
                  fontFamily: "var(--font-pixel), monospace",
                  fontSize: "clamp(8px, 1.5vw, 12px)",
                  color: "#3D3025",
                  letterSpacing: "0.06em",
                }}>
                  RECENT BUILDS
                </span>
              </div>
            </div>

            {/* Project list */}
            <div style={{
              background: "rgba(246,241,227,0.88)",
              border: "2px solid rgba(61,48,37,0.25)",
              boxShadow: "4px 4px 0 rgba(0,0,0,0.2)",
              padding: "16px 18px",
            }}>
              {projects.map((p, i) => (
                <ProjectRow key={p.number} project={p} i={i} />
              ))}

              {/* Tech stack badges */}
              <div style={{ paddingTop: "14px", marginTop: "4px", borderTop: "2px dashed rgba(61,48,37,0.25)" }}>
                <div style={{
                  fontFamily: "var(--font-pixel), monospace",
                  fontSize: "7px",
                  color: "rgba(61,48,37,0.5)",
                  letterSpacing: "0.1em",
                  marginBottom: "10px",
                }}>
                  TOOLS &amp; STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {TECH_STACK.map(({ label, icon }) => (
                    <div
                      key={label}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        fontFamily: "var(--font-pixel), monospace",
                        fontSize: "6px",
                        padding: "4px 8px",
                        background: "rgba(61,48,37,0.08)",
                        border: "2px solid rgba(61,48,37,0.2)",
                        color: "#5A3A1A",
                        letterSpacing: "0.04em",
                        boxShadow: "2px 2px 0 rgba(0,0,0,0.15)",
                      }}
                    >
                      <span style={{ fontSize: "12px" }}>{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
