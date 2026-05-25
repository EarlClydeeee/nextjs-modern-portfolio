import type { PortfolioSectionId } from "@/lib/portfolio-sections";

type Props = { id: PortfolioSectionId };

// ── DATA ─────────────────────────────────────────────────────────

const education = [
  {
    degree: "BS Computer Engineering",
    institution: "Polytechnic University of the Philippines",
    location: "Sta. Mesa, Manila",
    startYear: "2023", endYear: "2027",
    yearColor: "#90C050",
    note: "CHED Merit Scholar · DTI × Google Scholar · CARD SME Scholar · DataCamp Scholar",
    icon: "🎓",
  },
  {
    degree: "Senior High School — STEM",
    institution: "Our Lady of the Holy Rosary School",
    location: "Tanza, Cavite",
    startYear: "2021", endYear: "2023",
    yearColor: "#D4C050",
    note: "Graduated with High Honors · Batch Rank 8 · Grade 11 Highest Honor",
    icon: "📜",
  },
];

const skillStickers = [
  { label: "Frontend Dev",   color: "#5AC8C0" },
  { label: "Backend / API",  color: "#D4A058" },
  { label: "UI / UX",        color: "#9A5AC0" },
  { label: "System Design",  color: "#4A80C0" },
  { label: "Team Lead",      color: "#4A9A5A" },
  { label: "Data Systems",   color: "#C04A4A" },
];

const tools = [
  { label: "React",      icon: "⚛" },
  { label: "Next.js",    icon: "▲" },
  { label: "TypeScript", icon: "🔷" },
  { label: "Supabase",   icon: "⚡" },
  { label: "AWS",        icon: "☁" },
  { label: "Figma",      icon: "🎨" },
];

const experiences = [
  {
    period: "2023 — Present", title: "Development Team",
    company: "AWS Cloud Club — PUP Manila", location: "PUP Manila",
    description: "Shipped the gamified Skill Builder LMS (deployed across 7 departments), the official AWSCC PUP website, and the TEDxPUP event platform. Led development on multiple simultaneous production deployments.",
    tags: ["React", "Astro", "Express.js", "Supabase", "AWS"],
    status: "ACTIVE", accentBg: "#FFF4D0", accentBdr: "#D4A040", nameColor: "#A07820",
  },
  {
    period: "2025 — Present", title: "Software Development Co-Lead",
    company: "PUP Microsoft Student Community", location: "PUP Manila",
    description: "Architected frontend systems with modular component design and scalability-first principles. Co-leads the software development vertical for one of PUP Manila's largest tech communities.",
    tags: ["Next.js", "React", "TypeScript", "Git"],
    status: "ACTIVE", accentBg: "#D8FFE8", accentBdr: "#4A9A5A", nameColor: "#2A7038",
  },
  {
    period: "2025 — Present", title: "Software Engineer & Project Manager",
    company: "ICpEP.SE — PUP Manila", location: "PUP Manila",
    description: "Engineered and project-managed the Certificate Generation Tool — automating bulk certificate creation for large-scale events and eliminating days of manual design work.",
    tags: ["Next.js", "TypeScript", "Figma", "PDF Export"],
    status: "ACTIVE", accentBg: "#EED8FF", accentBdr: "#9A5AC0", nameColor: "#6A2A98",
  },
  {
    period: "2023 — Present", title: "Lead Senior Software Developer",
    company: "ACCESS — PUP", location: "PUP Manila",
    description: "Lead developer for the ACCESS organizational platform — centralized member directory, asset management, and governance workflows — plus the CPE Fair real-time tournament system.",
    tags: ["Next.js", "Supabase", "PostgreSQL", "TypeScript"],
    status: "ACTIVE", accentBg: "#D8F0F0", accentBdr: "#5A8888", nameColor: "#2A6068",
  },
  {
    period: "2025", title: "Software Engineering Front-End Lead",
    company: "Hayakawa Electronics Philippines", location: "Philippines",
    description: "Led frontend development for an industrial output monitoring system tracking 2M+ factory production cycles. Replaced manual reporting with an automated ETL dashboard — 45% efficiency gain.",
    tags: ["HTML", "Tailwind", "JavaScript", "PHP", "MySQL"],
    status: "COMPLETED", accentBg: "#FFE0D4", accentBdr: "#E87858", nameColor: "#C04820",
  },
  {
    period: "2025", title: "Tech Committee Developer",
    company: "AWS User Group Philippines", location: "Philippines",
    description: "Built the AWS Community Day Philippines website and proposed the NFC-based attendance verification system — automated real-time ID checking designed to replace manual registration queues.",
    tags: ["React", "TypeScript", "Next.js", "NFC"],
    status: "COMPLETED", accentBg: "#D8E4FF", accentBdr: "#4A80C0", nameColor: "#2A5090",
  },
];

