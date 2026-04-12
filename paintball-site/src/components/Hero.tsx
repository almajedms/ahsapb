"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Zap, Shield, Users, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Animated crosshair SVG decoration
function Crosshair({ size = 120, opacity = 0.12 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" style={{ opacity }}>
      <circle cx="60" cy="60" r="55" stroke="#a3e635" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="36" stroke="#a3e635" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="18" stroke="#a3e635" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="5"  fill="#a3e635" />
      <line x1="60" y1="0"  x2="60" y2="38"  stroke="#a3e635" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="60" y1="82" x2="60" y2="120" stroke="#a3e635" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="0"  y1="60" x2="38"  y2="60" stroke="#a3e635" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="82" y1="60" x2="120" y2="60" stroke="#a3e635" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Hero() {
  const { t, isAr } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; size: number; color: string; life: number; max: number };
    const pts: P[] = [];
    const colors = ["#a3e635", "#84cc16", "#f97316"];
    const spawn = () => {
      const a = Math.random() * Math.PI * 2, s = Math.random() * 1.2 + 0.3;
      pts.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: Math.cos(a) * s, vy: Math.sin(a) * s, size: Math.random() * 2 + 0.8, color: colors[Math.floor(Math.random() * 3)], life: 0, max: Math.random() * 220 + 120 });
    };
    for (let i = 0; i < 50; i++) spawn();
    let id: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.15) spawn();
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i]; p.x += p.vx; p.y += p.vy; p.life++;
        const a = (1 - p.life / p.max) * 0.45;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(a * 255).toString(16).padStart(2, "0");
        ctx.fill();
        if (p.life >= p.max) pts.splice(i, 1);
      }
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);

  const stats = [
    { icon: Zap,    value: t.hero.stat1Value, label: t.hero.stat1Label },
    { icon: Shield, value: t.hero.stat2Value, label: t.hero.stat2Label },
    { icon: Users,  value: t.hero.stat3Value, label: t.hero.stat3Label },
  ];

  // Diagonal clip: for LTR the diagonal goes top-right to bottom-left (image on right)
  // For RTL the image is still on the right visually
  const clipPath = "polygon(14% 0%, 100% 0%, 100% 100%, 0% 100%)";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]">

      {/* ── Dark grid overlay ── */}
      <div className="absolute inset-0 grid-overlay opacity-30 z-0" />

      {/* ── Mobile: full-bleed image as atmosphere (hidden on lg+) ── */}
      <div className="absolute inset-0 lg:hidden z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-top"
          style={{ filter: "brightness(0.2) saturate(0.3) contrast(1.1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-[#080808]/50 to-[#080808]/90" />
      </div>

      {/* ── Ambient glow — left (text) side ── */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full bg-[#a3e635]/6 blur-[130px] pointer-events-none -translate-x-1/3 -translate-y-1/3 z-0" />

      {/* ── Cinematic image panel — right side, full bleed ── */}
      <div className="absolute inset-y-0 right-0 w-[56%] hidden lg:block z-0 pointer-events-none">
        {/* Clip to diagonal shape */}
        <div className="absolute inset-0" style={{ clipPath }}>
          {/* The photo — darkened and desaturated to match site palette */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-bg.jpg"
            alt="Paintball player at Ahsa Paintball arena"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.52) contrast(1.1) saturate(0.55)" }}
          />

          {/* Green atmosphere overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(163,230,53,0.06)", mixBlendMode: "screen" }}
          />

          {/* Left-edge diagonal fade — blends cut edge into dark bg */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/50 to-transparent" />

          {/* Bottom fade — connects to section below */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-[#080808]/10 to-transparent" />

          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#080808]/60 to-transparent" />

          {/* Subtle green scanline texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, #a3e635 0px, #a3e635 1px, transparent 1px, transparent 4px)",
            }}
          />
        </div>

        {/* Floating tactical badge — inside image area, upper-center */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="absolute top-12 right-16"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 border border-red-500/40 bg-[#080808]/60 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
              {isAr ? "مباشر" : "Live"}
            </span>
          </motion.div>
        </motion.div>

        {/* Floating safety stat — mid-left of image area */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="absolute bottom-48 right-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="rounded-2xl p-4 border border-[#a3e635]/25 bg-[#080808]/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#a3e635]/15 flex items-center justify-center">
                <Shield size={20} className="text-[#a3e635]" />
              </div>
              <div>
                <p className="text-white font-black text-lg leading-none">100%</p>
                <p className="text-neutral-400 text-[10px] mt-0.5 uppercase tracking-wider">
                  {isAr ? "أمان مضمون" : "Safety Record"}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating player count badge — lower-right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="absolute bottom-24 right-28"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="rounded-2xl p-4 border border-[#f97316]/25 bg-[#080808]/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f97316]/15 flex items-center justify-center">
                <Zap size={20} className="text-[#f97316]" />
              </div>
              <div>
                <p className="text-white font-black text-lg leading-none">+5000</p>
                <p className="text-neutral-400 text-[10px] mt-0.5 uppercase tracking-wider">
                  {isAr ? "لاعب سعيد" : "Happy Players"}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Crosshair watermark overlaid on image */}
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 translate-x-1/2 pointer-events-none">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
            <Crosshair size={260} opacity={0.08} />
          </motion.div>
        </div>
      </div>

      {/* ── Left crosshair background decoration ── */}
      <div className="absolute bottom-20 left-10 pointer-events-none hidden lg:block z-0">
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}>
          <Crosshair size={140} opacity={0.05} />
        </motion.div>
      </div>

      {/* ── Canvas particles ── */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 opacity-35" />

      {/* ── Text content (left column) ── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-28 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">

          {/* Text block — takes left column */}
          <div className={`flex flex-col ${isAr ? "items-end text-right" : "items-start text-left"}`}>

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs font-semibold text-[#a3e635] border border-[#a3e635]/25"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse" />
              {t.hero.badge}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
              className="font-black leading-[0.9] tracking-tight mb-6"
            >
              <span className="block text-white text-5xl sm:text-6xl xl:text-7xl">{t.hero.line1}</span>
              <span className="block text-white text-5xl sm:text-6xl xl:text-7xl">{t.hero.line2}</span>
              <span
                className="block text-5xl sm:text-6xl xl:text-7xl text-[#a3e635]"
                style={{ textShadow: "0 0 30px rgba(163,230,53,0.6), 0 0 60px rgba(163,230,53,0.25)" }}
              >
                {t.hero.line3}
              </span>
            </motion.h1>

            {/* Accent divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`h-0.5 w-24 bg-gradient-to-r from-[#a3e635] to-transparent mb-6 ${isAr ? "self-end" : ""}`}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="text-neutral-400 text-base sm:text-lg leading-relaxed mb-8 max-w-md"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <Link
                href="/booking"
                className="group relative inline-flex items-center justify-center gap-2 bg-[#a3e635] text-black font-black text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(163,230,53,0.5)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity" />
                <span className="relative">{t.hero.ctaPrimary}</span>
                <ArrowRight size={16} className="relative group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#packages"
                className="inline-flex items-center justify-center gap-2 glass border border-white/15 hover:border-[#a3e635]/50 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-white/5"
              >
                {t.hero.ctaSecondary}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-8 sm:gap-10"
            >
              {stats.map(({ icon: Icon, value, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col gap-1 ${i < stats.length - 1 ? (isAr ? "pl-8 sm:pl-10 border-l border-white/10" : "pr-8 sm:pr-10 border-r border-white/10") : ""}`}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon size={14} className="text-[#a3e635]" />
                    <span className="text-2xl font-black text-white">{value}</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column spacer — image is absolutely positioned full-bleed */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* ── Bottom paint drip edge ── */}
      <svg className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-30" viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none">
        <path d="M0 60 L0 40 Q120 20 240 38 Q360 55 480 35 Q600 15 720 32 Q840 48 960 28 Q1080 10 1200 30 Q1320 48 1440 25 L1440 60 Z" fill="#080808" />
        <circle cx="240"  cy="38" r="4"   fill="#a3e635" opacity="0.7" />
        <circle cx="236"  cy="45" r="2.5" fill="#a3e635" opacity="0.5" />
        <circle cx="720"  cy="32" r="5"   fill="#a3e635" opacity="0.6" />
        <circle cx="716"  cy="40" r="3"   fill="#a3e635" opacity="0.4" />
        <circle cx="1200" cy="30" r="4.5" fill="#a3e635" opacity="0.65" />
        <circle cx="960"  cy="28" r="3"   fill="#f97316" opacity="0.55" />
        <circle cx="957"  cy="35" r="2"   fill="#f97316" opacity="0.35" />
      </svg>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#a3e635]/40 to-transparent" />
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={16} className="text-neutral-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
