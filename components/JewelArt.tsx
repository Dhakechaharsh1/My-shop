"use client";

import { useId } from "react";
import type { ArtKind, Stone } from "@/lib/products";

/**
 * Hand-drawn, procedural jewellery illustrations used as placeholders
 * until real product photos are added in lib/products.ts.
 */

type Props = {
  kind: ArtKind;
  stone: Stone;
  variant?: 0 | 1 | 2;
  className?: string;
  title?: string;
};

const W = 400;
const H = 500;

export default function JewelArt({ kind, stone, variant = 0, className, title }: Props) {
  const rid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const uid = `ja-${kind}-${variant}-${rid}`;
  const ids = {
    gold: `${uid}-gold`,
    goldDark: `${uid}-goldd`,
    pearl: `${uid}-pearl`,
    kundan: `${uid}-kundan`,
    ruby: `${uid}-ruby`,
    emerald: `${uid}-emerald`,
    polki: `${uid}-polki`,
    bg: `${uid}-bg`,
    shadow: `${uid}-shadow`,
  };
  const ctx: Ctx = { ids, accent: stone };
  const velvet = variant === 2;
  const zoom = variant === 1 ? 1.32 : 1;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={title ?? "Jewellery illustration"}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={ids.gold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7E7B4" />
          <stop offset="0.45" stopColor="#D4AF5F" />
          <stop offset="0.75" stopColor="#B08A3A" />
          <stop offset="1" stopColor="#7E5E1E" />
        </linearGradient>
        <linearGradient id={ids.goldDark} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B8913F" />
          <stop offset="1" stopColor="#6E5018" />
        </linearGradient>
        <radialGradient id={ids.pearl} cx="0.35" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.45" stopColor="#F6F0E6" />
          <stop offset="0.85" stopColor="#D9CCB6" />
          <stop offset="1" stopColor="#BFAF94" />
        </radialGradient>
        <radialGradient id={ids.kundan} cx="0.38" cy="0.32" r="0.8">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.4" stopColor="#F3EEE8" />
          <stop offset="0.8" stopColor="#D7D0C8" />
          <stop offset="1" stopColor="#BDB3A6" />
        </radialGradient>
        <radialGradient id={ids.polki} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#FBF8F1" />
          <stop offset="0.5" stopColor="#E3DACB" />
          <stop offset="1" stopColor="#A99C86" />
        </radialGradient>
        <radialGradient id={ids.ruby} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#F07A8C" />
          <stop offset="0.35" stopColor="#B8233F" />
          <stop offset="1" stopColor="#5A0716" />
        </radialGradient>
        <radialGradient id={ids.emerald} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#8FE0B8" />
          <stop offset="0.4" stopColor="#1E8A5A" />
          <stop offset="1" stopColor="#0A3D27" />
        </radialGradient>
        <radialGradient id={ids.bg} cx="0.5" cy="0.42" r="0.75">
          {velvet ? (
            <>
              <stop offset="0" stopColor="#8E2A2F" />
              <stop offset="0.6" stopColor="#6E1A1F" />
              <stop offset="1" stopColor="#4A0F13" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#FCF8F2" />
              <stop offset="0.65" stopColor="#F3EADF" />
              <stop offset="1" stopColor="#E9DCCB" />
            </>
          )}
        </radialGradient>
        <filter id={ids.shadow} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor={velvet ? "#1a0305" : "#7a5a3a"} floodOpacity={velvet ? 0.55 : 0.22} />
        </filter>
      </defs>

      <rect width={W} height={H} fill={`url(#${ids.bg})`} />
      {!velvet && (
        <g opacity="0.35">
          <path d={`M0 ${H * 0.82} Q ${W * 0.3} ${H * 0.76} ${W * 0.55} ${H * 0.86} T ${W} ${H * 0.8} V ${H} H 0 Z`} fill="#EADBC8" />
        </g>
      )}
      <g
        filter={`url(#${ids.shadow})`}
        transform={`translate(${W / 2} ${H / 2}) scale(${zoom}) translate(${-W / 2} ${-H / 2})`}
      >
        {renderKind(kind, ctx)}
      </g>
    </svg>
  );
}

type Ctx = { ids: Record<string, string>; accent: Stone };

/* ───────────── primitives ───────────── */

