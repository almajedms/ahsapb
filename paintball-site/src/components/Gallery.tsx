"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const galleryMeta = [
  { id: 1, color: "from-[#1a2e05] to-[#0a1503]", accent: "#a3e635", span: "col-span-2" },
  { id: 2, color: "from-[#1a0a00] to-[#0f0600]", accent: "#f97316", span: "col-span-1" },
  { id: 3, color: "from-[#05151a] to-[#03090f]", accent: "#38bdf8", span: "col-span-1" },
  { id: 4, color: "from-[#1a1505] to-[#0f0e03]", accent: "#fbbf24", span: "col-span-1" },
  { id: 5, color: "from-[#0a051a] to-[#06030f]", accent: "#c084fc", span: "col-span-2" },
  { id: 6, color: "from-[#1a1a1a] to-[#0a0a0a]", accent: "#a3e635", span: "col-span-1" },
];

function ArenaSVG({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full opacity-30">
      <rect x="0" y="200" width="400" height="50" fill="#1a1a1a" />
      <rect x="80" y="150" width="60" height="60" rx="4" fill="#333" />
      <rect x="260" y="140" width="50" height="70" rx="4" fill="#2a2a2a" />
      <ellipse cx="180" cy="200" rx="25" ry="12" fill="#2c2c2c" />
      <rect x="155" y="170" width="50" height="30" rx="5" fill="#2c2c2c" />
      <circle cx="120" cy="165" r="8" fill={accent} opacity="0.8" />
      <circle cx="125" cy="155" r="4" fill={accent} opacity="0.6" />
      <circle cx="130" cy="172" r="5" fill={accent} opacity="0.5" />
      <circle cx="290" cy="158" r="10" fill={accent} opacity="0.7" />
      <circle cx="283" cy="148" r="5" fill={accent} opacity="0.5" />
      <ellipse cx="100" cy="140" rx="8" ry="8" fill="#444" />
      <rect x="95" y="148" width="10" height="20" rx="3" fill="#444" />
      <ellipse cx="310" cy="135" rx="8" ry="8" fill="#444" />
      <rect x="305" y="143" width="10" height="20" rx="3" fill="#444" />
      <path d={`M 110 144 Q 200 120 300 140`} stroke={accent} strokeWidth="2" fill="none" strokeDasharray="4 4" opacity="0.5" />
      <circle cx="200" cy="122" r="4" fill={accent} opacity="0.9" />
    </svg>
  );
}

export default function Gallery() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<typeof galleryMeta[0] & { label: string } | null>(null);

  const items = galleryMeta.map((m, i) => ({ ...m, label: t.gallery.zones[i] }));

  return (
    <section id="gallery" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[#a3e635] text-xs font-bold uppercase tracking-[0.2em] mb-4">{t.gallery.sectionTag}</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">{t.gallery.title}</h2>
          <p className="mt-4 text-neutral-400 max-w-xl mx-auto">{t.gallery.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 auto-rows-[200px]">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative ${item.span} rounded-2xl overflow-hidden cursor-pointer group bg-gradient-to-br ${item.color} border border-white/5`}
              onClick={() => setSelected(item)}
            >
              <ArenaSVG accent={item.accent} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-5">
                <div className="glass-dark rounded-xl px-3 py-1.5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ZoomIn size={14} style={{ color: item.accent }} />
                  <span className="text-xs font-semibold text-white">{item.label}</span>
                </div>
              </div>
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: item.accent }} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className={`relative w-full max-w-3xl aspect-video rounded-3xl bg-gradient-to-br ${selected.color} border overflow-hidden`}
              style={{ borderColor: selected.accent + "40" }}
              onClick={(e) => e.stopPropagation()}
            >
              <ArenaSVG accent={selected.accent} />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-black text-white">{selected.label}</h3>
                <p className="text-sm" style={{ color: selected.accent }}>{t.gallery.arenaLabel}</p>
              </div>
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <X size={18} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
