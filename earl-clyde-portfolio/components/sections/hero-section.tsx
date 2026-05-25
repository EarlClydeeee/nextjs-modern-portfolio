"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import type { PortfolioSectionId } from "@/lib/portfolio-sections";

// ─────────────────────────────────────────────────────────────────
//  GAME CONSTANTS
// ─────────────────────────────────────────────────────────────────
const GW = 800;
const GH = 500;
const GRAVITY     = 0.42;
const JUMP_FORCE  = -9.8;
const MOVE_SPEED  = 3.0;
const MAX_FALL    = 13;

const PLATFORMS = [
  { x: 0,   y: 378, w: GW,  h: GH  }, // ground
  { x: 68,  y: 308, w: 114, h: 14  },
  { x: 338, y: 328, w: 102, h: 14  },
  { x: 586, y: 276, w: 132, h: 14  },
] as const;

// ─────────────────────────────────────────────────────────────────
//  GAME STATE  (plain objects — zero React re-renders in hot path)
// ─────────────────────────────────────────────────────────────────
interface GameState {
  player: {
    x: number; y: number; vx: number; vy: number;
    onGround: boolean; facing: 1 | -1;
    frame: number; frameTimer: number;
    walkDir: 1 | -1; walkTimer: number;
    coins: number;
  };
  enemy: {
    x: number; y: number; vx: number;
    frame: number; frameTimer: number;
  };
  coins: Array<{
    x: number; y: number; bobT: number;
    collected: boolean; collectAnim: number;
  }>;
  clouds: Array<{ x: number; y: number; w: number; h: number; speed: number }>;
  joystick: { x: number; y: number }; // normalized -1..1
  time: number;
}

function createInitialState(): GameState {
  return {
    player: {
      x: 260, y: 310, vx: 0, vy: 0,
      onGround: false, facing: 1,
      frame: 0, frameTimer: 0,
      walkDir: 1, walkTimer: 180,
      coins: 0,
    },
    enemy: { x: 490, y: 328, vx: 1.1, frame: 0, frameTimer: 0 },
    coins: [
      { x: 104, y: 288, bobT: 0.0, collected: false, collectAnim: 0 },
      { x: 122, y: 288, bobT: 0.6, collected: false, collectAnim: 0 },
      { x: 140, y: 288, bobT: 1.2, collected: false, collectAnim: 0 },
      { x: 382, y: 306, bobT: 0.5, collected: false, collectAnim: 0 },
      { x: 400, y: 306, bobT: 1.1, collected: false, collectAnim: 0 },
      { x: 638, y: 254, bobT: 0.3, collected: false, collectAnim: 0 },
      { x: 660, y: 250, bobT: 0.9, collected: false, collectAnim: 0 },
      { x: 200, y: 352, bobT: 0.2, collected: false, collectAnim: 0 },
      { x: 520, y: 352, bobT: 0.7, collected: false, collectAnim: 0 },
    ],
    clouds: [
      { x:  60, y:  68, w: 145, h: 58, speed: 0.18 },
      { x: 380, y:  52, w: 175, h: 68, speed: 0.13 },
      { x: 650, y:  86, w: 115, h: 46, speed: 0.21 },
    ],
    joystick: { x: 0, y: 0 },
    time: 0,
  };
}

// ─────────────────────────────────────────────────────────────────
//  PLATFORM COLLISION
// ─────────────────────────────────────────────────────────────────
const PW = 22; // player width
const PH = 48; // player height

function resolvePlatforms(gs: GameState) {
  const p = gs.player;
  p.onGround = false;
  for (const plat of PLATFORMS) {
    const overlapX = p.x + PW > plat.x && p.x < plat.x + plat.w;
    const feetY    = p.y + PH;
    const wasAbove = feetY - p.vy <= plat.y + 2;
    if (overlapX && wasAbove && feetY >= plat.y && feetY <= plat.y + 18) {
      p.y        = plat.y - PH;
      p.vy       = 0;
      p.onGround = true;
    }
  }
}

interface GameInput {
  moveX: number;
  jump: boolean;
}

function mergeInput(
  joystick: { x: number; y: number },
  actionJump: boolean,
  keyboard: { left: boolean; right: boolean; jump: boolean },
): GameInput {
  let moveX = joystick.x;
  if (keyboard.left) moveX -= 1;
  if (keyboard.right) moveX += 1;
  moveX = Math.max(-1, Math.min(1, moveX));
  const jump = actionJump || keyboard.jump || joystick.y < -0.5;
  return { moveX, jump };
}

const TOTAL_COINS = 9;

