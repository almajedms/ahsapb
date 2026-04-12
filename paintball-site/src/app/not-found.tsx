"use client";

import Link from "next/link";
import { Target } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageProvider } from "@/context/LanguageContext";

function NotFoundInner() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen bg-[#080808] flex flex-col items-center justify-center text-center px-4 grid-overlay">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#a3e635] rounded-full blur-3xl opacity-10 scale-150" />
        <div className="relative w-24 h-24 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/20 flex items-center justify-center">
          <Target size={48} className="text-[#a3e635]" />
        </div>
      </div>
      <h1 className="text-8xl font-black text-white mb-2">404</h1>
      <p className="text-2xl font-bold text-neutral-400 mb-4">{t.notFound.title}</p>
      <p className="text-neutral-600 max-w-sm mb-10">{t.notFound.subtitle}</p>
      <Link href="/" className="bg-[#a3e635] text-black font-black px-8 py-3.5 rounded-full hover:scale-105 transition-transform">
        {t.notFound.back}
      </Link>
    </main>
  );
}

export default function NotFound() {
  return (
    <LanguageProvider>
      <NotFoundInner />
    </LanguageProvider>
  );
}