// ── HELPERS ───────────────────────────────────────────────────────

function ClipboardClip() {
  return (
    <div style={{
      position: "absolute", top: "-22px", left: "50%",
      transform: "translateX(-50%)", zIndex: 5,
    }}>
      <div style={{
        width: "72px", height: "22px",
        background: "linear-gradient(180deg, #D8D8D8 0%, #909090 100%)",
        border: "2px solid #505050", borderBottom: "none",
        borderRadius: "6px 6px 0 0",
        boxShadow: "inset 2px 0 0 rgba(255,255,255,0.25)",
      }} />
      <div style={{
        width: "48px", height: "16px", margin: "0 auto",
        background: "linear-gradient(180deg, #B8B8B8 0%, #787878 100%)",
        border: "2px solid #505050", borderTop: "none",
        borderRadius: "0 0 5px 5px",
      }} />
    </div>
  );
}

function StickerLabel({ label, bg, textColor = "#1A1208", rotate = "-0.5deg" }: {
  label: string; bg: string; textColor?: string; rotate?: string;
}) {
  return (
    <div style={{
      display: "inline-block", background: bg,
      border: "2px solid rgba(0,0,0,0.28)",
      padding: "4px 14px", marginBottom: "12px",
      boxShadow: "3px 3px 0 rgba(0,0,0,0.3)",
      transform: `rotate(${rotate})`,
    }}>
      <span style={{
        fontFamily: "var(--font-pixel),monospace", fontSize: "8px",
        color: textColor, letterSpacing: "0.08em",
      }}>{label}</span>
    </div>
  );
}

// ── MAIN SECTION ──────────────────────────────────────────────────

