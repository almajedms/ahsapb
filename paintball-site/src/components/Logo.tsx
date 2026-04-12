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
      {/* Glow circle bg */}
      <circle cx="22" cy="26" r="16" fill="#a3e635" opacity="0.12" />

      {/* Outer target ring */}
      <circle cx="22" cy="26" r="14.5" stroke="#a3e635" strokeWidth="2" opacity="0.5" />

      {/* Mid target ring */}
      <circle cx="22" cy="26" r="9" stroke="#a3e635" strokeWidth="2" opacity="0.75" />

      {/* Center filled circle (paintball core) */}
      <circle cx="22" cy="26" r="4.5" fill="#a3e635" />

      {/* Crosshair lines — top */}
      <line x1="22" y1="8" x2="22" y2="15" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" />
      {/* bottom */}
      <line x1="22" y1="37" x2="22" y2="44" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" />
      {/* left */}
      <line x1="5" y1="26" x2="11" y2="26" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" />
      {/* right */}
      <line x1="33" y1="26" x2="39" y2="26" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" />

      {/* Paint splatter blobs — top-right cluster */}
      <circle cx="38" cy="10" r="5.5" fill="#a3e635" />
      <circle cx="44" cy="7"  r="2.8" fill="#a3e635" opacity="0.85" />
      <circle cx="43" cy="15" r="2"   fill="#a3e635" opacity="0.7" />
      <circle cx="35" cy="5"  r="1.8" fill="#a3e635" opacity="0.6" />
      <circle cx="40" cy="18" r="1.2" fill="#a3e635" opacity="0.5" />

      {/* Small accent splat — bottom-left */}
      <circle cx="6"  cy="42" r="3"   fill="#f97316" opacity="0.8" />
      <circle cx="2"  cy="38" r="1.8" fill="#f97316" opacity="0.6" />
      <circle cx="10" cy="45" r="1.2" fill="#f97316" opacity="0.5" />
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