function gem(c: Ctx, x: number, y: number, r: number, type: Stone, key?: string | number) {
  const fill = `url(#${c.ids[type]})`;
  if (type === "pearl") return pearl(c, x, y, r, key);
  return (
    <g key={key}>
      <circle cx={x} cy={y} r={r + r * 0.28 + 1.5} fill={`url(#${c.ids.gold})`} />
      <circle cx={x} cy={y} r={r} fill={fill} stroke="#8E6B23" strokeWidth={0.6} />
      {(type === "polki" || type === "kundan") && (
        <path
          d={`M${x - r * 0.55} ${y} L${x} ${y - r * 0.55} L${x + r * 0.55} ${y} L${x} ${y + r * 0.55} Z`}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={0.5}
          strokeWidth={0.7}
        />
      )}
      <ellipse cx={x - r * 0.32} cy={y - r * 0.36} rx={r * 0.28} ry={r * 0.18} fill="#fff" opacity={0.75} />
    </g>
  );
}

function pearl(c: Ctx, x: number, y: number, r: number, key?: string | number) {
  return (
    <g key={key}>
      <circle cx={x} cy={y} r={r} fill={`url(#${c.ids.pearl})`} />
      <circle cx={x - r * 0.35} cy={y - r * 0.38} r={r * 0.22} fill="#fff" opacity={0.9} />
    </g>
  );
}

function drop(c: Ctx, x: number, y: number, s: number, type: Stone, key?: string | number) {
  // teardrop pointing up, set in gold
  const d = (k: number) =>
    `M${x} ${y - 1.6 * s * k} C ${x + s * k} ${y - 0.6 * s * k}, ${x + s * k} ${y + 0.9 * s * k}, ${x} ${y + 0.95 * s * k} C ${x - s * k} ${y + 0.9 * s * k}, ${x - s * k} ${y - 0.6 * s * k}, ${x} ${y - 1.6 * s * k} Z`;
  return (
    <g key={key}>
      <path d={d(1.25)} fill={`url(#${c.ids.gold})`} />
      <path d={d(1)} fill={`url(#${c.ids[type]})`} />
      <ellipse cx={x - s * 0.3} cy={y - s * 0.3} rx={s * 0.22} ry={s * 0.35} fill="#fff" opacity={0.6} />
    </g>
  );
}

function link(c: Ctx, x1: number, y1: number, x2: number, y2: number, key?: string | number) {
  return <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`url(#${c.ids.goldDark})`} strokeWidth={1.6} strokeLinecap="round" />;
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/* ───────────── pieces ───────────── */

function renderKind(kind: ArtKind, c: Ctx) {
  switch (kind) {
    case "choker":
      return choker(c);
    case "jhumka":
      return (
        <>
          {jhumka(c, 128)}
          {jhumka(c, 272)}
        </>
      );
    case "tikka":
      return tikka(c);
    case "rani-haar":
      return raniHaar(c);
    case "pendant":
      return pendant(c);
    case "chandbali":
      return (
        <>
          {chandbali(c, 122)}
          {chandbali(c, 278)}
        </>
      );
    case "bangles":
      return bangles(c);
    case "ring":
      return ring(c);
    case "anklet":
      return anklet(c);
    case "studs":
      return (
        <>
          {stud(c, 132, 250)}
          {stud(c, 268, 250)}
        </>
      );
  }
}

function choker(c: Ctx) {
  const cx = 200, cy = 150, rx = 140, ry = 135;
  const N = 13;
  const pts = range(N).map((i) => {
    const t = Math.PI * (0.08 + (0.84 * i) / (N - 1));
    return { x: cx + rx * Math.cos(t), y: cy + ry * Math.sin(t), t };
  });
  const band = `M${pts[0].x} ${pts[0].y} ` + pts.slice(1).map((p) => `L${p.x} ${p.y}`).join(" ");
  const first = pts[0], last = pts[N - 1];
  return (
    <g>
      {/* dori */}
      <path d={`M${first.x} ${first.y} C ${first.x + 10} ${first.y - 60}, ${first.x - 10} ${first.y - 100}, ${first.x - 30} ${first.y - 130}`} stroke="#7E1F23" strokeWidth={2.4} fill="none" />
      <path d={`M${last.x} ${last.y} C ${last.x - 10} ${last.y - 60}, ${last.x + 10} ${last.y - 100}, ${last.x + 30} ${last.y - 130}`} stroke="#7E1F23" strokeWidth={2.4} fill="none" />
      <circle cx={first.x - 30} cy={first.y - 134} r={5} fill="#7E1F23" />
      <circle cx={last.x + 30} cy={last.y - 134} r={5} fill="#7E1F23" />
      <path d={band} stroke={`url(#${c.ids.gold})`} strokeWidth={30} strokeLinejoin="round" strokeLinecap="round" fill="none" />
      <path d={band} stroke="#8E6B23" strokeOpacity={0.35} strokeWidth={30} strokeDasharray="1 7" fill="none" />
      {pts.map((p, i) => {
        const len = i === (N - 1) / 2 ? 46 : 22 + Math.sin(p.t) * 14;
        const dx = Math.cos(p.t) * 4, ex = p.x + dx, ey = p.y + 14 + len;
        return (
          <g key={`f${i}`}>
            {link(c, p.x, p.y + 10, ex, ey - 6)}
            {pearl(c, ex, ey, 5.5)}
            {link(c, ex, ey + 5, ex, ey + 12)}
            {i % 2 === 0 ? drop(c, ex, ey + 20, 6, "ruby") : pearl(c, ex, ey + 17, 4)}
          </g>
        );
      })}
      {pts.map((p, i) => gem(c, p.x, p.y, i === (N - 1) / 2 ? 15 : i % 2 ? 9 : 11, i % 4 === 1 ? "ruby" : "kundan", `s${i}`))}
    </g>
  );
}