export function WorkExperienceSection({ id }: Props) {
  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center px-3 sm:px-6 py-12 sm:py-20"
      style={{ background: "#C0966A" }}
    >
      {/* Warm wood-grain texture */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: [
          "repeating-linear-gradient(88deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 32px)",
          "repeating-linear-gradient(2deg, rgba(255,255,255,0.025) 0px, transparent 1px, transparent 42px)",
          "radial-gradient(circle, rgba(0,0,0,0.10) 1px, transparent 1px)",
        ].join(","),
        backgroundSize: "auto, auto, 14px 14px",
      }} />

      <div data-enter="tilt" className="relative z-10 w-full max-w-6xl">
        {/* Page title */}
        <div
          style={{
            fontFamily: "var(--font-pixel),monospace",
            fontSize: "clamp(10px,1.4vw,12px)",
            color: "#5A3A1A",
            letterSpacing: "0.18em",
            textAlign: "center",
            marginBottom: "clamp(20px,4vw,40px)",
            textShadow: "0 0 16px rgba(90,58,26,0.25)",
          }}
        >
          ▸ QUEST LOG ◂
        </div>

        {/* ══════════════════════════════════
            Clipboard container
        ══════════════════════════════════ */}
        <div
          style={{
            background: "#241A08",
            border: "4px solid #C8A060",
            boxShadow: "8px 10px 0 rgba(0,0,0,0.6)",
            position: "relative",
            marginTop: "24px",
          }}
        >
          <ClipboardClip />

          {/* Board padding */}
          <div style={{ padding: "clamp(8px,2vw,24px)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-3 sm:gap-4">

              {/* ════════════════════════
                  LEFT — Education board
              ════════════════════════ */}
              <div style={{
                background: "#F6F1E0",
                border: "2px solid rgba(200,160,96,0.3)",
                padding: "clamp(12px,3vw,20px)",
              }}>

                {/* EDUCATION */}
                <StickerLabel label="EDUCATION" bg="#90C050" rotate="-0.8deg" />
                <div className="flex flex-col gap-4" style={{ marginBottom: "22px" }}>
                  {education.map((item, i) => (
                    <div
                      key={item.institution}
                      data-reveal="left"
                      style={{ transitionDelay: `${i * 100}ms`, display:"flex", gap:"12px", alignItems:"flex-start" }}
                    >
                      {/* Year stack */}
                      <div style={{ flexShrink: 0 }}>
                        <div style={{
                          background: item.yearColor,
                          border: "2px solid rgba(0,0,0,0.22)",
                          padding: "3px 8px",
                          boxShadow: "2px 2px 0 rgba(0,0,0,0.2)",
                          marginBottom: "2px",
                          textAlign: "center",
                        }}>
                          <span style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"6px", color:"#1A1208", letterSpacing:"0.04em" }}>
                            {item.startYear}
                          </span>
                        </div>
                        <div style={{
                          background:"rgba(0,0,0,0.1)", border:"1px solid rgba(0,0,0,0.15)",
                          padding:"2px 8px", textAlign:"center",
                        }}>
                          <span style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"6px", color:"rgba(26,18,8,0.5)", letterSpacing:"0.03em" }}>
                            {item.endYear}
                          </span>
                        </div>
                      </div>
                      {/* Info */}
                      <div>
                        <div style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"7px", color:"#3D3025", letterSpacing:"0.05em", lineHeight:1.7, marginBottom:"2px" }}>
                          {item.icon} {item.degree}
                        </div>
                        <div style={{ fontFamily:"var(--font-vt323),monospace", fontSize:"clamp(18px,3vw,20px)", color:"#5A3A1A", lineHeight:1.2, fontWeight:"bold" }}>
                          {item.institution}
                        </div>
                        <div style={{ fontFamily:"var(--font-vt323),monospace", fontSize:"clamp(15px,2.5vw,16px)", color:"rgba(90,58,26,0.55)", marginTop:"2px" }}>
                          {item.location}
                        </div>
                        <div style={{ fontFamily:"var(--font-vt323),monospace", fontSize:"clamp(14px,2.5vw,15px)", color:"rgba(90,58,26,0.5)", marginTop:"4px", lineHeight:1.5 }}>
                          {item.note}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ borderTop:"1px dashed rgba(90,58,26,0.25)", marginBottom:"18px" }} />

                {/* SKILL */}
                <StickerLabel label="SKILL" bg="#D4C050" rotate="0.6deg" />
                <div style={{ display:"flex", flexWrap:"wrap", gap:"7px", marginBottom:"20px" }}>
                  {skillStickers.map((s, i) => (
                    <div
                      key={s.label}
                      data-reveal="left"
                      style={{
                        transitionDelay: `${i * 60}ms`,
                        background: s.color,
                        border: "2px solid rgba(0,0,0,0.22)",
                        padding: "4px 10px",
                        boxShadow: "2px 2px 0 rgba(0,0,0,0.22)",
                        transform: `rotate(${i % 2 === 0 ? -0.8 : 0.8}deg)`,
                      }}
                    >
                      <span style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"6px", color:"#F0EDE0", letterSpacing:"0.06em" }}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ borderTop:"1px dashed rgba(90,58,26,0.25)", marginBottom:"18px" }} />

                {/* SOFTWARE / TOOLS */}
                <StickerLabel label="SOFTWARE" bg="#5090C8" textColor="#F0F8FF" rotate="-0.4deg" />
                <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
                  {tools.map((t, i) => (
                    <div
                      key={t.label}
                      data-reveal="left"
                      style={{
                        transitionDelay: `${i * 50}ms`,
                        display:"flex", flexDirection:"column", alignItems:"center", gap:"4px",
                        width:"54px",
                      }}
                    >
                      <div style={{
                        width:"44px", height:"44px",
                        background:"rgba(80,144,200,0.12)",
                        border:"2px solid rgba(80,144,200,0.35)",
                        boxShadow:"2px 2px 0 rgba(0,0,0,0.2)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:"20px",
                      }}>
                        {t.icon}
                      </div>
                      <span style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"5px", color:"rgba(90,58,26,0.6)", letterSpacing:"0.04em", textAlign:"center" }}>
                        {t.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ════════════════════════
                  RIGHT — Experience paper
              ════════════════════════ */}
              <div style={{
                background: "#F6F1E3",
                border: "2px solid rgba(0,0,0,0.1)",
                boxShadow: "4px 0 12px rgba(0,0,0,0.15)",
                position: "relative",
              }}>
                {/* Checkmark sticker */}
                <div style={{
                  position:"absolute", top:"12px", right:"12px",
                  width:"36px", height:"36px",
                  background:"#90C050",
                  border:"2px solid rgba(0,0,0,0.25)",
                  boxShadow:"3px 3px 0 rgba(0,0,0,0.25)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  transform:"rotate(8deg)",
                  fontFamily:"var(--font-pixel),monospace", fontSize:"14px", color:"#1A3008",
                }}>✓</div>

                {/* Paper header */}
                <div style={{ padding:"clamp(12px,3vw,20px) clamp(12px,3vw,20px) 14px", borderBottom:"2px solid rgba(61,48,37,0.12)" }}>
                  <div style={{
                    fontFamily:"var(--font-pixel),monospace",
                    fontSize:"clamp(12px,2.5vw,22px)",
                    color:"#2A5890",
                    letterSpacing:"0.06em",
                    textShadow:"2px 2px 0 rgba(42,88,144,0.18)",
                  }}>
                    EXPERIENCE
                  </div>
                  <div style={{ fontFamily:"var(--font-vt323),monospace", fontSize:"17px", color:"rgba(61,48,37,0.4)", marginTop:"3px" }}>
                    Engineering · Development · Leadership
                  </div>
                </div>

                <div style={{ padding:"0 clamp(12px,3vw,20px) clamp(12px,3vw,20px)" }}>

                  {/* All experience entries — single unified design */}
                  {experiences.map((exp, i) => (
                    <div
                      key={`exp-${i}`}
                      data-reveal="right"
                      style={{ transitionDelay: `${i * 80}ms` }}
                    >
                      <div style={{
                        background: exp.accentBg,
                        borderLeft:`4px solid ${exp.accentBdr}`,
                        padding:"clamp(10px,2vw,14px)",
                        margin:"10px 0",
                      }}>
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between" style={{ marginBottom:"5px" }}>
                          <div style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"clamp(7px,1.2vw,8px)", color: exp.nameColor, letterSpacing:"0.05em", lineHeight:1.6 }}>
                            {exp.company}
                          </div>
                          <div style={{
                            background: exp.accentBdr, padding:"2px 8px",
                            alignSelf: "flex-start", flexShrink: 0,
                          }}>
                            <span style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"6px", color:"#F5F0E0", letterSpacing:"0.05em" }}>
                              {exp.period}
                            </span>
                          </div>
                        </div>
                        <div style={{ fontFamily:"var(--font-vt323),monospace", fontSize:"clamp(16px,2.5vw,18px)", color:"rgba(61,48,37,0.6)", lineHeight:1.3, marginBottom:"5px" }}>
                          {exp.title}
                        </div>
                        <p style={{ fontFamily:"var(--font-vt323),monospace", fontSize:"clamp(16px,2.5vw,18px)", color:"rgba(61,48,37,0.65)", lineHeight:1.5, marginBottom:"7px" }}>
                          {exp.description}
                        </p>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
                          {exp.tags.map((tag) => (
                            <span key={tag} style={{
                              fontFamily:"var(--font-pixel),monospace", fontSize:"5px",
                              padding:"3px 6px",
                              background:"rgba(0,0,0,0.07)",
                              border:`1px solid ${exp.accentBdr}60`,
                              color: exp.nameColor, letterSpacing:"0.04em",
                            }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                </div>

                {/* Paper curl bottom */}
                <div style={{ height:"10px", background:"linear-gradient(to bottom, rgba(0,0,0,0.04), transparent)" }} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
