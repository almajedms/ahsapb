"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Logo from "@/components/Logo";

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.packages, href: "/#packages" },
    { label: t.nav.gallery, href: "/#gallery" },
    { label: t.nav.about, href: "/#about" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-dark shadow-lg shadow-black/50" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-neutral-400 hover:text-white transition-colors relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#a3e635] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right side: lang switcher + CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language switcher */}
              <button
                onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
                className="flex items-center gap-1.5 glass border border-white/10 hover:border-[#a3e635]/40 text-neutral-400 hover:text-[#a3e635] text-xs font-bold px-3 py-2 rounded-full transition-all duration-200"
                aria-label="Toggle language"
              >
                <Globe size={14} />
                {locale === "ar" ? "EN" : "عربي"}
              </button>

              <Link
                href="/booking"
                className="relative overflow-hidden bg-[#a3e635] text-black font-black text-sm px-5 py-2.5 rounded-full group transition-all duration-300 hover:scale-105 animate-pulse-glow"
              >
                <span className="relative z-10">{t.nav.bookNow}</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </Link>
            </div>

            {/* Mobile: lang + menu */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
                className="glass border border-white/10 text-neutral-400 text-xs font-bold px-3 py-2 rounded-full"
              >
                {locale === "ar" ? "EN" : "عربي"}
              </button>
              <button
                className="text-white p-2"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-16 md:hidden"
          >
            <div className="glass-dark h-full flex flex-col items-center justify-center gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={l.href}
                    className="text-2xl font-bold text-white hover:text-[#a3e635] transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/booking"
                  onClick={() => setOpen(false)}
                  className="bg-[#a3e635] text-black font-black text-lg px-8 py-3 rounded-full"
                >
                  {t.nav.bookNow}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
