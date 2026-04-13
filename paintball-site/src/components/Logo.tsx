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
      {/* Glow bg */}
      <circle cx="24" cy="24" r="22" fill="#a3e635" opacity="0.08" />

      {/* Outer ring */}
      <circle cx="24" cy="24" r="20" stroke="#a3e635" strokeWidth="1.5" opacity="0.5" />

      {/* Middle ring */}
      <circle cx="24" cy="24" r="13" stroke="#a3e635" strokeWidth="1.5" opacity="0.75" />

      {/* Inner aim ring */}
      <circle cx="24" cy="24" r="5" stroke="#a3e635" strokeWidth="1.5" />

      {/* Center dot */}
      <circle cx="24" cy="24" r="2" fill="#a3e635" />

      {/* Crosshair — top */}
      <line x1="24" y1="4"  x2="24" y2="19" stroke="#a3e635" strokeWidth="1.5" strokeLinecap="round" />
      {/* bottom */}
      <line x1="24" y1="29" x2="24" y2="44" stroke="#a3e635" strokeWidth="1.5" strokeLinecap="round" />
      {/* left */}
      <line x1="4"  y1="24" x2="19" y2="24" stroke="#a3e635" strokeWidth="1.5" strokeLinecap="round" />
      {/* right */}
      <line x1="29" y1="24" x2="44" y2="24" stroke="#a3e635" strokeWidth="1.5" strokeLinecap="round" />

      {/* Mil-dot ticks between outer and middle ring */}
      <circle cx="24" cy="8"  r="1.2" fill="#a3e635" opacity="0.6" />
      <circle cx="24" cy="40" r="1.2" fill="#a3e635" opacity="0.6" />
      <circle cx="8"  cy="24" r="1.2" fill="#a3e635" opacity="0.6" />
      <circle cx="40" cy="24" r="1.2" fill="#a3e635" opacity="0.6" />

      {/* Paint splat accent — top right */}
      <circle cx="39" cy="9"  r="3"   fill="#a3e635" opacity="0.9" />
      <circle cx="44" cy="7"  r="1.8" fill="#a3e635" opacity="0.7" />
      <circle cx="43" cy="14" r="1.2" fill="#a3e635" opacity="0.5" />

      {/* Orange accent splat — bottom left */}
      <circle cx="8"  cy="40" r="2"   fill="#f97316" opacity="0.8" />
      <circle cx="4"  cy="43" r="1.2" fill="#f97316" opacity="0.6" />
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