function jhumka(c: Ctx, x: number) {
  const top = 120;
  const domeTop = 205, domeBot = 300, w = 52;
  const dome = `M${x - w} ${domeBot} C ${x - w} ${domeTop + 20}, ${x - 24} ${domeTop}, ${x} ${domeTop} C ${x + 24} ${domeTop}, ${x + w} ${domeTop + 20}, ${x + w} ${domeBot} Q ${x} ${domeBot + 12} ${x - w} ${domeBot} Z`;
  const pearls = range(11).map((i) => {
    const px = x - w + (2 * w * i) / 10;
    const py = domeBot + 6 + Math.sin((Math.PI * i) / 10) * 6;
    return (
      <g key={i}>
        {link(c, px, py - 6, px, py + 10)}
        {pearl(c, px, py + 15, 5.5)}
      </g>
    );
  });
  return (
    <g>
      {gem(c, x, top, 18, c.accent === "pearl" ? "kundan" : c.accent)}
      {range(10).map((i) => {
        const a = (Math.PI * 2 * i) / 10;
        return pearl(c, x + Math.cos(a) * 27, top + Math.sin(a) * 27, 4.2, `h${i}`);
      })}
      {link(c, x, top + 30, x, domeTop - 18)}
      {gem(c, x, domeTop - 12, 7, "ruby")}
      <path d={dome} fill={`url(#${c.ids.gold})`} />
      {[0.35, 0.6, 0.85].map((k, i) => (
        <path
          key={i}
          d={`M${x - w * k} ${domeTop + (domeBot - domeTop) * k} Q ${x} ${domeTop + (domeBot - domeTop) * k + 10 * k} ${x + w * k} ${domeTop + (domeBot - domeTop) * k}`}
          stroke="#7E5E1E"
          strokeOpacity={0.55}
          strokeWidth={1.2}
          fill="none"
        />
      ))}
      {range(5).map((i) => gem(c, x - 30 + i * 15, domeBot - 22 + Math.abs(i - 2) * -1, 3.6, "kundan", `k${i}`))}
      {pearls}
    </g>
  );
}

function tikka(c: Ctx) {
  const mx = 200, my = 270;
  const beads = range(9).map((i) => {
    const y = 40 + i * 20;
    const x = mx + Math.sin(i * 1.2) * 2;
    return i % 3 === 2 ? gem(c, x, y, 4.5, "kundan", i) : pearl(c, x, y, 3.8, i);
  });
  return (
    <g>
      <path d={`M${mx} 20 L${mx} ${my - 56}`} stroke={`url(#${c.ids.goldDark})`} strokeWidth={1.8} />
      <circle cx={mx} cy={18} r={7} fill="none" stroke={`url(#${c.ids.gold})`} strokeWidth={3} />
      {beads}
      <circle cx={mx} cy={my} r={56} fill={`url(#${c.ids.gold})`} />
      <circle cx={mx} cy={my} r={50} fill="none" stroke="#7E5E1E" strokeOpacity={0.4} strokeDasharray="2 4" />
      {range(8).map((i) => {
        const a = (Math.PI * 2 * i) / 8 - Math.PI / 2;
        return gem(c, mx + Math.cos(a) * 34, my + Math.sin(a) * 34, 9, "kundan", `p${i}`);
      })}
      {range(16).map((i) => {
        const a = (Math.PI * 2 * i) / 16;
        return pearl(c, mx + Math.cos(a) * 58, my + Math.sin(a) * 58, 3.6, `r${i}`);
      })}
      {gem(c, mx, my, 15, "ruby")}
      {range(7).map((i) => {
        const x = mx - 36 + i * 12;
        const y = my + 62 + (3 - Math.abs(i - 3)) * 6;
        return (
          <g key={`d${i}`}>
            {link(c, x, my + 48, x, y)}
            {pearl(c, x, y + 5, 5)}
          </g>
        );
      })}
      {link(c, mx, my + 86, mx, my + 98)}
      {drop(c, mx, my + 112, 10, "ruby")}
    </g>
  );
}

