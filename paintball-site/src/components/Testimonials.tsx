"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const avatarColors = ["bg-[#a3e635]", "bg-[#f97316]", "bg-[#c084fc]", "bg-[#38bdf8]"];
const initials = ["خ ر", "س م", "م ز", "ف د"];
const initialsEn = ["KR", "SM", "MZ", "FD"];

export default function Testimonials() {
  const { t, isAr } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrent((c) => (c + 1) % t.testimonials.items.length), 5000);
    return () => clearInterval(interval);
  }, [t.testimonials.items.length]);

  const prev = () => setCurrent((c) => (c - 1 + t.testimonials.items.length) % t.testimonials.items.length);
  const next = () => setCurrent((c) => (c + 1) % t.testimonials.items.length);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 splatter-bg" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[#a3e635] text-xs font-bold uppercase tracking-[0.2em] mb-4">{t.testimonials.sectionTag}</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">{t.testimonials.title}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="glass rounded-3xl p-8 sm:p-12 min-h-[280px] flex flex-col justify-between border border-white/8">
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} className="text-[#a3e635]" fill="#a3e635" />)}
            </div>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="text-white text-xl sm:text-2xl font-medium leading-relaxed mb-8"
              >
                &ldquo;{t.testimonials.items[current].text}&rdquo;
              </motion.blockquote>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={current + "author"}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-full ${avatarColors[current]} flex items-center justify-center text-black font-black text-sm flex-shrink-0`}>
                  {isAr ? initials[current] : initialsEn[current]}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.testimonials.items[current].name}</p>
                  <p className="text-neutral-500 text-xs">{t.testimonials.items[current].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-6 right-8 text-8xl font-black text-white/4 leading-none pointer-events-none select-none">&ldquo;</div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {t.testimonials.items.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-[#a3e635]" : "w-3 bg-white/20"}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:border-[#a3e635]/40 hover:text-[#a3e635] transition-all">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:border-[#a3e635]/40 hover:text-[#a3e635] transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
