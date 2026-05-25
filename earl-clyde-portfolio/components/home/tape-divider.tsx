"use client";

type Props = {
  text?: string;
  color?: "teal" | "orange" | "yellow";
  rotate?: number;
  className?: string;
};

const COLOR_MAP = {
  teal:   { bg: "var(--teal)",   border: "var(--teal-dark)",   text: "var(--paper)" },
  orange: { bg: "var(--orange)", border: "var(--orange-dark)",  text: "var(--paper)" },
  yellow: { bg: "var(--yellow)", border: "var(--yellow-dark)",  text: "var(--text)"  },
};

export function TapeDivider({
  text = "✦ LEVEL UP ✦",
  color = "teal",
  rotate = -2,
  className = "",
}: Props) {
  const { bg, border, text: textColor } = COLOR_MAP[color];
  const repeated = Array(18).fill(text).join("  ·  ");

  return (
    <div
      className={`tape-divider-wrap${className ? ` ${className}` : ""}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <div
        className="tape-divider-inner"
        style={{
          background: bg,
          borderTop:    `5px solid ${border}`,
          borderBottom: `5px solid ${border}`,
          color:        textColor,
          boxShadow:    `0 6px 0 0 rgba(61,48,37,0.35), 0 -3px 0 0 rgba(61,48,37,0.2)`,
        }}
      >
        <span className="tape-track" style={{ "--tape-text-color": textColor } as React.CSSProperties}>
          {repeated}&nbsp;&nbsp;&nbsp;{repeated}
        </span>
      </div>
    </div>
  );
}
