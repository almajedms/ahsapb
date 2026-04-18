"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const packagesMeta = [
  { price: 75,  duration: "2 hrs", minGroup: 4,  maxGroup: 8,  bullets: 50,  color: "from-neutral-800 to-neutral-900", accentColor: "text-neutral-300", borderColor: "border-white/10",     tag: null,     popular: false },
  { price: 100, duration: "4 hrs", minGroup: 8,  maxGroup: 16, bullets: 100, color: "from-[#1a2e05] to-[#0f1a04]",   accentColor: "text-[#a3e635]",   borderColor: "border-[#a3e635]/30", tag: "popular", popular: true  },
  { price: 150, duration: "full",  minGroup: 16, maxGroup: 32, bullets: 200, color: "from-[#1a0a00] to-[#0f0600]",   accentColor: "text-[#f97316]",   borderColor: "border-[#f97316]/30", tag: "value",   popular: false },
];

export default function Packages() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="packages" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -left-32 top-1/2 w-64 h-64 bg-[#a3e635]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-32 top-1/3 w-64 h-64 bg-[#f97316]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#a3e635] text-xs font-bold uppercase tracking-[0.2em] mb-4">{t.packages.sectionTag}</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">{t.packages.title}</h2>
          <p className="mt-4 text-neutral-400 max-w-xl mx-auto">{t.packages.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {packagesMeta.map((meta, i) => {
            const pkg = t.packages.packages[i];
            const tagLabel = meta.tag === "popular" ? t.packages.popular : meta.tag === "value" ? t.packages.bestValue : null;
            return (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                className={`relative flex flex-col rounded-3xl border ${meta.borderColor} bg-gradient-to-b ${meta.color} p-8 transition-all duration-300 ${meta.popular ? "scale-[1.03] shadow-[0_0_60px_rgba(163,230,53,0.15)]" : ""} ${hovered === i && !meta.popular ? "scale-[1.02] shadow-[0_8px_40px_rgba(0,0,0,0.4)]" : ""}`}
              >
                {tagLabel && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 ${meta.popular ? "bg-[#a3e635] text-black" : "bg-[#f97316] text-black"} text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full`}>
                    <Star size={12} fill="currentColor" /> {tagLabel}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-xl font-black ${meta.accentColor} mb-1`}>{pkg.name}</h3>
                  <p className="text-neutral-500 text-xs mt-1">{pkg.description}</p>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className="text-4xl font-black text-white">{meta.price}</span>
                    <span className="text-neutral-400 font-medium">{t.packages.perGroup}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-neutral-500">
                    <span className="flex items-center gap-1"><Zap size={12} className={meta.accentColor} /> {meta.duration}</span>
                    <span>•</span>
                    <span>{meta.minGroup}–{meta.maxGroup} {t.packages.players}</span>
                    <span>•</span>
                    <span>{meta.bullets} {t.packages.bullets}</span>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                <ul className="space-y-3 flex-1 mb-8">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-neutral-300">
                      <Check size={16} className={`${meta.accentColor} mt-0.5 flex-shrink-0`} /> {feat}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/booking?package=${encodeURIComponent(pkg.name)}`}
                  className={`block text-center font-black text-sm py-3.5 rounded-xl transition-all duration-300 ${meta.popular ? "bg-[#a3e635] text-black hover:bg-[#b6f041] hover:shadow-[0_0_30px_rgba(163,230,53,0.4)]" : meta.tag === "value" ? "bg-[#f97316] text-black hover:bg-[#fb923c] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]" : "bg-white/8 text-white border border-white/10 hover:bg-white/12"}`}
                >
                  {t.packages.bookPackage}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-neutral-500 text-sm">
            {t.packages.customNote}{" "}
            <a href="/#contact" className="text-[#a3e635] hover:underline font-medium">{t.packages.customLink}</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