// ─────────────────────────────────────────────────────────────────
//  UPDATE TICK  (pure function — no React, no DOM)
// ─────────────────────────────────────────────────────────────────
function tick(
  gs: GameState,
  input: GameInput,
  playable: boolean,
) {
  const p  = gs.player;
  const en = gs.enemy;
  gs.time++;

  // ── Player input ──────────────────────────────────────────────
  const hasInput = Math.abs(input.moveX) > 0.08 || input.jump;

  if (playable) {
    if (hasInput) {
      p.vx = input.moveX * MOVE_SPEED;
      if (input.jump && p.onGround) p.vy = JUMP_FORCE;
      if (Math.abs(input.moveX) > 0.08) p.facing = input.moveX > 0 ? 1 : -1;
    } else {
      p.vx = 0;
    }
  } else if (hasInput) {
    p.vx = input.moveX * MOVE_SPEED;
    if (input.jump && p.onGround) p.vy = JUMP_FORCE;
    if (Math.abs(input.moveX) > 0.08) p.facing = input.moveX > 0 ? 1 : -1;
    p.walkTimer = 180;
  } else {
    // Demo auto-walk before the game starts
    p.walkTimer--;
    if (p.walkTimer <= 0) {
      p.walkDir   = p.walkDir === 1 ? -1 : 1;
      p.walkTimer = 140 + Math.floor(Math.random() * 100);
      if (p.onGround && Math.random() > 0.4) p.vy = JUMP_FORCE;
    }
    p.vx     = p.walkDir * MOVE_SPEED * 0.75;
    p.facing = p.walkDir;
  }

  // ── Physics ───────────────────────────────────────────────────
  p.vy = Math.min(p.vy + GRAVITY, MAX_FALL);
  p.x += p.vx;
  p.y += p.vy;

  // Wall clamp
  p.x = Math.max(4, Math.min(GW - PW - 4, p.x));

  resolvePlatforms(gs);

  // Wrap around if player falls off bottom
  if (p.y > GH + 20) { p.x = 260; p.y = 310; p.vy = 0; }

  // Walk animation frame
  if (Math.abs(p.vx) > 0.1) {
    p.frameTimer++;
    if (p.frameTimer >= 10) { p.frame = (p.frame + 1) % 2; p.frameTimer = 0; }
  } else {
    p.frame = 0;
  }

  // ── Enemy (bounces on right platform) ─────────────────────────
  en.x += en.vx;
  if (en.x < 590 || en.x > 688) en.vx *= -1;
  en.frameTimer++;
  if (en.frameTimer >= 18) { en.frame = (en.frame + 1) % 2; en.frameTimer = 0; }

  // ── Coins ─────────────────────────────────────────────────────
  for (const c of gs.coins) {
    c.bobT += 0.05;
    if (!c.collected) {
      const dx = (p.x + PW / 2) - c.x;
      const bobY = c.y + Math.sin(c.bobT) * 4;
      const dy = (p.y + PH / 2) - bobY;
      if (Math.sqrt(dx * dx + dy * dy) < 24) {
        c.collected = true;
        c.collectAnim = 0;
        p.coins++;
      }
    } else if (c.collectAnim < 1) {
      c.collectAnim = Math.min(c.collectAnim + 0.14, 1);
    }
  }

  // ── Clouds ────────────────────────────────────────────────────
  for (const cl of gs.clouds) {
    cl.x += cl.speed;
    if (cl.x > GW + cl.w) cl.x = -cl.w;
  }
}