function raniHaar(c: Ctx) {
  const layers = [
    { rx: 150, ry: 190, n: 26 },
    { rx: 118, ry: 150, n: 21 },
  ];
  return (
    <g>
      {layers.map((L, li) => (
        <g key={li}>
          {range(L.n).map((i) => {
            const t = Math.PI * (0.02 + (0.96 * i) / (L.n - 1));
            const x = 200 + L.rx * Math.cos(t);
            const y = 60 + L.ry * Math.sin(t);
            return i % 3 === 0
              ? gem(c, x, y, li === 0 ? 7 : 6, "polki", `${li}-${i}`)
              : pearl(c, x, y, li === 0 ? 5.5 : 5, `${li}-${i}`);
          })}
        </g>
      ))}
      {/* pendant */}
      <g>
        <path
          d="M200 245 C 240 245, 262 280, 252 320 C 244 352, 220 372, 200 388 C 180 372, 156 352, 148 320 C 138 280, 160 245, 200 245 Z"
          fill={`url(#${c.ids.gold})`}
        />
        {gem(c, 200, 300, 20, "polki")}
        {range(6).map((i) => {
          const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
          return gem(c, 200 + Math.cos(a) * 36, 304 + Math.sin(a) * 40, 7, i % 2 ? "ruby" : "emerald", `pp${i}`);
        })}
        {range(9).map((i) => {
          const x = 164 + i * 9;
          const y = 360 + (4 - Math.abs(i - 4)) * 7 + 10;
          return (
            <g key={`pf${i}`}>
              {link(c, x, 352, x, y)}
              {pearl(c, x, y + 5, 4.6)}
            </g>
          );
        })}
        {drop(c, 200, 436, 9, "emerald")}
        {link(c, 200, 400, 200, 422)}
      </g>
    </g>
  );
}

function pendant(c: Ctx) {
  const cx = 200, cy = 300;
  return (
    <g>
      <path d={`M60 30 Q 120 230 ${cx} ${cy - 50}`} stroke={`url(#${c.ids.goldDark})`} strokeWidth={1.6} fill="none" />
      <path d={`M340 30 Q 280 230 ${cx} ${cy - 50}`} stroke={`url(#${c.ids.goldDark})`} strokeWidth={1.6} fill="none" />
      <circle cx={cx} cy={cy - 50} r={6} fill="none" stroke={`url(#${c.ids.gold})`} strokeWidth={3} />
      {/* feather fan */}
      {range(9).map((i) => {
        const a = ((-60 + i * 15) * Math.PI) / 180;
        const fx = cx + Math.sin(a) * 52;
        const fy = cy + Math.cos(a) * 52 - 4;
        const deg = (-a * 180) / Math.PI;
        return (
          <g key={i} transform={`rotate(${deg} ${fx} ${fy})`}>
            <ellipse cx={fx} cy={fy} rx={11} ry={26} fill={`url(#${c.ids.gold})`} />
            <ellipse cx={fx} cy={fy + 4} rx={7} ry={15} fill={`url(#${c.ids.emerald})`} />
            <circle cx={fx} cy={fy + 8} r={3.2} fill={`url(#${c.ids.ruby})`} />
          </g>
        );
      })}
      {/* body */}
      <path
        d={`M${cx - 4} ${cy - 40} C ${cx + 12} ${cy - 44}, ${cx + 14} ${cy - 24}, ${cx + 6} ${cy - 14} C ${cx + 20} ${cy}, ${cx + 18} ${cy + 22}, ${cx} ${cy + 26} C ${cx - 18} ${cy + 22}, ${cx - 20} ${cy}, ${cx - 6} ${cy - 16} C ${cx - 10} ${cy - 24}, ${cx - 14} ${cy - 36}, ${cx - 4} ${cy - 40} Z`}
        fill={`url(#${c.ids.gold})`}
      />
      {gem(c, cx, cy + 6, 9, "emerald")}
      <circle cx={cx + 1} cy={cy - 32} r={1.6} fill="#3a2a10" />
      <path d={`M${cx + 9} ${cy - 33} l7 2 l-7 2 z`} fill={`url(#${c.ids.goldDark})`} />
      {range(3).map((i) => (
        <g key={`cr${i}`}>
          {link(c, cx - 3, cy - 40, cx - 8 + i * 5, cy - 52)}
          <circle cx={cx - 8 + i * 5} cy={cy - 53} r={2} fill={`url(#${c.ids.emerald})`} />
        </g>
      ))}
      {link(c, cx, cy + 74, cx, cy + 86)}
      {pearl(c, cx, cy + 92, 7)}
    </g>
  );
}

