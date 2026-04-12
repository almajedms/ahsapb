"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Zap, Users, Trophy, Headphones, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const icons = [ShieldCheck, Zap, Users, Trophy, Headphones, Clock];

export default function Features() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 splatter-bg" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#a3e635] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {t.features.sectionTag}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            {t.features.title}{" "}
            <span className="relative">
              <span className="text-[#a3e635]">{t.features.titleHighlight}</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M2 6 Q50 2 100 5 Q150 8 198 4" stroke="#a3e635" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="mt-6 text-neutral-400 max-w-2xl mx-auto text-lg">{t.features.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.items.map((f, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative glass rounded-2xl p-7 hover:border-[#a3e635]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(163,230,53,0.08)]"
              >
                <div className="relative w-12 h-12 mb-5">
                  <div className="absolute inset-0 bg-[#a3e635]/10 rounded-xl group-hover:bg-[#a3e635]/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon size={22} className="text-[#a3e635]" />
                  </div>
                </div>
                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-[#a3e635] transition-colors">{f.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-[#a3e635]/0 via-[#a3e635]/40 to-[#a3e635]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
