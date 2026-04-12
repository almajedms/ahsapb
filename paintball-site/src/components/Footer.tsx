"use client";

import Link from "next/link";
import { Share2, MessageCircle, Globe, PlayCircle, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LogoWordmark } from "@/components/Logo";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-[#080808] border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#a3e635]/40 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#a3e635]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <LogoWordmark />
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">{t.footer.tagline}</p>
            <div className="flex gap-3">
              {[Share2, MessageCircle, Globe, PlayCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#a3e635] hover:border-[#a3e635]/40 transition-all duration-200">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">{t.footer.quickLinks}</h4>
            <ul className="space-y-2.5">
              {t.footer.quickItems.map((item, i) => (
                <li key={item}>
                  <Link href={i === 0 ? "/" : `/#${["", "packages", "gallery", "about", "contact"][i]}`} className="text-sm text-neutral-500 hover:text-[#a3e635] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">{t.footer.packagesTitle}</h4>
            <ul className="space-y-2.5">
              {t.footer.packageItems.map((item) => (
                <li key={item}>
                  <Link href="/booking" className="text-sm text-neutral-500 hover:text-[#a3e635] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">{t.footer.findUs}</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin size={16} className="text-[#a3e635] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-neutral-500 whitespace-pre-line">{t.footer.address}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={16} className="text-[#a3e635] flex-shrink-0" />
                <a href="tel:+966500000000" className="text-sm text-neutral-500 hover:text-[#a3e635] transition-colors">+966 50 000 0000</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={16} className="text-[#a3e635] flex-shrink-0" />
                <a href="mailto:info@ahsapaintball.sa" className="text-sm text-neutral-500 hover:text-[#a3e635] transition-colors">info@ahsapaintball.sa</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">&copy; {new Date().getFullYear()} بينتبول الأحساء. {t.footer.rights}</p>
          <div className="flex gap-6">
            {[t.footer.privacy, t.footer.terms, t.footer.safety].map((item) => (
              <Link key={item} href="#" className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
