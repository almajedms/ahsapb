"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

// ── SVG logo mark (paintball target + splatter) ──────────────────────────────
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Dark circle background */}
      <circle cx="24" cy="24" r="24" fill="#0a1a02" />

      {/* Subtle glow */}
      <circle cx="24" cy="24" r="22" fill="#a3e635" opacity="0.06" />

      {/* Outer ring */}
      <circle cx="24" cy="24" r="20" stroke="#a3e635" strokeWidth="1.5" />

      {/* Middle ring */}
      <circle cx="24" cy="24" r="12.5" stroke="#a3e635" strokeWidth="1.5" />

      {/* Inner aim ring */}
      <circle cx="24" cy="24" r="5" stroke="#a3e635" strokeWidth="1.5" />

      {/* Center dot */}
      <circle cx="24" cy="24" r="1.8" fill="#a3e635" />

      {/* Full crosshair — top (outer edge to inner ring) */}
      <line x1="24" y1="4"  x2="24" y2="19" stroke="#a3e635" strokeWidth="1.2" strokeLinecap="round" />
      {/* bottom */}
      <line x1="24" y1="29" x2="24" y2="44" stroke="#a3e635" strokeWidth="1.2" strokeLinecap="round" />
      {/* left */}
      <line x1="4"  y1="24" x2="19" y2="24" stroke="#a3e635" strokeWidth="1.2" strokeLinecap="round" />
      {/* right */}
      <line x1="29" y1="24" x2="44" y2="24" stroke="#a3e635" strokeWidth="1.2" strokeLinecap="round" />

      {/* Mil-dots on crosshair lines */}
      <circle cx="24" cy="8"  r="1.3" fill="#a3e635" />
      <circle cx="24" cy="40" r="1.3" fill="#a3e635" />
      <circle cx="8"  cy="24" r="1.3" fill="#a3e635" />
      <circle cx="40" cy="24" r="1.3" fill="#a3e635" />
    </svg>
  );
}

// ── Full inline logo (mark + wordmark) ───────────────────────────────────────
export function LogoWordmark({ className = "" }: { className?: string }) {
  const { isAr } = useLanguage();

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex-shrink-0">
        {/* Glow behind mark */}
        <div className="absolute inset-0 bg-[#a3e635] rounded-full blur-lg opacity-40 scale-110 pointer-events-none" />
        <LogoMark size={40} />
      </div>

      <div className="flex flex-col leading-tight">
        {isAr ? (
          <>
            <span className="font-black text-white text-[15px] tracking-tight leading-none">
              بينتبول <span className="text-[#a3e635]">الأحساء</span>
            </span>
            <span className="text-[10px] text-neutral-500 font-medium tracking-widest uppercase leading-none mt-0.5">
              Ahsa Paintball
            </span>
          </>
        ) : (
          <>
            <span className="font-black text-white text-[15px] tracking-tight leading-none">
              Ahsa <span className="text-[#a3e635]">Paintball</span>
            </span>
            <span className="text-[10px] text-neutral-500 font-medium tracking-wider leading-none mt-0.5">
              بينتبول الأحساء
            </span>
          </>
        )}
      </div>
    </div>
  );
}

// ── Linked logo (for use in Navbar / Footer) ─────────────────────────────────
export default function Logo() {
  return (
    <Link href="/" className="group">
      <LogoWordmark />
    </Link>
  );
}
