import type { PortfolioSectionId } from "@/lib/portfolio-sections";

type EducationSectionProps = { id: PortfolioSectionId };

const education = [
  {
    degree: "BS Computer Engineering",
    institution: "Polytechnic University of the Philippines",
    location: "Sta. Mesa, Manila",
    startYear: "2023",
    endYear: "2027",
    note: "Relevant Coursework: Programming Logic & Design, OOP, Data Structures & Algorithms",
    scholarships: ["CHED Merit Scholar", "DTI × Google Scholar", "CARD SME Scholar", "DataCamp Scholar"],
    highlight: true,
    icon: "🎓",
  },
  {
    degree: "Senior High School — STEM",
    institution: "Our Lady of the Holy Rosary School",
    location: "Tanza, Cavite",
    startYear: "2021",
    endYear: "2023",
    note: "Graduated with High Honors · Batch Rank 8 · Grade 11 Highest Honor · Batch Rank 3",
    scholarships: [],
    highlight: false,
    icon: "📜",
  },
];

const coursework = [
  "Programming Logic & Design",
  "Object-Oriented Programming",
  "Data Structures & Algorithms",
  "Computer Architecture",
  "Digital Electronics",
  "Embedded Systems",
];

const skills = [
  { label: "Frontend Dev",   color: "#5AC8C0" },
  { label: "Backend / API",  color: "#D4A058" },
  { label: "UI / UX Design", color: "#9A5AC0" },
  { label: "System Design",  color: "#4A80C0" },
  { label: "Team Lead",      color: "#4A9A5A" },
  { label: "Data Systems",   color: "#C04A4A" },
];

// ─── Clipboard metal clip ────────────────────────────────────────
function ClipboardClip() {
  return (
    <div style={{
      position: "absolute", top: "-20px", left: "50%",
      transform: "translateX(-50%)", zIndex: 5,
    }}>
      <div style={{
        width: "64px", height: "20px",
        background: "linear-gradient(180deg, #D8D8D8, #909090)",
        border: "2px solid #505050",
        borderBottom: "none", borderRadius: "5px 5px 0 0",
        boxShadow: "2px 0 0 rgba(255,255,255,0.25) inset",
      }} />
      <div style={{
        width: "44px", height: "14px", margin: "0 auto",
        background: "linear-gradient(180deg, #B8B8B8, #787878)",
        border: "2px solid #505050",
        borderTop: "none", borderRadius: "0 0 4px 4px",
      }} />
    </div>
  );
}

// ─── Sticker header (like colored label boxes in reference) ─────
function StickerLabel({
  label, bg, textColor = "#1A1208", rotate = "-0.5deg",
}: { label: string; bg: string; textColor?: string; rotate?: string }) {
  return (
    <div style={{
      display: "inline-block",
      background: bg,
      border: "2px solid rgba(0,0,0,0.3)",
      padding: "4px 14px",
      marginBottom: "14px",
      boxShadow: "3px 3px 0 rgba(0,0,0,0.35)",
      transform: `rotate(${rotate})`,
    }}>
      <span style={{
        fontFamily: "var(--font-pixel), monospace",
        fontSize: "9px",
        color: textColor,
        letterSpacing: "0.08em",
      }}>
        {label}
      </span>
    </div>
  );
}