function chandbali(c: Ctx, x: number) {
  const y = 250, R = 62;
  const crescent = `M${x - R} ${y} A ${R} ${R} 0 0 0 ${x + R} ${y} Q ${x} ${y + 22} ${x - R} ${y} Z`;
  return (
    <g>
      {gem(c, x, 120, 15, "kundan")}
      {link(c, x, 138, x, 158)}
      {gem(c, x, 168, 8, "ruby")}
      {/* arch */}
      <path d={`M${x - R} ${y} Q ${x - R + 4} ${y - 70} ${x} ${y - 72} Q ${x + R - 4} ${y - 70} ${x + R} ${y}`} fill="none" stroke={`url(#${c.ids.gold})`} strokeWidth={3} />
      {range(7).map((i) => {
        const t = (i + 1) / 8;
        const px = x - R + 2 * R * t;
        const py = y - Math.sin(Math.PI * t) * 66;
        return pearl(c, px, py, 3.4, `a${i}`);
      })}
      <path d={crescent} fill={`url(#${c.ids.gold})`} />
      {range(7).map((i) => {
        const a = Math.PI * (0.15 + (0.7 * i) / 6);
        return gem(c, x + Math.cos(a) * (R - 18), y + Math.sin(a) * (R - 22) + 4, i === 3 ? 8 : 5.5, i === 3 ? c.accent : "kundan", `c${i}`);
      })}
      {range(15).map((i) => {
        const a = Math.PI * (0.04 + (0.92 * i) / 14);
        const px = x + Math.cos(a) * (R + 6);
        const py = y + Math.sin(a) * (R + 6);
        return pearl(c, px, py, 4.2, `o${i}`);
      })}
      {range(5).map((i) => {
        const a = Math.PI * (0.3 + (0.4 * i) / 4);
        const px = x + Math.cos(a) * (R + 12);
        const py = y + Math.sin(a) * (R + 12);
        return (
          <g key={`dd${i}`}>
            {link(c, px, py, px, py + 12)}
            {i % 2 === 0 ? drop(c, px, py + 22, 5, c.accent) : pearl(c, px, py + 16, 4)}
          </g>
        );
      })}
    </g>
  );
}

function bangles(c: Ctx) {
  const one = (cy: number, k: number) => {
    const rx = 128, ry = 44;
    const n = 22;
    return (
      <g key={k}>
        <ellipse cx={200} cy={cy} rx={rx} ry={ry} fill="none" stroke={`url(#${c.ids.goldDark})`} strokeWidth={22} />
        <path d={`M${200 - rx} ${cy} A ${rx} ${ry} 0 0 0 ${200 + rx} ${cy}`} fill="none" stroke={`url(#${c.ids.gold})`} strokeWidth={26} />
        {range(n).map((i) => {
          const t = Math.PI * (0.03 + (0.94 * i) / (n - 1));
          const x = 200 + rx * Math.cos(t);
          const y = cy + ry * Math.sin(t);
          return gem(c, x, y, 6 * (0.75 + 0.25 * Math.sin(t)), i % 5 === 2 ? "ruby" : "kundan", `${k}-${i}`);
        })}
        {range(n).map((i) => {
          const t = Math.PI * (0.03 + (0.94 * i) / (n - 1));
          const x = 200 + rx * Math.cos(t);
          const y = cy + ry * Math.sin(t);
          return <circle key={`b${k}-${i}`} cx={x} cy={y + 13 * Math.sin(t)} r={1.6} fill="#FFF6DA" opacity={0.8} />;
        })}
      </g>
    );
  };
  return (
    <g>
      {one(200, 0)}
      {one(300, 1)}
    </g>
  );
}

