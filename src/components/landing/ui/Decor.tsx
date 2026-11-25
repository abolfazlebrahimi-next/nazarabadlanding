import type { ReactNode, SVGProps } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

/* ── Section transition curve ────────────────────── */
interface CurveProps {
  fill: string;
  flip?: boolean;
  className?: string;
}

export function Curve({ fill, flip = false, className }: CurveProps) {
  return (
    <div className={`curve${className ? ` ${className}` : ""}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        style={flip ? { transform: "scaleY(-1)" } : undefined}
      >
        <path
          d="M0,64 C220,112 470,108 720,84 C970,60 1210,22 1440,54 L1440,110 L0,110 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/* ── Produce decorations (hand-drawn SVG) ────────── */
export function TomatoSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 12c-1-4 3-8 7-8-1 4-3 6-7 8Z" fill="#A9C6A2" />
      <path d="M33 13l6 3-6 3-6-3 6-3Z" fill="#2B7050" />
      <ellipse cx="32" cy="36" rx="21" ry="19" fill="#E96D50" />
      <ellipse cx="24" cy="28" rx="6.5" ry="4.5" fill="#fff" opacity="0.35" />
    </svg>
  );
}

export function LeafSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M14 50C14 28 30 12 54 12c0 24-14 38-40 38Z" fill="#A9C6A2" />
      <path
        d="M18 46C26 36 36 26 48 18"
        stroke="#2B7050"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ── Footer city skyline (subtle decorative silhouette) ── */
export function CitySkyline({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 150"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {/* ground line */}
      <rect x="0" y="146" width="1440" height="4" fill="rgb(255 248 238 / 0.12)" />
      {/* distant row (very low opacity) */}
      <g fill="rgb(255 248 238 / 0.05)">
        <rect x="40" y="86" width="70" height="60" rx="6" />
        <rect x="130" y="70" width="52" height="76" rx="6" />
        <rect x="420" y="80" width="66" height="66" rx="6" />
        <rect x="610" y="66" width="58" height="80" rx="6" />
        <rect x="880" y="82" width="72" height="64" rx="6" />
        <rect x="1080" y="72" width="50" height="74" rx="6" />
        <rect x="1300" y="84" width="72" height="62" rx="6" />
      </g>
      {/* main row */}
      <g fill="rgb(255 248 238 / 0.09)">
        {/* house with pitched roof */}
        <path d="M215 146v-46l32-20 32 20v46h-64Z" />
        <rect x="262" y="92" width="18" height="54" rx="3" />
        {/* mid-rise with sign */}
        <rect x="510" y="64" width="74" height="82" rx="7" />
        <rect x="524" y="52" width="46" height="16" rx="5" />
        {/* round-top tower */}
        <path d="M735 146v-72a24 24 0 0 1 48 0v72h-48Z" />
        {/* shop with awning */}
        <rect x="990" y="96" width="84" height="50" rx="6" />
        <path d="M984 96l8-20h84l8 20h-100Z" />
        {/* dome mosque-like landmark */}
        <path d="M1180 146c0-26 14-40 30-40s30 14 30 40h-60Z" />
        <rect x="1206" y="88" width="8" height="24" rx="3" />
      </g>
      {/* windows (lit dots) */}
      <g fill="rgb(244 179 82 / 0.35)">
        <rect x="72" y="98" width="9" height="9" rx="2" />
        <rect x="100" y="98" width="9" height="9" rx="2" />
        <rect x="72" y="118" width="9" height="9" rx="2" />
        <rect x="443" y="94" width="9" height="9" rx="2" />
        <rect x="465" y="94" width="9" height="9" rx="2" />
        <rect x="530" y="86" width="10" height="10" rx="2" />
        <rect x="552" y="86" width="10" height="10" rx="2" />
        <rect x="530" y="110" width="10" height="10" rx="2" />
        <rect x="552" y="110" width="10" height="10" rx="2" />
        <rect x="750" y="96" width="8" height="8" rx="2" />
        <rect x="1012" y="112" width="10" height="10" rx="2" />
        <rect x="1038" y="112" width="10" height="10" rx="2" />
        <rect x="1318" y="100" width="9" height="9" rx="2" />
        <rect x="1345" y="100" width="9" height="9" rx="2" />
      </g>
      {/* cypress trees */}
      <g fill="rgb(169 198 162 / 0.14)">
        <path d="M370 146c-8-18-8-34 0-52 8 18 8 34 0 52Z" />
        <rect x="368" y="140" width="4" height="8" rx="2" />
        <path d="M800 146c-7-16-7-30 0-46 7 16 7 30 0 46Z" />
        <rect x="798" y="140" width="4" height="8" rx="2" />
        <path d="M1130 146c-7-16-7-30 0-46 7 16 7 30 0 46Z" />
        <rect x="1128" y="140" width="4" height="8" rx="2" />
      </g>
    </svg>
  );
}

/* ── Bale messenger badge — brand-styled speech bubble with a check ── */
export function BaleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      {/* round bubble with a pointed corner at the top, like the Bale mark */}
      <path d="M2.8 2.8 8.4 3.6A9.2 9.2 0 1 1 3.6 8.4Z" fill="currentColor" />
      {/* confirmation check */}
      <path
        d="M8.5 12.3l2.7 2.7 4.5-5.4"
        stroke="#064E45"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Gentle floating wrapper for decorative elements ── */
export function FloatDecor({
  children,
  className,
  duration = 6,
  distance = 12,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <span className={className}>{children}</span>;
  }
  return (
    <motion.span
      className={className}
      animate={{ y: [0, -distance, 0], rotate: [0, 4, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.span>
  );
}
