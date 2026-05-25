"use client";

import type { PortfolioSectionId } from "@/lib/portfolio-sections";
import { HangingIdCard } from "@/components/home/hanging-id-card";

type Props = { id: PortfolioSectionId };

// ─── Pixel portrait ─────────────────────────────────────────────
function PixelPortrait() {
  type R = [number, number, number, number, string];
  const px: R[] = [
    [9,0,14,1,"#8B4513"],[7,1,18,1,"#8B4513"],[6,2,20,3,"#8B4513"],
    [5,3,3,6,"#8B4513"],[24,3,3,6,"#8B4513"],[6,5,2,4,"#8B4513"],[24,5,2,4,"#8B4513"],
    [8,3,16,1,"#E8A878"],[8,4,16,4,"#E8A878"],[7,6,18,8,"#E8A878"],
    [9,7,5,1,"#6B3A1A"],[18,7,5,1,"#6B3A1A"],
    [9,8,5,3,"#F8F4E8"],[18,8,5,3,"#F8F4E8"],
    [11,9,2,2,"#3D3025"],[20,9,2,2,"#3D3025"],
    [10,9,1,1,"#5A4A30"],[19,9,1,1,"#5A4A30"],
    [11,9,1,1,"#FFFFFF"],[20,9,1,1,"#FFFFFF"],
    [14,12,3,1,"#D08060"],[14,13,1,1,"#D08060"],[16,13,1,1,"#D08060"],
    [8,13,3,2,"#F0A090"],[21,13,3,2,"#F0A090"],
    [12,15,7,1,"#C07050"],[13,16,2,1,"#E88870"],[17,16,2,1,"#E88870"],
    [8,17,16,1,"#E8A878"],[9,18,14,1,"#D09870"],
    [13,19,6,2,"#E8A878"],
    [12,20,8,4,"#E8C862"],[13,21,6,5,"#D4A840"],[14,23,4,3,"#E8C862"],
    [4,21,24,19,"#5A8880"],
    [0,22,5,18,"#4A7870"],[27,22,5,18,"#4A7870"],
    [9,21,4,7,"#3A6860"],[19,21,4,7,"#3A6860"],
    [5,22,1,14,"#6A9890"],[26,22,1,14,"#6A9890"],
    [15,25,1,10,"#4A7870"],[7,30,6,5,"#3A6860"],[8,31,4,3,"#4A7870"],
  ];
  return (
    <svg viewBox="0 0 32 40" width="100%" height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated", display: "block" }}>
      <rect width="32" height="40" fill="#C8BE8A" />
      {px.map(([x, y, w, h, fill], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={fill} />
      ))}
    </svg>
  );
}

// ─── Spiral holes ────────────────────────────────────────────────
function SpiralHoles({ count = 14 }: { count?: number }) {
  return (
    <div style={{
      display: "flex",
      gap: "8px",
      padding: "8px 20px",
      background: "#E4DEC8",
      borderBottom: "3px solid #3D3025",
      overflowX: "hidden",
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: "18px",
          height: "22px",
          flexShrink: 0,
          border: "3px solid #3D3025",
          borderRadius: "3px 3px 40% 40%",
          background: "#B8855A",
        }} />
      ))}
    </div>
  );
}

// ─── Contact row ─────────────────────────────────────────────────
function ContactRow({ icon, value, sub }: { icon: string; value: string; sub?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "10px" }}>
      <span style={{ fontSize: "16px", flexShrink: 0, lineHeight: 1.2 }}>{icon}</span>
      <span style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "17px", color: "#5A3A1A", lineHeight: 1.3 }}>
        {value}
        {sub && <span style={{ display: "block", fontSize: "15px", color: "#8A6A40" }}>{sub}</span>}
      </span>
    </div>
  );
}

// ─── Social link button ──────────────────────────────────────────
function SocialBtn({ icon, label, href }: { icon: string; label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-pixel), monospace",
        fontSize: "7px",
        color: "#3878D0",
        textDecoration: "none",
        border: "2px solid #3878D0",
        padding: "8px 12px",
        background: "rgba(56,120,208,0.06)",
        letterSpacing: "0.04em",
        transition: "background 0.1s, color 0.1s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "#3878D0";
        (e.currentTarget as HTMLAnchorElement).style.color = "#F5F2E6";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(56,120,208,0.06)";
        (e.currentTarget as HTMLAnchorElement).style.color = "#3878D0";
      }}
    >
      {icon} {label}
    </a>
  );
}

