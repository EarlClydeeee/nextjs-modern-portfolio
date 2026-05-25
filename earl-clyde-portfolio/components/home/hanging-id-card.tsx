"use client";

import { useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";

// ─────────────────────────────────────────────────────────────────
//  PHYSICS CONSTANTS  (tuned for 60 fps)
// ─────────────────────────────────────────────────────────────────
const HOOK_H    = 28;     // px — wall-mount hardware height
const REST_LEN  = 96;     // px — rope rest length
const GRAVITY   = 0.42;   // px / frame²
const SPRING_K  = 0.22;   // rope stiffness — softer, more stretch
const DAMPING   = 0.985;  // velocity decay per frame — keeps motion alive for seconds
const MAX_THROW = 60;     // velocity cap on release (px / frame)
const THROW_GAIN = 0.88;  // how much of the tracked drag velocity is transferred

// Reserve space in the document flow for the resting card layout.
// Defaults are sized for the existing ID card content; tweak via props.
const SPACER_DEFAULT = HOOK_H + REST_LEN + 480;

// ─────────────────────────────────────────────────────────────────
//  STATE TYPES
// ─────────────────────────────────────────────────────────────────
interface PhysicsState {
  x:  number; // card top-center position relative to hook
  y:  number;
  vx: number;
  vy: number;
}

interface DragState {
  active:    boolean;
  hookCX:    number; // hook position in viewport coordinates
  hookCY:    number;
  offsetX:   number; // pointer offset from card grip-point
  offsetY:   number;
  prevX:     number;
  prevY:     number;
  prevTime:  number;
  vx:        number;
  vy:        number;
}

// ─────────────────────────────────────────────────────────────────
//  COMPONENT
//
//  Drag the card anywhere — it follows your pointer in 2D, stretching
//  the rope. Release and gravity + a stretchy spring pull it back into
//  a natural pendulum swing. All physics writes go straight to the DOM
//  via refs, so React never re-renders during the simulation.
// ─────────────────────────────────────────────────────────────────
export function HangingIdCard({
  children,
  width        = "clamp(180px, 22vw, 230px)",
  spacerHeight = SPACER_DEFAULT,
}: {
  children:      ReactNode;
  width?:        string;
  spacerHeight?: number;
}) {
  // Refs — physics writes to style directly, zero re-renders per frame
  const outerRef       = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const ropeShadowRef  = useRef<SVGPathElement>(null);
  const ropeBaseRef    = useRef<SVGPathElement>(null);
  const ropeMainRef    = useRef<SVGPathElement>(null);
  const ropeShadeRef   = useRef<SVGPathElement>(null);

  const physics = useRef<PhysicsState>({ x: 0, y: REST_LEN, vx: 0, vy: 0 });
  const drag    = useRef<DragState>({
    active:   false,
    hookCX:   0, hookCY:   0,
    offsetX:  0, offsetY:  0,
    prevX:    0, prevY:    0,
    prevTime: 0,
    vx:       0, vy:       0,
  });
  const rafRef = useRef(0);

  // ── Push physics state into the DOM ─────────────────────────────
  const applyTransform = useCallback(() => {
    const { x, y } = physics.current;
    // Card hangs at the rope-end. Card body rotates to align with rope direction.
    const angle = Math.atan2(x, y);

    if (cardWrapperRef.current) {
      cardWrapperRef.current.style.transform =
        `translate(${x}px, ${y}px) rotate(${angle}rad)`;
      cardWrapperRef.current.style.cursor = drag.current.active ? "grabbing" : "grab";
    }

    // Rope path follows card position; subtle downward sag for natural look.
    const sag  = 4;
    const midX = x * 0.5;
    const midY = y * 0.5 + sag;
    const d    = `M 0 0 Q ${midX} ${midY} ${x} ${y}`;
    ropeShadowRef.current?.setAttribute("d",
      `M 2 3 Q ${midX + 2} ${midY + 3} ${x + 2} ${y + 3}`);
    ropeBaseRef.current?.setAttribute("d",  d);
    ropeMainRef.current?.setAttribute("d",  d);
    ropeShadeRef.current?.setAttribute("d", d);
  }, []);

  // ── RAF loop (gravity + spring-rope + damping) ──────────────────
  useEffect(() => {
    let last = performance.now();

    const tick = (dt: number) => {
      const s = physics.current;
      // Gravity pulls down constantly
      s.vy += GRAVITY * dt;

      // Stretchy "rope" — only pulls when extended past rest length
      const dist = Math.hypot(s.x, s.y);
      if (dist > REST_LEN) {
        const stretch = dist - REST_LEN;
        const force   = stretch * SPRING_K;
        s.vx -= (s.x / dist) * force * dt;
        s.vy -= (s.y / dist) * force * dt;
      }

      // Damping (per-frame approximation; fine at 60 fps)
      s.vx *= DAMPING;
      s.vy *= DAMPING;

      // Integrate
      s.x += s.vx * dt;
      s.y += s.vy * dt;
    };

    const loop = (now: number) => {
      const dt = Math.min(2, (now - last) / 16);
      if (!drag.current.active) tick(dt);
      applyTransform();
      last = now;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyTransform]);

  // ── Pointer handlers (direct 2D follow) ─────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (!outerRef.current) return;

    const r       = outerRef.current.getBoundingClientRect();
    const hookCX  = r.left + r.width / 2;
    const hookCY  = r.top + HOOK_H;
    const px      = e.clientX - hookCX;
    const py      = e.clientY - hookCY;

    drag.current = {
      active:   true,
      hookCX, hookCY,
      // offset = where on the card they grabbed, in card-local coordinates
      offsetX:  px - physics.current.x,
      offsetY:  py - physics.current.y,
      prevX:    physics.current.x,
      prevY:    physics.current.y,
      prevTime: performance.now(),
      vx: 0, vy: 0,
    };
    // Stop any in-flight motion the moment the user grabs it
    physics.current.vx = 0;
    physics.current.vy = 0;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag.current.active) return;
    e.preventDefault();

    // Pointer in hook-relative coordinates
    const px   = e.clientX - drag.current.hookCX;
    const py   = e.clientY - drag.current.hookCY;
    // Card position so the grabbed point stays under the pointer
    const newX = px - drag.current.offsetX;
    const newY = py - drag.current.offsetY;

    const now  = performance.now();
    const dt   = now - drag.current.prevTime;
    if (dt > 0) {
      drag.current.vx = ((newX - drag.current.prevX) / dt) * 16;
      drag.current.vy = ((newY - drag.current.prevY) / dt) * 16;
    }
    physics.current.x      = newX;
    physics.current.y      = newY;
    drag.current.prevX     = newX;
    drag.current.prevY     = newY;
    drag.current.prevTime  = now;

    applyTransform();
  }, [applyTransform]);

  const onPointerUp = useCallback(() => {
    if (!drag.current.active) return;
    // Throw the card with the tracked drag velocity (capped so it stays on screen)
    let vx = drag.current.vx * THROW_GAIN;
    let vy = drag.current.vy * THROW_GAIN;
    const v = Math.hypot(vx, vy);
    if (v > MAX_THROW) {
      vx = (vx / v) * MAX_THROW;
      vy = (vy / v) * MAX_THROW;
    }
    physics.current.vx  = vx;
    physics.current.vy  = vy;
    drag.current.active = false;
  }, []);

  // ─────────────────────────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────────────────────────
  return (
    <div
      ref={outerRef}
      style={{
        position:    "relative",
        flexShrink:   0,
        width,
        userSelect:  "none",
        touchAction: "none",
      }}
    >
      {/* ── Wall-mount hardware (fixed; stays in place) ── */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           0,
          left:          "50%",
          transform:     "translateX(-50%)",
          zIndex:        3,
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          pointerEvents: "none",
        }}
      >
        {/* Screw head */}
        <div style={{
          width:        "13px",
          height:       "13px",
          borderRadius: "50%",
          background:   "radial-gradient(circle at 36% 28%, #F0F0F0, #888)",
          border:       "2px solid #505050",
          boxShadow:    "0 2px 6px rgba(0,0,0,0.55), inset 0 -1px 0 rgba(0,0,0,0.25)",
        }} />
        {/* Hook stem */}
        <div style={{
          width:        "8px",
          height:       "16px",
          marginTop:    "-1px",
          background:   "linear-gradient(180deg, #D0D0D0 0%, #909090 60%, #707070 100%)",
          border:       "1.5px solid #505050",
          borderTop:    "none",
          borderRadius: "0 0 4px 4px",
          boxShadow:    "1px 2px 4px rgba(0,0,0,0.35)",
        }} />
      </div>

      {/* ── Hook origin: physics positions are relative to (0,0) here ── */}
      <div style={{
        position: "absolute",
        top:      `${HOOK_H}px`,
        left:     "50%",
        zIndex:   2,
      }}>
        {/* Rope SVG. overflow:visible so paths can extend anywhere on screen. */}
        <svg
          aria-hidden="true"
          width="1"
          height="1"
          style={{
            position:      "absolute",
            top:           0,
            left:          0,
            overflow:      "visible",
            pointerEvents: "none",
          }}
        >
          <path ref={ropeShadowRef} stroke="rgba(0,0,0,0.22)"        strokeWidth="8"   fill="none" strokeLinecap="round" />
          <path ref={ropeBaseRef}   stroke="#5A3E18"                  strokeWidth="7"   fill="none" strokeLinecap="round" />
          <path ref={ropeMainRef}   stroke="#8B6030"                  strokeWidth="5"   fill="none" strokeLinecap="round" />
          <path ref={ropeShadeRef}  stroke="rgba(255,218,140,0.38)"   strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>

        {/* Card wrapper — physics moves+rotates this; (0,0) = rope endpoint = card top-center */}
        <div
          ref={cardWrapperRef}
          style={{
            position:        "absolute",
            top:             0,
            left:            0,
            transformOrigin: "0 0",
            cursor:          "grab",
            willChange:      "transform",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* translateX(-50%) so the wrapper's (0,0) sits at the visual top-center */}
          <div style={{
            transform:  "translateX(-50%)",
            width,
            position:   "relative",
            paddingTop: "14px", // room for the badge clip hardware
          }}>
            {/* Badge clip hardware — at top of card, where the rope attaches */}
            <div
              aria-hidden="true"
              style={{
                position:      "absolute",
                top:           -2,
                left:          "50%",
                transform:     "translateX(-50%)",
                display:       "flex",
                flexDirection: "column",
                alignItems:    "center",
                pointerEvents: "none",
              }}
            >
              <div style={{
                width:        "20px",
                height:       "10px",
                background:   "linear-gradient(180deg, #D8D8D8 0%, #A0A0A0 100%)",
                border:       "2px solid #606060",
                borderRadius: "2px 2px 0 0",
                boxShadow:    "0 -1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)",
              }} />
              <div style={{
                width:        "24px",
                height:       "8px",
                marginTop:    "-2px",
                background:   "linear-gradient(180deg, #C0C0C0 0%, #888 100%)",
                border:       "2px solid #606060",
                borderTop:    "none",
                borderRadius: "0 0 3px 3px",
                boxShadow:    "0 2px 4px rgba(0,0,0,0.35)",
              }} />
            </div>

            {/* Card content — drop-shadow stays on the card body alone */}
            <div style={{ filter: "drop-shadow(4px 6px 0 rgba(0,0,0,0.38))" }}>
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Reserve space in flow so following content isn't pulled up */}
      <div
        aria-hidden="true"
        style={{
          height:     `${spacerHeight}px`,
          width:      "100%",
          visibility: "hidden",
        }}
      />
    </div>
  );
}