export function EducationSection({ id }: EducationSectionProps) {
  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-20"
      style={{ background: "#0E0A04" }}
    >
      {/* Subtle warm-dark texture */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: [
          "radial-gradient(ellipse 60% 40% at 20% 30%, rgba(212,160,40,0.04) 0%, transparent 70%)",
          "radial-gradient(ellipse 50% 35% at 80% 70%, rgba(144,192,80,0.04) 0%, transparent 70%)",
        ].join(","),
      }} />

      <div className="relative z-10 w-full max-w-4xl">
        {/* Section title */}
        <div
          className="game-section-title mb-12"
          data-reveal
          style={{ color: "#C8A060", textShadow: "0 0 20px rgba(200,160,96,0.3)" }}
        >
          TUTORIAL LOG
        </div>

        {/* Clipboard board */}
        <div
          data-reveal="scale"
          style={{
            background: "#241A08",
            border: "4px solid #C8A060",
            boxShadow: "6px 8px 0 rgba(0,0,0,0.55)",
            position: "relative",
            marginTop: "22px",
          }}
        >
          <ClipboardClip />

          {/* Board paper inset */}
          <div style={{
            margin: "20px",
            background: "#F6F1E0",
            border: "2px solid rgba(200,160,96,0.35)",
            padding: "24px",
          }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* ── LEFT: Education timeline ── */}
              <div>
                <StickerLabel label="EDUCATION" bg="#90C050" rotate="-0.8deg" />

                <div className="flex flex-col gap-5">
                  {education.map((item, i) => (
                    <div
                      key={item.institution}
                      data-reveal="left"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        {/* Year range badge */}
                        <div style={{ flexShrink: 0 }}>
                          <div style={{
                            background: item.highlight ? "#90C050" : "#D4C050",
                            border: "2px solid rgba(0,0,0,0.25)",
                            padding: "3px 8px",
                            boxShadow: "2px 2px 0 rgba(0,0,0,0.2)",
                            marginBottom: "2px",
                          }}>
                            <span style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"6px", color:"#1A1208", letterSpacing:"0.06em" }}>
                              {item.startYear}
                            </span>
                          </div>
                          <div style={{
                            background: "rgba(0,0,0,0.12)",
                            border: "1px solid rgba(0,0,0,0.15)",
                            padding: "2px 8px",
                            textAlign: "center",
                          }}>
                            <span style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"6px", color:"rgba(26,18,8,0.55)", letterSpacing:"0.04em" }}>
                              {item.endYear}
                            </span>
                          </div>
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontFamily: "var(--font-pixel),monospace",
                            fontSize: "7px", color: "#3D3025",
                            letterSpacing: "0.05em", lineHeight: 1.7,
                            marginBottom: "2px",
                          }}>
                            {item.icon} {item.degree}
                          </div>
                          <div style={{ fontFamily:"var(--font-vt323),monospace", fontSize:"20px", color:"#5A3A1A", lineHeight:1.2, fontWeight:"bold" }}>
                            {item.institution}
                          </div>
                          <div style={{ fontFamily:"var(--font-vt323),monospace", fontSize:"17px", color:"rgba(90,58,26,0.6)", marginTop:"2px" }}>
                            {item.location}
                          </div>
                          <div style={{ fontFamily:"var(--font-vt323),monospace", fontSize:"16px", color:"rgba(90,58,26,0.5)", marginTop:"4px", lineHeight:1.4 }}>
                            {item.note}
                          </div>
                        </div>
                      </div>

                      {/* Scholarship mini-badges */}
                      {item.scholarships.length > 0 && (
                        <div style={{ paddingLeft:"52px", display:"flex", flexWrap:"wrap", gap:"5px", marginTop:"8px" }}>
                          {item.scholarships.map((s) => (
                            <span key={s} style={{
                              fontFamily:"var(--font-pixel),monospace", fontSize:"6px",
                              padding:"2px 6px",
                              background:"#D4C050",
                              border:"1px solid rgba(0,0,0,0.2)",
                              color:"#1A1208",
                              letterSpacing:"0.04em",
                              boxShadow:"2px 2px 0 rgba(0,0,0,0.15)",
                            }}>
                              🏅 {s}
                            </span>
                          ))}
                        </div>
                      )}

                      {i < education.length - 1 && (
                        <div style={{ borderTop:"1px dashed rgba(90,58,26,0.25)", marginTop:"14px" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: Skills + Coursework ── */}
              <div>
                <StickerLabel label="SKILL SET" bg="#D4C050" rotate="0.5deg" />

                <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"22px" }}>
                  {skills.map((s) => (
                    <div
                      key={s.label}
                      data-reveal="right"
                      style={{
                        background: s.color,
                        border: "2px solid rgba(0,0,0,0.25)",
                        padding: "5px 12px",
                        boxShadow: "3px 3px 0 rgba(0,0,0,0.25)",
                        transform: `rotate(${(skills.indexOf(s) % 2 === 0 ? -1 : 1) * 0.8}deg)`,
                      }}
                    >
                      <span style={{
                        fontFamily:"var(--font-pixel),monospace",
                        fontSize:"7px", color:"#F5F0E0",
                        letterSpacing:"0.06em",
                      }}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                <StickerLabel label="COURSEWORK" bg="#5090C8" textColor="#F0F8FF" rotate="-0.3deg" />

                <div style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
                  {coursework.map((c, i) => (
                    <div
                      key={c}
                      data-reveal="right"
                      style={{
                        transitionDelay: `${i * 60}ms`,
                        display:"flex", alignItems:"center", gap:"8px",
                      }}
                    >
                      <span style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"8px", color:"#5090C8" }}>▸</span>
                      <span style={{ fontFamily:"var(--font-vt323),monospace", fontSize:"19px", color:"#3D3025", lineHeight:1.4 }}>
                        {c}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Paper tape decoration */}
                <div style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}>
                  <div style={{
                    background: "rgba(212,192,80,0.4)",
                    border: "1px solid rgba(212,192,80,0.6)",
                    padding: "4px 28px",
                    fontFamily: "var(--font-pixel),monospace",
                    fontSize: "6px",
                    color: "rgba(90,58,26,0.5)",
                    letterSpacing: "0.1em",
                    transform: "rotate(-0.5deg)",
                  }}>
                    BS CpE · CLASS OF 2027
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