// ─────────────────────────────────────────────────────────────────
//  CANVAS DRAW
// ─────────────────────────────────────────────────────────────────
function draw(ctx: CanvasRenderingContext2D, gs: GameState) {
  const p  = gs.player;
  const en = gs.enemy;
  ctx.clearRect(0, 0, GW, GH);

  // Sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, GH);
  sky.addColorStop(0,    "#B8D8E8");
  sky.addColorStop(0.55, "#E0D09A");
  sky.addColorStop(1,    "#C8B880");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, GW, GH);

  // Sun
  ctx.fillStyle = "#F8E060"; ctx.beginPath(); ctx.arc(680, 76, 38, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#FFF0A0"; ctx.beginPath(); ctx.arc(676, 72, 28, 0, Math.PI * 2); ctx.fill();

  // Background mountains
  const mtnColors = ["#A0B888", "#90A878", "#A8B890"];
  const mtns = [[0,340,140,195],[110,340,260,175],[420,340,600,190],[580,340,760,205]];
  mtns.forEach(([x1,y1,mx,my], i) => {
    ctx.fillStyle = mtnColors[i % 3];
    ctx.globalAlpha = 0.55;
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(mx,my); ctx.lineTo(x1+240,y1); ctx.closePath(); ctx.fill();
  });
  ctx.globalAlpha = 1;

  // Castle silhouette
  ctx.fillStyle = "#7A8870"; ctx.globalAlpha = 0.5;
  ctx.fillRect(590, 268, 70, 72);
  ctx.fillRect(588,260,12,16); ctx.fillRect(648,260,12,16); ctx.fillRect(608,252,34,20);
  ctx.fillRect(600,244,8,10);  ctx.fillRect(616,240,8,14);  ctx.fillRect(632,244,8,10);
  ctx.globalAlpha = 1;
  // Flag
  ctx.fillStyle = "#8A6050"; ctx.fillRect(620, 230, 2, 14);
  ctx.fillStyle = "#C04040"; ctx.beginPath(); ctx.moveTo(622,230); ctx.lineTo(634,236); ctx.lineTo(622,242); ctx.closePath(); ctx.fill();

  // Clouds
  for (const cl of gs.clouds) {
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.beginPath(); ctx.ellipse(cl.x, cl.y, cl.w/2, cl.h/2, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cl.x - cl.w*0.22, cl.y - cl.h*0.18, cl.w*0.35, cl.h*0.5, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cl.x + cl.w*0.20, cl.y - cl.h*0.14, cl.w*0.30, cl.h*0.45, 0, 0, Math.PI*2); ctx.fill();
  }

  // Trees (left/right sides)
  const drawTree = (tx: number, ty: number, s: number) => {
    ctx.fillStyle = "#7A5A3A"; ctx.fillRect(tx-s*2, ty, s*4, s*14);
    ctx.fillStyle = "#5A9A50"; ctx.beginPath(); ctx.ellipse(tx, ty-s*2, s*14, s*12, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#6AAA60"; ctx.beginPath(); ctx.ellipse(tx, ty-s*4, s*10, s*9, 0, 0, Math.PI*2); ctx.fill();
  };
  drawTree(28, 370, 2.2); drawTree(58, 374, 1.7);
  drawTree(768,370, 2.2); drawTree(742,374, 1.7);

  // Platforms
  for (const plat of PLATFORMS.slice(1)) {
    ctx.fillStyle = "#5A4030"; ctx.fillRect(plat.x, plat.y+2, plat.w, plat.h);
    ctx.fillStyle = "#7ABF6A"; ctx.fillRect(plat.x, plat.y,   plat.w, 10);
    ctx.fillStyle = "#5A9A50"; ctx.fillRect(plat.x, plat.y,   plat.w, 3);
  }

  // Ground
  ctx.fillStyle = "#5A9A50"; ctx.fillRect(0, PLATFORMS[0].y, GW, 6);
  ctx.fillStyle = "#6AAA60"; ctx.fillRect(0, PLATFORMS[0].y+6, GW, 14);
  ctx.fillStyle = "#8B6340"; ctx.fillRect(0, PLATFORMS[0].y+20, GW, GH);
  // Ground tile lines
  ctx.strokeStyle = "rgba(0,0,0,0.07)"; ctx.lineWidth = 1;
  for (let gx = 0; gx < GW; gx += 32) { ctx.beginPath(); ctx.moveTo(gx, PLATFORMS[0].y+20); ctx.lineTo(gx, GH); ctx.stroke(); }
  for (let gy = PLATFORMS[0].y+20; gy < GH; gy += 16) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(GW, gy); ctx.stroke(); }

  // ── Coins ────────────────────────────────────────────────────
  for (const c of gs.coins) {
    if (c.collected) {
      if (c.collectAnim >= 1) continue;
      // Collect burst
      ctx.globalAlpha = 1 - c.collectAnim;
      const r = 7 + c.collectAnim * 14;
      ctx.fillStyle = "#F0C030";
      ctx.beginPath(); ctx.arc(c.x, c.y - c.collectAnim * 20, r, 0, Math.PI*2); ctx.fill();
      ctx.globalAlpha = 1;
    } else {
      const bobY = c.y + Math.sin(c.bobT) * 4;
      ctx.fillStyle = "#F0C030"; ctx.strokeStyle = "#A07000"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(c.x, bobY, 7, 0, Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#A07000";
      ctx.font = "bold 7px monospace"; ctx.textAlign = "center";
      ctx.fillText("$", c.x, bobY + 3);
    }
  }

  // ── Enemy (slime) ─────────────────────────────────────────────
  const eSq = en.frame === 1; // squish frame
  const eW = eSq ? 32 : 26;
  const eH = eSq ? 24 : 30;
  const eOffY = eSq ? 6 : 0;
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.beginPath(); ctx.ellipse(en.x+eW/2, en.y+eH+eOffY+2, eW*0.7, 4, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = "#70C070"; ctx.strokeStyle = "#3A8A3A"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(en.x+eW/2, en.y+eH/2+eOffY, eW/2, eH/2, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#88D888"; ctx.beginPath(); ctx.ellipse(en.x+eW/2, en.y+eH/3+eOffY, eW*0.35, eH*0.32, 0, 0, Math.PI*2); ctx.fill();
  // Eyes
  const eyeY = en.y + eH*0.45 + eOffY;
  ctx.fillStyle="white"; ctx.beginPath(); ctx.arc(en.x+eW*0.3, eyeY, 4, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(en.x+eW*0.7, eyeY, 4, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle="#3D3025"; ctx.beginPath(); ctx.arc(en.x+eW*0.32, eyeY, 2, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(en.x+eW*0.72, eyeY, 2, 0, Math.PI*2); ctx.fill();

  // ── Player ────────────────────────────────────────────────────
  const px = p.x;
  const py = p.y;
  const pf = p.facing;
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.beginPath(); ctx.ellipse(px+11, py+PH+2, 13, 4, 0, 0, Math.PI*2); ctx.fill();
  // Walk leg offsets
  const legA = p.frame === 1 ? 5 : 0;
  const legB = p.frame === 1 ? 0 : 5;
  // Legs
  ctx.fillStyle = "#3D3025";
  ctx.fillRect(pf===1?px+3:px+9, py+36, 7, 10+legA);
  ctx.fillRect(pf===1?px+11:px+3, py+36, 7, 10+legB);
  // Shoes
  ctx.fillStyle = "#5A3A20";
  ctx.fillRect(pf===1?(px+2):(px+8), py+44+legA, 10, 4);
  ctx.fillRect(pf===1?(px+10):(px+2), py+44+legB, 10, 4);
  // Body
  ctx.fillStyle = "#5A8880"; ctx.fillRect(px+1, py+20, 20, 18);
  // Arms (swing with walk)
  const armOff = p.frame === 1 ? 3 : -1;
  ctx.fillStyle = "#5A8880";
  ctx.fillRect(pf===1?(px-4):(px+17), py+21+armOff, 6, 11);
  ctx.fillRect(pf===1?(px+17):(px-4), py+21-armOff, 6, 11);
  // Hands
  ctx.fillStyle = "#E8A878";
  ctx.fillRect(pf===1?(px-4):(px+17), py+30+armOff, 6, 5);
  ctx.fillRect(pf===1?(px+17):(px-4), py+30-armOff, 6, 5);
  // Neck + Head
  ctx.fillStyle = "#E8A878"; ctx.fillRect(px+7, py+15, 8, 7);
  ctx.fillRect(px+2, py+2, 18, 15);
  // Hair
  ctx.fillStyle = "#8B4513"; ctx.fillRect(px+2, py+2, 18, 4); ctx.fillRect(px, py+3, 3, 4);
  // Eyes
  ctx.fillStyle = "#3D3025";
  ctx.fillRect(pf===1?(px+5):(px+11), py+9, 3, 3);
  ctx.fillRect(pf===1?(px+12):(px+4), py+9, 3, 3);
  // Sword
  ctx.fillStyle = "#C0C0C0"; ctx.strokeStyle = "#808080"; ctx.lineWidth = 1;
  ctx.fillRect(pf===1?(px+20):(px-4), py+14, 3, 18); ctx.strokeRect(pf===1?(px+20):(px-4), py+14, 3, 18);
  ctx.fillStyle = "#A07040"; ctx.fillRect(pf===1?(px+16):(px-5), py+18, 11, 3);

  // ── HUD ───────────────────────────────────────────────────────
  // HP bar
  ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.fillRect(12, 12, 130, 22); ctx.fillRect(12,12,130,22);
  ctx.fillStyle = "#1A1A1A"; ctx.fillRect(14, 14, 126, 18);
  ctx.fillStyle = "#E04040"; ctx.fillRect(14, 14, 90, 18);
  ctx.fillStyle = "#FF6060"; ctx.fillRect(14, 14, 52, 9);
  ctx.fillStyle = "white"; ctx.font = "bold 9px monospace"; ctx.textAlign = "center";
  ctx.fillText("HP", 77, 27);
  // Score + coins
  ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.fillRect(GW-168, 12, 156, 22);
  ctx.fillStyle = "#F0C030"; ctx.font = "bold 9px monospace"; ctx.textAlign = "left";
  const allCollected = p.coins >= TOTAL_COINS;
  ctx.fillText(
    allCollected ? `⭐ ${p.coins}/${TOTAL_COINS} COMPLETE!` : `⭐ ${p.coins}/${TOTAL_COINS} COINS`,
    GW-163,
    27,
  );

  // CRT scanlines overlay
  ctx.fillStyle = "rgba(0,0,0,0)";
  for (let sy = 0; sy < GH; sy += 4) {
    ctx.fillStyle = "rgba(0,0,0,0.018)";
    ctx.fillRect(0, sy+3, GW, 1);
  }
}

// ─────────────────────────────────────────────────────────────────
//  GAME CANVAS COMPONENT
// ─────────────────────────────────────────────────────────────────
function GameCanvas({
  joystickRef,
  actionJumpRef,
  keyboardRef,
  playable,
  onCoinsChange,
}: {
  joystickRef: React.MutableRefObject<{ x: number; y: number }>;
  actionJumpRef: React.MutableRefObject<boolean>;
  keyboardRef: React.MutableRefObject<{ left: boolean; right: boolean; jump: boolean }>;
  playable: boolean;
  onCoinsChange: (coins: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gsRef     = useRef<GameState>(createInitialState());
  const rafRef    = useRef<number>(0);
  const lastCoins = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loop = () => {
      const input = mergeInput(
        joystickRef.current,
        actionJumpRef.current,
        keyboardRef.current,
      );
      tick(gsRef.current, input, playable);
      draw(ctx, gsRef.current);
      const coins = gsRef.current.player.coins;
      if (coins !== lastCoins.current) {
        lastCoins.current = coins;
        onCoinsChange(coins);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [joystickRef, actionJumpRef, keyboardRef, playable, onCoinsChange]);

  return (
    <canvas
      ref={canvasRef}
      width={GW}
      height={GH}
      tabIndex={0}
      className="absolute inset-0 block h-full w-full max-h-full max-w-full outline-none"
      style={{
        imageRendering: "pixelated",
        objectFit: "fill",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────
//  INTERACTIVE JOYSTICK
// ─────────────────────────────────────────────────────────────────
const JOYSTICK_RADIUS    = 42; // housing circle radius
const STICK_RADIUS       = 20; // thumb circle radius
const MAX_STICK_TRAVEL   = 26; // max thumb displacement from center

function InteractiveJoystick({
  onInput,
  onRelease,
  label,
}: {
  onInput: (x: number, y: number) => void;
  onRelease?: () => void;
  label?: string;
}) {
  const thumbRef   = useRef<HTMLDivElement>(null);
  const dragging   = useRef(false);
  const center     = useRef({ x: 0, y: 0 });
  const stickPos   = useRef({ x: 0, y: 0 });

  const moveTo = useCallback((cx: number, cy: number) => {
    const dx   = cx - center.current.x;
    const dy   = cy - center.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const clamped = Math.min(dist, MAX_STICK_TRAVEL);
    const angle = Math.atan2(dy, dx);
    const nx = Math.cos(angle) * clamped;
    const ny = Math.sin(angle) * clamped;
    stickPos.current = { x: nx, y: ny };
    if (thumbRef.current) {
      thumbRef.current.style.transition = "none";
      thumbRef.current.style.transform  = `translate(${nx}px, ${ny}px)`;
    }
    onInput(nx / MAX_STICK_TRAVEL, ny / MAX_STICK_TRAVEL);
  }, [onInput]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    center.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX, e.clientY);
  }, [moveTo]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    moveTo(e.clientX, e.clientY);
  }, [moveTo]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
    stickPos.current = { x: 0, y: 0 };
    if (thumbRef.current) {
      thumbRef.current.style.transition = "transform 0.15s cubic-bezier(0.2,0,0,1)";
      thumbRef.current.style.transform  = "translate(0px, 0px)";
    }
    onInput(0, 0);
    onRelease?.();
  }, [onInput, onRelease]);

  const S = JOYSTICK_RADIUS * 2; // housing diameter

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Housing */}
      <div
        style={{
          width: S, height: S,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 32%, #4A4040, #1C1414)",
          border: "3px solid #0A0808",
          boxShadow: "inset 0 3px 6px rgba(0,0,0,0.5), 0 4px 0 0 rgba(0,0,0,0.5)",
          position: "relative",
          cursor: "grab",
          touchAction: "none",
          userSelect: "none",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Cross guide lines */}
        <div style={{ position:"absolute", top:"50%", left:"12%", right:"12%", height:"1px", background:"rgba(255,255,255,0.07)", marginTop:"-0.5px" }} />
        <div style={{ position:"absolute", left:"50%", top:"12%", bottom:"12%", width:"1px", background:"rgba(255,255,255,0.07)", marginLeft:"-0.5px" }} />
        {/* Thumb */}
        <div
          ref={thumbRef}
          style={{
            position: "absolute",
            top:  "50%", left: "50%",
            width:  STICK_RADIUS * 2, height: STICK_RADIUS * 2,
            marginTop:  -STICK_RADIUS, marginLeft: -STICK_RADIUS,
            borderRadius: "50%",
            background: "radial-gradient(circle at 32% 28%, #FF8888 0%, #CC1414 50%, #880000 100%)",
            border: "3px solid #1A0808",
            boxShadow: "2px 4px 0 0 rgba(0,0,0,0.6), inset -2px -2px 4px rgba(0,0,0,0.3)",
            cursor: "grab",
          }}
        />
      </div>
      {label && (
        <span style={{
          fontFamily: "var(--font-pixel), monospace",
          fontSize: "7px",
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.08em",
        }}>
          {label}
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  CONTROL PANEL  (3D perspective arcade surface)
// ─────────────────────────────────────────────────────────────────
function ControlPanel({
  joystickRef,
  actionJumpRef,
  coinCount,
  playable,
}: {
  joystickRef: React.MutableRefObject<{ x: number; y: number }>;
  actionJumpRef: React.MutableRefObject<boolean>;
  coinCount: number;
  playable: boolean;
}) {
  const handleMoveInput = useCallback((x: number, y: number) => {
    joystickRef.current = { x, y };
  }, [joystickRef]);

  const handleActionInput = useCallback((x: number, y: number) => {
    actionJumpRef.current = y < -0.35;
  }, [actionJumpRef]);

  const handleActionUp = useCallback(() => {
    actionJumpRef.current = false;
  }, [actionJumpRef]);

  return (
    /* Perspective wrapper — rotates panel away from viewer */
    <div style={{ perspective: "500px", width: "100%" }}>
      <div
        style={{
          transformOrigin: "top center",
          transform: "rotateX(22deg)",
          background: "linear-gradient(180deg, #2A2230 0%, #1A1520 100%)",
          border: "4px solid #0A0810",
          borderTop: "none",
          borderRadius: "0 0 18px 18px",
          boxShadow: "0 14px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
          padding: "18px 0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft:  "clamp(20px, 7%, 80px)",
          paddingRight: "clamp(20px, 7%, 80px)",
          gap: "12px",
        }}
      >
        {/* Left joystick — movement */}
        <InteractiveJoystick onInput={handleMoveInput} label="MOVE" />

        {/* Center panel — buttons + display */}
        <div
          className="flex flex-col items-center gap-3"
          style={{ flex: 1, maxWidth: "200px" }}
        >
          {/* Mini display */}
          <div style={{
            background: "#0A1A0A",
            border: "2px solid #1A2A1A",
            padding: "4px 10px",
            fontFamily: "var(--font-pixel), monospace",
            fontSize: "7px",
            color: coinCount >= TOTAL_COINS ? "#FFD040" : "#40FF40",
            letterSpacing: "0.1em",
            boxShadow: "inset 0 0 6px rgba(0,255,0,0.15)",
            whiteSpace: "nowrap",
          }}>
            {playable
              ? coinCount >= TOTAL_COINS
                ? `★ ALL ${TOTAL_COINS} COINS ★`
                : `COINS ${coinCount}/${TOTAL_COINS}`
              : "▶ INSERT COIN"}
          </div>
          {/* START / SELECT */}
          <div className="flex gap-3">
            {["SELECT", "START"].map((lbl) => (
              <div key={lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                <div style={{
                  width: "36px", height: "12px",
                  background: "linear-gradient(180deg, #3A3A4A, #22222E)",
                  border: "2px solid #0A0A14",
                  borderRadius: "6px",
                  boxShadow: "0 2px 0 0 rgba(0,0,0,0.5)",
                  cursor: "pointer",
                }}
                onClick={() => lbl === "START" && document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" })}
                />
                <span style={{ fontFamily: "var(--font-pixel), monospace", fontSize: "6px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
                  {lbl}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right joystick — jump */}
        <InteractiveJoystick
          onInput={handleActionInput}
          onRelease={handleActionUp}
          label="JUMP"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  HERO SECTION  (orchestrator)
// ─────────────────────────────────────────────────────────────────
type HeroSectionProps = { id: PortfolioSectionId };

export function HeroSection({ id }: HeroSectionProps) {
  const [ready, setReady]             = useState(false);
  const [entered, setEntered]         = useState(false);
  const [gateExit, setGateExit]       = useState(false);
  const [coinInserted, setCoinInserted] = useState(false);
  const [coinCount, setCoinCount]     = useState(0);
  const [showHint, setShowHint]       = useState(false);
  const joystickRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const actionJumpRef = useRef(false);
  const keyboardRef = useRef({ left: false, right: false, jump: false });

  const handleCoinsChange = useCallback((coins: number) => {
    setCoinCount(coins);
  }, []);

  // Lock body scroll until user enters; mark body when entered for tape reveal
  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    if (entered) document.body.classList.add("hero-entered");
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("hero-entered");
    };
  }, [entered]);

  const handleCoinClick = useCallback(() => {
    if (gateExit || coinInserted) return;
    setCoinInserted(true);
    setTimeout(() => {
      setGateExit(true);
      setTimeout(() => {
        setEntered(true);
        setShowHint(true);
      }, 680);
    }, 480);
  }, [gateExit, coinInserted]);

  useEffect(() => {
    if (!showHint) return;
    const timer = setTimeout(() => setShowHint(false), 4500);
    return () => clearTimeout(timer);
  }, [showHint]);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 160);
    return () => clearTimeout(timer);
  }, []);

  // Start game from gate with keyboard
  useEffect(() => {
    if (entered) return;
    const handleStartKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCoinClick();
      }
    };
    window.addEventListener("keydown", handleStartKey);
    return () => window.removeEventListener("keydown", handleStartKey);
  }, [entered, handleCoinClick]);

  // In-game keyboard controls
  useEffect(() => {
    if (!entered) return;

    const keyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          keyboardRef.current.left = true;
          e.preventDefault();
          break;
        case "ArrowRight":
        case "d":
        case "D":
          keyboardRef.current.right = true;
          e.preventDefault();
          break;
        case "ArrowUp":
        case "w":
        case "W":
        case " ":
          keyboardRef.current.jump = true;
          e.preventDefault();
          break;
        default:
          break;
      }
    };

    const keyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          keyboardRef.current.left = false;
          break;
        case "ArrowRight":
        case "d":
        case "D":
          keyboardRef.current.right = false;
          break;
        case "ArrowUp":
        case "w":
        case "W":
        case " ":
          keyboardRef.current.jump = false;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      keyboardRef.current = { left: false, right: false, jump: false };
    };
  }, [entered]);

  const cabinetPad = "clamp(8px, 1.4vmin, 16px)";

  return (
    <section
      id={id}
      className="relative flex h-[100dvh] min-h-[100vh] w-full max-w-full flex-col overflow-hidden"
      style={{
        /* Full-viewport arcade shell — plastic / metal cabinet */
        background: "linear-gradient(160deg, #383044 0%, #241d30 35%, #14101c 100%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 120px rgba(0,0,0,0.35)",
        /* While the gate is up, sit above fixed UI (nav dots / scroll hint use z-50). */
        zIndex: entered ? 1 : 100,
      }}
    >
      {/* Full-viewport retro TV: bezel uses the whole section; picture tube grows with flex */}
      <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col">
        <div
          className="flex min-h-0 flex-1 flex-col"
          style={{ padding: `${cabinetPad} ${cabinetPad} 0` }}
        >
          <div
            className="relative flex min-h-0 flex-1 flex-col overflow-hidden"
            style={{
              borderRadius: "clamp(12px, 2vmin, 26px)",
              border: "clamp(5px, 0.9vmin, 12px) solid #0a080e",
              boxShadow: `
                inset 0 0 0 2px rgba(255,255,255,0.12),
                inset 0 2px 5px rgba(255,255,255,0.07),
                inset 0 -24px 48px rgba(0,0,0,0.4),
                0 10px 40px rgba(0,0,0,0.55)`,
              background: "#080a10",
            }}
          >
            {/* CRT scanlines — only on the tube */}
            <div
              className="pointer-events-none absolute inset-0 z-[18] opacity-[0.14]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
              }}
            />

            <div
              className="relative z-10 h-full min-h-0 w-full flex-1"
              style={{
                opacity: ready ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            >
              <div className="absolute inset-0 overflow-hidden bg-[#10161E]">
                <GameCanvas
                  joystickRef={joystickRef}
                  actionJumpRef={actionJumpRef}
                  keyboardRef={keyboardRef}
                  playable={entered}
                  onCoinsChange={handleCoinsChange}
                />

                {/* Pre-start title card */}
                {!entered && (
                  <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center">
                    <div style={{
                      background: "rgba(234,224,196,0.86)",
                      border: "3px solid rgba(61,48,37,0.55)",
                      padding: "clamp(8px,1.8vw,20px) clamp(16px,3.5vw,44px)",
                      backdropFilter: "blur(1px)",
                      textAlign: "center",
                    }}>
                      <h1 style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"clamp(14px,4vw,44px)", color:"#3D3025", textShadow:"3px 3px 0 rgba(185,145,80,0.6),5px 5px 0 rgba(130,90,40,0.22)", letterSpacing:"0.06em", lineHeight:1.1, marginBottom:"clamp(3px,0.5vw,7px)" }}>
                        EARL CLYDE
                      </h1>
                      <p style={{ fontFamily:"var(--font-pixel),monospace", fontSize:"clamp(4px,0.8vw,9px)", color:"#7A6848", letterSpacing:"0.1em", marginBottom:"clamp(6px,1vw,14px)" }}>
                        SOFTWARE ENGINEER
                      </p>
                      <p className="blink" style={{ fontFamily:"var(--font-vt323),monospace", fontSize:"clamp(12px,1.7vw,20px)", color:"#9A8A6A", letterSpacing:"0.06em" }}>
                        Insert coin to play
                      </p>
                    </div>
                  </div>
                )}

                {/* Play hint — fades after start */}
                {entered && showHint && (
                  <div className="pointer-events-none absolute inset-x-0 top-4 z-10 flex justify-center px-4">
                    <div style={{
                      background: "rgba(0,0,0,0.55)",
                      border: "2px solid rgba(240,192,48,0.5)",
                      padding: "8px 14px",
                      fontFamily: "var(--font-vt323), monospace",
                      fontSize: "clamp(16px,2.2vw,20px)",
                      color: "#F0E8A0",
                      letterSpacing: "0.04em",
                      animation: "fade-out 4.5s ease forwards",
                    }}>
                      Move with joystick or A/D · Jump with W/Space or JUMP stick · Collect all {TOTAL_COINS} coins
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Subtle curved-glass edge (tube) — does not shrink the playable area much */}
            <div
              className="pointer-events-none absolute inset-0 z-[19]"
              style={{
                background: entered
                  ? "radial-gradient(ellipse 96% 94% at 50% 50%, transparent 55%, rgba(0,0,0,0.18) 100%)"
                  : "radial-gradient(ellipse 92% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)",
                transition: "background 0.5s ease",
              }}
            />
          </div>
        </div>

        {/* Control deck — part of the cabinet, aligned with bezel inset */}
        <div
          className="relative z-30 shrink-0 w-full"
          style={{
            paddingTop: "10px",
            paddingLeft: cabinetPad,
            paddingRight: cabinetPad,
            paddingBottom: "max(10px, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <ControlPanel
            joystickRef={joystickRef}
            actionJumpRef={actionJumpRef}
            coinCount={coinCount}
            playable={entered}
          />
        </div>
      </div>

      {/* Ghost nav */}
      <div
        className="absolute left-1/2 z-[25] flex -translate-x-1/2 gap-5"
        style={{
          bottom: "clamp(112px, 15vh, 168px)",
          fontFamily: "var(--font-pixel), monospace",
          fontSize: "7px",
          letterSpacing: "0.1em",
        }}
      >
        {(["About","Capabilities","Work","Contact"] as const).map((label) => {
          const href = label==="About"?"#intro":label==="Capabilities"?"#skills":label==="Work"?"#works":`#${label.toLowerCase()}`;
          return (
            <a key={label} href={href} style={{ color:"rgba(255,255,255,0.25)", textDecoration:"none" }}
              onMouseEnter={e=>(e.currentTarget.style.color="rgba(255,255,255,0.6)")}
              onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.25)")}>
              {label}
            </a>
          );
        })}
      </div>

      {/* ── CLICK GATE OVERLAY ── */}
      {!entered && (
        <div
          className={`gate-overlay${gateExit ? " gate-exit" : ""}`}
          style={{
            position: "fixed", top: 0, left: 0,
            width: "100vw", height: "100dvh",
            zIndex: 100,
            background: "linear-gradient(160deg, #383044 0%, #241d30 35%, #14101c 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Scanlines */}
          <div className="pointer-events-none absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
          }} />
          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 35%, rgba(0,0,0,0.8) 100%)",
          }} />
          {/* Corner decorations */}
          {(["tl","tr","bl","br"] as const).map((c) => (
            <div key={c} className="pointer-events-none absolute" style={{
              width: "40px", height: "40px",
              border: "3px solid rgba(200,184,128,0.35)",
              ...(c==="tl"?{top:"20px",left:"20px",borderRight:"none",borderBottom:"none"}:{}),
              ...(c==="tr"?{top:"20px",right:"20px",borderLeft:"none",borderBottom:"none"}:{}),
              ...(c==="bl"?{bottom:"20px",left:"20px",borderRight:"none",borderTop:"none"}:{}),
              ...(c==="br"?{bottom:"20px",right:"20px",borderLeft:"none",borderTop:"none"}:{}),
            }} />
          ))}

          {/* Center content */}
          <div className="gate-float relative z-10 text-center px-6">
            <h1 style={{
              fontFamily: "var(--font-pixel), monospace",
              fontSize: "clamp(22px, 5.5vw, 58px)",
              color: "#EDE8C2",
              textShadow: "4px 4px 0 rgba(185,145,80,0.45), 6px 6px 0 rgba(0,0,0,0.35)",
              letterSpacing: "0.06em",
              lineHeight: 1.15,
              marginBottom: "8px",
            }}>
              EARL<br />CLYDE
            </h1>
            <p style={{
              fontFamily: "var(--font-pixel), monospace",
              fontSize: "clamp(5px, 0.9vw, 10px)",
              color: "rgba(200,184,128,0.7)",
              letterSpacing: "0.12em",
              marginBottom: "44px",
            }}>
              SOFTWARE ENGINEER
            </p>

            {/* Interactive coin slot */}
            <div
              onClick={handleCoinClick}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0",
                cursor: coinInserted ? "default" : "pointer",
                userSelect: "none",
              }}
            >
              {/* Outer wrapper handles vertical hover / drop */}
              <div style={{
                animation: coinInserted
                  ? "coin-slot-drop 0.45s ease-in forwards"
                  : "coin-hover 1.5s ease-in-out infinite",
                marginBottom: "10px",
              }}>
                {/* Inner coin handles spin */}
                <div style={{
                  width: "28px", height: "28px",
                  borderRadius: "50%",
                  background: "#F0C030",
                  border: "2px solid #8A6000",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 16px rgba(240,192,48,0.55), inset 0 2px 0 rgba(255,255,200,0.5)",
                  fontFamily: "monospace",
                  fontSize: "13px",
                  color: "#7A5000",
                  fontWeight: "bold",
                  animation: coinInserted ? "none" : "coin-flip 0.8s linear infinite",
                }}>
                  $
                </div>
              </div>

              {/* Slot machine panel */}
              <div style={{
                background: "linear-gradient(180deg, #2A2236 0%, #1A1428 100%)",
                border: "3px solid rgba(200,184,128,0.35)",
                borderRadius: "5px",
                padding: "10px 24px 9px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "7px",
                boxShadow: "0 6px 0 rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
                minWidth: "110px",
              }}>
                {/* Slot slit */}
                <div style={{
                  width: "44px", height: "9px",
                  background: "#06040E",
                  border: "2px solid rgba(200,184,128,0.2)",
                  borderRadius: "3px",
                  boxShadow: "inset 0 2px 5px rgba(0,0,0,0.95)",
                }} />
                {/* Label */}
                <span style={{
                  fontFamily: "var(--font-pixel), monospace",
                  fontSize: "clamp(5px, 0.7vw, 7px)",
                  color: coinInserted ? "rgba(200,160,90,0.5)" : "rgba(212,120,90,0.8)",
                  letterSpacing: "0.1em",
                }}>
                  {coinInserted ? "LOADING..." : "INSERT COIN"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