export function IntroSection({ id }: Props) {
  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 py-10 sm:py-16"
      style={{ background: "#B8855A" }}
    >
      {/* Wood grain texture */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: [
          "repeating-linear-gradient(88deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 32px)",
          "repeating-linear-gradient(1deg, rgba(255,255,255,0.025) 0px, transparent 1px, transparent 42px)",
        ].join(","),
      }} />

      <div className="relative z-10 w-full max-w-5xl">
        <div data-enter="rise" className="flex flex-col lg:flex-row items-stretch lg:items-start justify-center gap-5 lg:gap-8">

          {/* ══════════════════════════════════════════
              ID CARD  (physics — drag to swing)
              Hidden on mobile; shown sm and above
          ══════════════════════════════════════════ */}
          <div className="hidden sm:block self-center lg:self-auto">
          <HangingIdCard width="clamp(180px, 22vw, 230px)">
            {/* Card */}
            <div style={{
              background: "#F6F1E3",
              border: "3px solid #3D3025",
              padding: "12px",
            }}>
              {/* Photo */}
              <div style={{
                border: "3px solid #3D3025",
                overflow: "hidden",
                marginBottom: "10px",
                aspectRatio: "3/4",
                background: "#C8BE8A",
              }}>
                <PixelPortrait />
              </div>

              {/* Name */}
              <div style={{
                textAlign: "center",
                paddingBottom: "10px",
                marginBottom: "10px",
                borderBottom: "2px dashed #C8B890",
              }}>
                <div style={{
                  fontFamily: "var(--font-pixel), monospace",
                  fontSize: "7px",
                  color: "#3D3025",
                  letterSpacing: "0.06em",
                  lineHeight: 1.8,
                }}>
                  EARL CLYDE
                </div>
                <div style={{
                  fontFamily: "var(--font-vt323), monospace",
                  fontSize: "15px",
                  color: "#8A6A40",
                  lineHeight: 1.2,
                }}>
                  Software Engineer
                </div>
              </div>

              {/* Contact header */}
              <div style={{
                fontFamily: "var(--font-pixel), monospace",
                fontSize: "8px",
                color: "#C05090",
                letterSpacing: "0.06em",
                marginBottom: "10px",
              }}>
                Contact
              </div>

              <ContactRow icon="✉️" value="earlclyde.mbanez" sub="@gmail.com" />
              <ContactRow icon="📞" value="+63 991 805 4458" />
              <ContactRow icon="🐙" value="github.com" sub="/EarlClydeeee" />
              <ContactRow icon="💼" value="linkedin.com" sub="/in/earl-clyde-bañez" />
              <ContactRow icon="📍" value="PUP Manila" sub="Philippines" />

              {/* Status */}
              <div style={{
                marginTop: "10px",
                paddingTop: "8px",
                borderTop: "2px dashed #C8B890",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}>
                <div style={{
                  width: "8px", height: "8px",
                  background: "#50C850",
                  border: "2px solid #3D3025",
                  animation: "pulse 2s infinite",
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: "var(--font-pixel), monospace",
                  fontSize: "6px",
                  color: "#50C050",
                  letterSpacing: "0.05em",
                }}>
                  OPEN TO WORK
                </span>
              </div>
            </div>
          </HangingIdCard>
          </div>

          {/* ══════════════════════════════════════════
              MOBILE — compact inline card (sm:hidden)
          ══════════════════════════════════════════ */}
          <div className="sm:hidden w-full self-center" style={{
            border: "3px solid #3D3025",
            background: "#F6F1E3",
            filter: "drop-shadow(4px 5px 0 rgba(0,0,0,0.30))",
          }}>
            <div style={{ display: "flex", gap: "12px", padding: "14px" }}>
              {/* Small pixel portrait */}
              <div style={{
                width: "72px", flexShrink: 0,
                border: "3px solid #3D3025",
                background: "#C8BE8A",
                aspectRatio: "3/4",
              }}>
                <PixelPortrait />
              </div>
              {/* Name + status */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-pixel), monospace", fontSize: "7px", color: "#3D3025", letterSpacing: "0.06em", lineHeight: 1.8 }}>
                  EARL CLYDE
                </div>
                <div style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "17px", color: "#8A6A40", lineHeight: 1.2, marginBottom: "6px" }}>
                  Software Engineer
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "8px" }}>
                  <div style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "15px", color: "#5A3A1A" }}>✉️ earlclyde.mbanez@gmail.com</div>
                  <div style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "15px", color: "#5A3A1A" }}>📍 PUP Manila, Philippines</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: "7px", height: "7px", background: "#50C850", border: "2px solid #3D3025", animation: "pulse 2s infinite", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-pixel), monospace", fontSize: "6px", color: "#50C050", letterSpacing: "0.05em" }}>OPEN TO WORK</span>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              SPIRAL NOTEBOOK
          ══════════════════════════════════════════ */}
          <div className="w-full min-w-0" style={{
            flex: 1,
            border: "3px solid #3D3025",
            background: "#F5F2E6",
            filter: "drop-shadow(6px 8px 0 rgba(0,0,0,0.30))",
          }}>
            <SpiralHoles count={18} />

            {/* Graph paper content */}
            <div style={{
              backgroundImage: [
                "linear-gradient(rgba(100,100,200,0.07) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(100,100,200,0.07) 1px, transparent 1px)",
              ].join(","),
              backgroundSize: "28px 28px",
              padding: "clamp(14px,4vw,28px) clamp(14px,4vw,32px) clamp(20px,4vw,32px)",
            }}>

              {/* Hi, I'm */}
              <p style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: "30px",
                fontStyle: "italic",
                color: "#C05090",
                marginBottom: "2px",
                lineHeight: 1,
              }}>
                Hi, I&apos;m
              </p>

              {/* Name */}
              <h1 style={{
                fontFamily: "var(--font-pixel), monospace",
                fontSize: "clamp(18px, 4vw, 34px)",
                color: "#2A68C0",
                letterSpacing: "0.04em",
                lineHeight: 1.3,
                marginBottom: "22px",
                textShadow: "3px 3px 0 #1A3E80, 5px 5px 0 rgba(0,0,0,0.20)",
              }}>
                EARL<br />CLYDE
              </h1>

              {/* Bio */}
              <p style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: "clamp(18px,3vw,20px)",
                color: "#3D3025",
                lineHeight: 1.65,
                marginBottom: "10px",
              }}>
                I&apos;m a Computer Engineering student at PUP Manila — and I&apos;ve been shipping
                production systems for the past 3 years. Not side projects. Not tutorials.
                Real platforms that organizations, factories, and events depend on.
              </p>
              <p style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: "clamp(18px,3vw,20px)",
                color: "#3D3025",
                lineHeight: 1.65,
                marginBottom: "10px",
              }}>
                At{" "}
                <span style={{ color: "#D4785A", fontStyle: "italic" }}>Hayakawa Electronics</span>
                , I led the frontend of a factory output monitoring system tracking{" "}
                <span style={{ color: "#D4785A", fontStyle: "italic" }}>2M+ production cycles</span>{" "}
                — cutting reporting time by 45%. Across student organizations, I&apos;ve built
                membership platforms, gamified learning systems, event infrastructure, certificate
                automation, and real-time tournament tools. Each one solving a specific operational problem.
              </p>
              <p style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: "clamp(18px,3vw,20px)",
                color: "#3D3025",
                lineHeight: 1.65,
                marginBottom: "20px",
              }}>
                I work across the full stack —{" "}
                <span style={{ color: "#5A8880" }}>React</span>,{" "}
                <span style={{ color: "#5A8880" }}>Next.js</span>,{" "}
                <span style={{ color: "#5A8880" }}>TypeScript</span>,{" "}
                <span style={{ color: "#5A8880" }}>Supabase</span>,{" "}
                <span style={{ color: "#5A8880" }}>AWS</span>{" "}
                — and I&apos;m building toward AI-augmented systems and cloud-native infrastructure.
                I don&apos;t just write code. I engineer outcomes.
              </p>

              {/* Social links */}
              <div className="flex flex-col sm:flex-row flex-wrap" style={{
                gap: "8px",
                paddingTop: "14px",
                borderTop: "2px dashed #C8B890",
                marginBottom: "16px",
              }}>
                <SocialBtn icon="🐙" label="EarlClydeeee" href="https://github.com/EarlClydeeee" />
                <SocialBtn icon="💼" label="LinkedIn" href="https://www.linkedin.com/in/earl-clyde-ba%C3%B1ez/" />
                <SocialBtn icon="☁" label="AWS CC PUP" href="https://awsccpup.com" />
              </div>

              {/* ── Skill inventory ── */}
              <div style={{ borderTop: "2px dashed #C8B890", paddingTop: "16px" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}>
                  <span style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"7px", color:"#5A3A1A", letterSpacing:"0.1em" }}>
                    ▶ CAPABILITY STACK
                  </span>
                  <span style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"6px", color:"rgba(90,58,26,0.4)", letterSpacing:"0.05em" }}>
                    25 TOOLS
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { cat: "LANGUAGES",  color: "#4A7088", skills: ["JS","TS","Python","PHP","SQL"] },
                    { cat: "FRONTEND",   color: "#5A8880", skills: ["React","Next.js","Astro","Tailwind","HTML5"] },
                    { cat: "BACKEND",    color: "#C08A58", skills: ["Node","Express","FastAPI","Flask","REST"] },
                    { cat: "DATA·CLOUD", color: "#3D7A6A", skills: ["PostgreSQL","MySQL","Supabase","AWS","Vercel"] },
                    { cat: "TOOLS",      color: "#7A6A55", skills: ["Git","TanStack","Axios","ExcelJS","Figma"] },
                  ].map(({ cat, color, skills }) => (
                    <div key={cat}>
                      <div style={{
                        background: color, border: "2px solid rgba(61,48,37,0.25)",
                        padding: "3px 5px", marginBottom: "5px", textAlign: "center",
                        fontFamily: "var(--font-pixel),monospace", fontSize: "5px",
                        color: "#F5F0E0", letterSpacing: "0.05em",
                      }}>
                        {cat}
                      </div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
                        {skills.map((s) => (
                          <div key={s} title={s} style={{
                            width:"clamp(38px,8vw,44px)", height:"clamp(38px,8vw,44px)",
                            background: color,
                            border: "2px solid rgba(61,48,37,0.2)",
                            boxShadow: "2px 2px 0 rgba(0,0,0,0.15)",
                            display:"flex", alignItems:"center", justifyContent:"center",
                            fontFamily:"var(--font-pixel),monospace", fontSize:"5px",
                            color:"#F5F0E0", textAlign:"center", padding:"3px",
                          }}>
                            {s}
                          </div>
                        ))}
                      </div>
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
