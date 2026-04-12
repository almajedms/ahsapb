"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Flame } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CTA() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0d1a03] to-[#080808]" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#a3e635]/10 rounded-full blur-[80px] pointer-events-none" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#a3e635]/10 border border-[#a3e635]/20 mb-8">
            <Flame size={32} className="text-[#a3e635]" />
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-6">
            {t.cta.title}{" "}
            <span className="text-[#a3e635] neon-text">{t.cta.titleHighlight}</span>
          </h2>

          <p className="text-neutral-400 text-lg max-w-xl mx-auto mb-10">{t.cta.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="group inline-flex items-center justify-center gap-2 bg-[#a3e635] text-black font-black text-lg px-10 py-4 rounded-full hover:scale-105 hover:shadow-[0_0_60px_rgba(163,230,53,0.5)] transition-all duration-300">
              {t.cta.bookNow}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <a href="tel:+966500000000" className="inline-flex items-center justify-center gap-2 glass border border-white/10 text-white font-semibold text-lg px-10 py-4 rounded-full hover:border-white/30 transition-all duration-300">
              {t.cta.callUs}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-neutral-600">
            {[t.cta.badge1, t.cta.badge2, t.cta.badge3, t.cta.badge4].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" /> {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
