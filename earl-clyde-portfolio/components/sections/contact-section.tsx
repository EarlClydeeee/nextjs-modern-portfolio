"use client";

import type { PortfolioSectionId } from "@/lib/portfolio-sections";

type ContactSectionProps = { id: PortfolioSectionId };

const socials = [
  { label: "GitHub",      href: "https://github.com/EarlClydeeee", icon: "◈", color: "#3D3025", external: true },
  { label: "LinkedIn",    href: "https://www.linkedin.com/in/earl-clyde-ba%C3%B1ez/", icon: "▣", color: "#5A8880", external: true },
  { label: "AWS CC PUP",  href: "https://awsccpup.com", icon: "☁", color: "#C08A58", external: true },
  { label: "Portfolio",   href: "#hero", icon: "◉", color: "#4A7088", external: false },
];

export function ContactSection({ id }: ContactSectionProps) {
  return (
    <section
      id={id}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
    >
      <div data-enter="pop" className="w-full max-w-3xl">
        {/* Section title */}
        <div className="game-section-title mb-10">
          GAME OVER
        </div>

        {/* Credits panel */}
        <div className="pixel-panel overflow-hidden">
          {/* Header banner */}
          <div
            className="px-6 py-5 text-center"
            style={{
              background: "var(--teal)",
              borderBottom: "3px solid var(--border)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-pixel), monospace",
                fontSize: "11px",
                color: "var(--paper)",
                letterSpacing: "0.1em",
              }}
            >
              ~ THANKS FOR PLAYING ~
            </p>
          </div>

          <div className="p-8 flex flex-col gap-8">
            {/* Big CTA */}
            <div className="text-center">
              <h2
                style={{
                  fontFamily: "var(--font-pixel), monospace",
                  fontSize: "clamp(18px, 3.5vw, 28px)",
                  color: "var(--text)",
                  letterSpacing: "0.06em",
                  lineHeight: "1.6",
                  textShadow: "3px 3px 0 var(--panel-dark)",
                }}
              >
                LET&apos;S BUILD<br />
                <span style={{ color: "var(--orange)" }}>SOMETHING REAL.</span>
              </h2>
            </div>

            <hr className="pixel-divider" />

            {/* Email */}
            <div className="flex flex-col gap-3">
              <div
                style={{
                  fontFamily: "var(--font-pixel), monospace",
                  fontSize: "9px",
                  color: "var(--teal)",
                  letterSpacing: "0.08em",
                }}
              >
                ▶ SEND MESSAGE
              </div>
            <a
              href="mailto:earlclyde.mbanez@gmail.com"
              style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: "26px",
                color: "var(--text)",
                textDecoration: "none",
                transition: "color 120ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
            >
              ✉ earlclyde.mbanez@gmail.com
            </a>
            <a
              href="tel:+639918054458"
              style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: "22px",
                color: "var(--text-muted)",
                textDecoration: "none",
                display: "block",
                marginTop: "8px",
                transition: "color 120ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              📞 +63 991 805 4458
            </a>
            <p
              style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: "19px",
                color: "var(--text-muted)",
                lineHeight: "1.5",
              }}
            >
              Open to internships and early-career engineering roles where real
              systems get built. No demo apps — just engineering that ships.
            </p>
            <p
              style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: "17px",
                color: "var(--text-muted)",
                lineHeight: "1.5",
                marginTop: "6px",
              }}
            >
              Available for internships · freelance · full-time roles ·
              engineering collaborations. CpE student at PUP Manila · Reply within 24 hrs.
            </p>
            </div>

            <hr className="pixel-divider" />

            {/* Socials */}
            <div>
              <div
                className="mb-4"
                style={{
                  fontFamily: "var(--font-pixel), monospace",
                  fontSize: "9px",
                  color: "var(--teal)",
                  letterSpacing: "0.08em",
                }}
              >
                ▶ FIND ME ONLINE
              </div>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ label, href, icon, color, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="pixel-btn"
                    style={{ background: color, justifyContent: "flex-start" }}
                  >
                    <span className="text-base">{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2"
            style={{
              borderTop: "3px solid var(--border)",
              background: "var(--panel-mid)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-pixel), monospace",
                fontSize: "7px",
                color: "var(--text-muted)",
                letterSpacing: "0.08em",
              }}
            >
              © 2026 EARL CLYDE · PUP MANILA
            </span>
            <span
              style={{
                fontFamily: "var(--font-pixel), monospace",
                fontSize: "7px",
                color: "var(--text-muted)",
                letterSpacing: "0.08em",
              }}
            >
              DESIGNED &amp; BUILT BY EARL CLYDE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
