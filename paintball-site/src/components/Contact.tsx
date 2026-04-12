"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: MapPin, label: t.contact.locationLabel, value: t.contact.locationValue, href: "#" },
    { icon: Phone, label: t.contact.phoneLabel, value: "+966 50 000 0000", href: "tel:+966500000000" },
    { icon: Mail, label: t.contact.emailLabel, value: "info@ahsapaintball.sa", href: "mailto:info@ahsapaintball.sa" },
    { icon: Clock, label: t.contact.hoursLabel, value: t.contact.hoursValue, href: null },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#a3e635] text-xs font-bold uppercase tracking-[0.2em] mb-4">{t.contact.sectionTag}</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">{t.contact.title}</h2>
          <p className="mt-4 text-neutral-400 max-w-xl mx-auto">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="glass rounded-2xl p-5 flex items-start gap-4 border border-white/5 hover:border-[#a3e635]/20 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-[#a3e635]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#a3e635]/20 transition-colors">
                  <Icon size={18} className="text-[#a3e635]" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-white font-medium text-sm hover:text-[#a3e635] transition-colors">{value}</a>
                  ) : (
                    <p className="text-white font-medium text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="glass rounded-2xl overflow-hidden border border-white/5 h-48 relative">
              <svg viewBox="0 0 400 200" className="w-full h-full opacity-20">
                {[0,1,2,3,4,5,6,7].map((i) => <line key={`h${i}`} x1="0" y1={i*28} x2="400" y2={i*28} stroke="#a3e635" strokeWidth="0.5" />)}
                {[0,1,2,3,4,5,6,7,8,9,10].map((i) => <line key={`v${i}`} x1={i*40} y1="0" x2={i*40} y2="200" stroke="#a3e635" strokeWidth="0.5" />)}
                <path d="M80 60 L160 60 L180 100 L240 80 L300 100 L320 60 L380 80" stroke="#a3e635" strokeWidth="2" fill="none" />
                <path d="M0 120 L100 100 L200 140 L300 120 L400 140" stroke="#a3e635" strokeWidth="2" fill="none" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#a3e635] animate-pulse" />
                  <span className="text-xs text-[#a3e635] font-bold">{t.contact.mapLabel}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-8 border border-white/8">
              {submitted ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#a3e635]/10 flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-[#a3e635]" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">{t.contact.successTitle}</h3>
                  <p className="text-neutral-400 text-sm max-w-xs">{t.contact.successMsg}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">{t.contact.formName}</label>
                      <input type="text" required placeholder={t.contact.formNamePlaceholder} className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#a3e635]/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">{t.contact.formPhone}</label>
                      <input type="tel" required placeholder="+966 50 000 0000" className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#a3e635]/50 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">{t.contact.formEmail}</label>
                    <input type="email" required placeholder="you@example.com" className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#a3e635]/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">{t.contact.formSubject}</label>
                    <select className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#a3e635]/50 transition-all">
                      <option value="" className="bg-[#111]">{t.contact.formSubjectDefault}</option>
                      {t.contact.formSubjectOptions.map((o) => <option key={o} value={o} className="bg-[#111]">{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">{t.contact.formMessage}</label>
                    <textarea required rows={4} placeholder={t.contact.formMessagePlaceholder} className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#a3e635]/50 transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-[#a3e635] text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b6f041] hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] transition-all duration-300 disabled:opacity-60">
                    {loading ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <><Send size={18} />{t.contact.formSubmit}</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