function ring(c: Ctx) {
  const cx = 200, cy = 225;
  return (
    <g>
      <ellipse cx={cx} cy={cy + 105} rx={64} ry={26} fill="none" stroke={`url(#${c.ids.goldDark})`} strokeWidth={9} />
      <path d={`M${cx - 64} ${cy + 105} A 64 26 0 0 0 ${cx + 64} ${cy + 105}`} fill="none" stroke={`url(#${c.ids.gold})`} strokeWidth={12} />
      <path d={`M${cx - 30} ${cy + 60} L${cx - 58} ${cy + 96} M${cx + 30} ${cy + 60} L${cx + 58} ${cy + 96}`} stroke={`url(#${c.ids.gold})`} strokeWidth={10} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={70} fill={`url(#${c.ids.gold})`} />
      {range(20).map((i) => {
        const a = (Math.PI * 2 * i) / 20;
        return pearl(c, cx + Math.cos(a) * 72, cy + Math.sin(a) * 72, 5, `rp${i}`);
      })}
      {range(8).map((i) => {
        const a = (Math.PI * 2 * i) / 8;
        return (
          <ellipse
            key={`pt${i}`}
            cx={cx + Math.cos(a) * 42}
            cy={cy + Math.sin(a) * 42}
            rx={14}
            ry={9}
            transform={`rotate(${(a * 180) / Math.PI} ${cx + Math.cos(a) * 42} ${cy + Math.sin(a) * 42})`}
            fill={`url(#${c.ids.kundan})`}
            stroke={`url(#${c.ids.goldDark})`}
            strokeWidth={2}
          />
        );
      })}
      {gem(c, cx, cy, 24, "polki")}
    </g>
  );
}

function anklet(c: Ctx) {
  const cx = 200, cy = 220, rx = 145, ry = 70;
  const n = 36;
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={`url(#${c.ids.goldDark})`} strokeWidth={3} />
      {range(n).map((i) => {
        const t = (Math.PI * 2 * i) / n;
        const x = cx + rx * Math.cos(t), y = cy + ry * Math.sin(t);
        const front = Math.sin(t) > -0.1;
        return i % 2 === 0 ? (
          <circle key={i} cx={x} cy={y} r={front ? 4 : 3} fill={`url(#${c.ids.gold})`} />
        ) : (
          pearl(c, x, y, front ? 3.6 : 2.8, i)
        );
      })}
      {range(13).map((i) => {
        const t = Math.PI * (0.06 + (0.88 * i) / 12);
        const x = cx + rx * Math.cos(t), y = cy + ry * Math.sin(t);
        return (
          <g key={`g${i}`}>
            {link(c, x, y + 3, x, y + 18)}
            <circle cx={x} cy={y + 27} r={9} fill={`url(#${c.ids.gold})`} />
            <path d={`M${x - 6} ${y + 30} Q ${x} ${y + 34} ${x + 6} ${y + 30}`} stroke="#5d4210" strokeWidth={1.6} fill="none" />
            <circle cx={x - 3} cy={y + 23} r={2.2} fill="#FFF6DA" opacity={0.85} />
            {i % 3 === 1 && gem(c, x, y, 4.5, "ruby")}
          </g>
        );
      })}
      <path d={`M${cx + rx - 4} ${cy - 6} q 14 -10 22 2`} stroke={`url(#${c.ids.gold})`} strokeWidth={3} fill="none" />
    </g>
  );
}

function stud(c: Ctx, x: number, y: number) {
  return (
    <g>
      <circle cx={x} cy={y} r={44} fill={`url(#${c.ids.gold})`} />
      {range(16).map((i) => {
        const a = (Math.PI * 2 * i) / 16;
        return <circle key={`m${i}`} cx={x + Math.cos(a) * 44} cy={y + Math.sin(a) * 44} r={4} fill={`url(#${c.ids.gold})`} />;
      })}
      {range(6).map((i) => {
        const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
        return gem(c, x + Math.cos(a) * 25, y + Math.sin(a) * 25, 10, "kundan", `pt${i}`);
      })}
      {range(6).map((i) => {
        const a = (Math.PI * 2 * i) / 6 - Math.PI / 2 + Math.PI / 6;
        return pearl(c, x + Math.cos(a) * 29, y + Math.sin(a) * 29, 3.2, `sp${i}`);
      })}
      {gem(c, x, y, 11, "ruby")}
    </g>
  );
}
