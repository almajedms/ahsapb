"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, ChevronLeft, ChevronRight, Check, Users, Clock, Zap, Shield, Star,
  AlertCircle, CheckCircle2,
} from "lucide-react";
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval,
  isSameDay, isBefore, startOfDay,
} from "date-fns";
import { arSA } from "date-fns/locale";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

// ─── Static data (prices, group sizes, etc.) ─────────────────────────────────
const packagesMeta = [
  { id: "rookie", price: 75,  duration: "2 hrs", minGroup: 2, maxGroup: 8,  bullets: 50,  accentColor: "#94a3b8", popular: false, tag: null },
  { id: "squad",  price: 100, duration: "4 hrs", minGroup: 2, maxGroup: 16, bullets: 100, accentColor: "#a3e635", popular: true,  tag: "popular" },
  { id: "elite",  price: 150, duration: "full",  minGroup: 2, maxGroup: 32, bullets: 200, accentColor: "#f97316", popular: false, tag: "value" },
];

const TIME_SLOTS = [
  { time: "10:00", label12: "10:00 AM", available: true },
  { time: "12:00", label12: "12:00 PM", available: true },
  { time: "14:00", label12: "2:00 PM",  available: false },
  { time: "16:00", label12: "4:00 PM",  available: true },
  { time: "18:00", label12: "6:00 PM",  available: true },
  { time: "20:00", label12: "8:00 PM",  available: false },
  { time: "22:00", label12: "10:00 PM", available: true },
];

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepIndicator({ currentStep, steps }: { currentStep: number; steps: readonly string[] }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 ${i < currentStep ? "bg-[#a3e635] text-black" : i === currentStep ? "bg-[#a3e635]/20 text-[#a3e635] border border-[#a3e635]/50" : "bg-white/5 text-neutral-600 border border-white/10"}`}>
              {i < currentStep ? <Check size={16} /> : i + 1}
            </div>
            <span className={`mt-1.5 text-xs font-semibold hidden sm:block transition-colors ${i <= currentStep ? "text-[#a3e635]" : "text-neutral-600"}`}>{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-12 sm:w-20 h-px mx-2 transition-all duration-500 ${i < currentStep ? "bg-[#a3e635]" : "bg-white/10"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────
function MiniCalendar({ selected, onSelect }: { selected: Date | null; onSelect: (d: Date) => void }) {
  const { isAr } = useLanguage();
  const [viewMonth, setViewMonth] = useState(new Date());
  const today = startOfDay(new Date());
  const days = eachDayOfInterval({ start: startOfMonth(viewMonth), end: endOfMonth(viewMonth) });
  const firstDayOfWeek = startOfMonth(viewMonth).getDay();
  const blanks = Array.from({ length: firstDayOfWeek });
  const dayHeaders = isAr ? ["أح", "إث", "ث", "أر", "خ", "ج", "س"] : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const locale = isAr ? arSA : undefined;

  return (
    <div className="glass rounded-2xl p-6 border border-white/8">
      <div className="flex items-center justify-between mb-5">
        <button onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
          <ChevronLeft size={16} className="text-neutral-400" />
        </button>
        <span className="text-white font-bold text-sm">{format(viewMonth, "MMMM yyyy", { locale })}</span>
        <button onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
          <ChevronRight size={16} className="text-neutral-400" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-2">
        {dayHeaders.map((d) => <div key={d} className="text-center text-xs font-semibold text-neutral-600 py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, i) => <div key={`b${i}`} />)}
        {days.map((day) => {
          const isPast = isBefore(day, today);
          const isSelected = selected ? isSameDay(day, selected) : false;
          const isToday = isSameDay(day, today);
          return (
            <button key={day.toISOString()} disabled={isPast} onClick={() => onSelect(day)}
              className={`aspect-square rounded-lg text-sm font-medium transition-all duration-150 flex items-center justify-center ${isSelected ? "bg-[#a3e635] text-black font-black shadow-[0_0_15px_rgba(163,230,53,0.4)]" : isPast ? "text-neutral-700 cursor-not-allowed" : isToday ? "text-[#a3e635] bg-[#a3e635]/10 border border-[#a3e635]/30" : "text-neutral-300 hover:bg-white/8"}`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 1: Package ──────────────────────────────────────────────────────────
function PackageStep({ selected, onSelect }: { selected: typeof packagesMeta[0] | null; onSelect: (p: typeof packagesMeta[0]) => void }) {
  const { t } = useLanguage();
  return (
    <div>
      <h2 className="text-2xl font-black text-white mb-2">{t.booking.step1Title}</h2>
      <p className="text-neutral-500 text-sm mb-8">{t.booking.step1Subtitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {packagesMeta.map((meta, i) => {
          const pkg = t.packages.packages[i];
          const isSelected = selected?.id === meta.id;
          const tagLabel = meta.tag === "popular" ? t.packages.popular : meta.tag === "value" ? t.packages.bestValue : null;
          return (
            <motion.button key={meta.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onSelect(meta)}
              className={`relative text-left rounded-2xl p-6 border transition-all duration-300 ${isSelected ? "border-[#a3e635] bg-[#a3e635]/8 shadow-[0_0_30px_rgba(163,230,53,0.15)]" : "border-white/8 bg-white/3 hover:border-white/20"}`}
            >
              {tagLabel && (
                <span className={`absolute -top-3 left-4 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 ${meta.popular ? "bg-[#a3e635] text-black" : "bg-[#f97316] text-black"}`}>
                  <Star size={10} fill="black" /> {tagLabel}
                </span>
              )}
              {isSelected && <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#a3e635] flex items-center justify-center"><Check size={14} className="text-black" /></div>}
              <h3 className="font-black text-white text-lg mb-1" style={{ color: isSelected ? meta.accentColor : undefined }}>{pkg.name}</h3>
              <p className="text-neutral-500 text-xs mb-4">{pkg.description}</p>
              <div className="text-3xl font-black text-white mb-4">{meta.price} <span className="text-sm font-medium text-neutral-500">{t.booking.perGroup}</span></div>
              <div className="grid grid-cols-2 gap-2 mb-5 text-xs text-neutral-400">
                <span className="flex items-center gap-1"><Clock size={12} style={{ color: meta.accentColor }} /> {meta.duration}</span>
                <span className="flex items-center gap-1"><Users size={12} style={{ color: meta.accentColor }} /> {meta.minGroup}–{meta.maxGroup} {t.booking.players}</span>
                <span className="flex items-center gap-1"><Zap size={12} style={{ color: meta.accentColor }} /> {meta.bullets} {t.booking.bullets}</span>
                <span className="flex items-center gap-1"><Shield size={12} style={{ color: meta.accentColor }} /> {t.booking.gearIncl}</span>
              </div>
              <ul className="space-y-1.5">
                {pkg.features.slice(0, 4).map((f) => (
                  <li key={f} className="text-xs text-neutral-400 flex items-center gap-1.5"><Check size={11} style={{ color: meta.accentColor }} /> {f}</li>
                ))}
                {pkg.features.length > 4 && <li className="text-xs" style={{ color: meta.accentColor }}>+{pkg.features.length - 4} {t.booking.moreInclusions}</li>}
              </ul>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2: Date & Time ──────────────────────────────────────────────────────
function DateTimeStep({ date, time, groupSize, selectedPkg, onDateSelect, onTimeSelect, onGroupSizeChange }: {
  date: Date | null; time: string | null; groupSize: number;
  selectedPkg: typeof packagesMeta[0] | null;
  onDateSelect: (d: Date) => void; onTimeSelect: (t: string) => void; onGroupSizeChange: (n: number) => void;
}) {
  const { t, isAr } = useLanguage();
  const min = selectedPkg?.minGroup ?? 2;
  const max = selectedPkg?.maxGroup ?? 32;
  const locale = isAr ? arSA : undefined;

  return (
    <div>
      <h2 className="text-2xl font-black text-white mb-2">{t.booking.step2Title}</h2>
      <p className="text-neutral-500 text-sm mb-8">{t.booking.step2Subtitle}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">{t.booking.step2DateLabel}</h3>
          <MiniCalendar selected={date} onSelect={onDateSelect} />
          {date && <p className="mt-2 text-xs text-[#a3e635] font-medium">{format(date, "EEEE, d MMMM yyyy", { locale })}</p>}
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">{t.booking.step2TimeLabel}</h3>
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button key={slot.time} disabled={!slot.available} onClick={() => slot.available && onTimeSelect(slot.time)}
                  className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all duration-200 ${time === slot.time ? "bg-[#a3e635] text-black border-[#a3e635] shadow-[0_0_15px_rgba(163,230,53,0.3)]" : !slot.available ? "bg-transparent text-neutral-700 border-white/5 cursor-not-allowed line-through" : "bg-white/3 text-neutral-300 border-white/8 hover:border-white/20 hover:bg-white/6"}`}
                >
                  {slot.label12}
                  {!slot.available && <span className="block text-[10px] text-neutral-700 font-normal">{t.booking.step2Taken}</span>}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
              {t.booking.step2GroupLabel} <span className="text-neutral-600">({min}–{max} {t.booking.players})</span>
            </h3>
            <div className="glass rounded-xl p-5 border border-white/8">
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => onGroupSizeChange(Math.max(min, groupSize - 1))} className="w-10 h-10 rounded-full bg-white/8 hover:bg-white/14 flex items-center justify-center text-white font-bold transition-colors text-lg">−</button>
                <div className="text-center">
                  <div className="text-4xl font-black text-white">{groupSize}</div>
                  <div className="text-xs text-neutral-500">{t.booking.players}</div>
                </div>
                <button onClick={() => onGroupSizeChange(Math.min(max, groupSize + 1))} className="w-10 h-10 rounded-full bg-white/8 hover:bg-white/14 flex items-center justify-center text-white font-bold transition-colors text-lg">+</button>
              </div>
              <input type="range" min={min} max={max} value={groupSize} onChange={(e) => onGroupSizeChange(Number(e.target.value))} className="w-full accent-[#a3e635] cursor-pointer" />
              <div className="flex justify-between text-xs text-neutral-600 mt-1"><span>{min}</span><span>{max}</span></div>
            </div>
            {selectedPkg && (
              <div className="mt-3 glass rounded-xl p-4 border border-[#a3e635]/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">{t.booking.step2EstLabel}</span>
                  <span className="text-xl font-black text-[#a3e635]">{selectedPkg.price * groupSize} {t.booking.perGroup.split(" ")[0]}</span>
                </div>
                <p className="text-xs text-neutral-600 mt-1">{groupSize} × {selectedPkg.price} {t.booking.perGroup.split(" ")[0]}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Info ─────────────────────────────────────────────────────────────
interface FormData { name: string; email: string; phone: string; notes: string; }

function InfoStep({ data, onChange }: { data: FormData; onChange: (d: FormData) => void }) {
  const { t } = useLanguage();
  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...data, [key]: e.target.value });
  const cls = "w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#a3e635]/50 focus:bg-white/6 transition-all";
  return (
    <div>
      <h2 className="text-2xl font-black text-white mb-2">{t.booking.step3Title}</h2>
      <p className="text-neutral-500 text-sm mb-8">{t.booking.step3Subtitle}</p>
      <div className="max-w-xl space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{t.booking.step3Name}</label>
            <input value={data.name} onChange={set("name")} placeholder={t.booking.step3NamePlaceholder} required className={cls} />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{t.booking.step3Phone}</label>
            <input value={data.phone} onChange={set("phone")} placeholder="+966 50 000 0000" type="tel" required className={cls} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{t.booking.step3Email}</label>
          <input value={data.email} onChange={set("email")} placeholder="you@example.com" type="email" required className={cls} />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{t.booking.step3Notes}</label>
          <textarea value={data.notes} onChange={set("notes")} placeholder={t.booking.step3NotesPlaceholder} rows={4} className={cls + " resize-none"} />
        </div>
      </div>
    </div>
  );
}

// ─── Step 4: Confirm ──────────────────────────────────────────────────────────
function ConfirmStep({ pkg, date, time, groupSize, info }: {
  pkg: typeof packagesMeta[0] | null; date: Date | null; time: string | null; groupSize: number; info: FormData;
}) {
  const { t, isAr } = useLanguage();
  const locale = isAr ? arSA : undefined;
  const pkgName = pkg ? t.packages.packages[packagesMeta.findIndex((m) => m.id === pkg.id)]?.name : "—";
  const timeLabel = time ? TIME_SLOTS.find((s) => s.time === time)?.label12 ?? time : "—";

  const rows = [
    { label: t.booking.step4Package, value: pkgName },
    { label: t.booking.step4Date, value: date ? format(date, "EEEE, d MMMM yyyy", { locale }) : "—" },
    { label: t.booking.step4Time, value: timeLabel },
    { label: t.booking.step4Group, value: `${groupSize} ${t.booking.step4Players}` },
    { label: t.booking.step4Name, value: info.name || "—" },
    { label: t.booking.step4Phone, value: info.phone || "—" },
    { label: t.booking.step4Email, value: info.email || "—" },
    { label: t.booking.step4Total, value: pkg ? `${pkg.price} SAR` : "—", highlight: true },
  ];

  return (
    <div>
      <h2 className="text-2xl font-black text-white mb-2">{t.booking.step4Title}</h2>
      <p className="text-neutral-500 text-sm mb-8">{t.booking.step4Subtitle}</p>
      <div className="max-w-xl">
        <div className="glass rounded-2xl border border-white/8 overflow-hidden">
          {rows.map(({ label, value, highlight }, i) => (
            <div key={label} className={`flex items-center justify-between px-6 py-4 ${i < rows.length - 1 ? "border-b border-white/5" : ""} ${highlight ? "bg-[#a3e635]/8" : ""}`}>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{label}</span>
              <span className={`text-sm font-bold ${highlight ? "text-[#a3e635] text-lg" : "text-white"}`}>{value}</span>
            </div>
          ))}
        </div>
        {info.notes && (
          <div className="mt-4 glass rounded-xl p-4 border border-white/8">
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">{t.booking.step3Notes}</p>
            <p className="text-sm text-neutral-300">{info.notes}</p>
          </div>
        )}
        <div className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-[#a3e635]/8 border border-[#a3e635]/20">
          <AlertCircle size={16} className="text-[#a3e635] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-neutral-400">{t.booking.step4CancelNote}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Success ──────────────────────────────────────────────────────────────────
function SuccessScreen({ pkg, date, time }: { pkg: typeof packagesMeta[0] | null; date: Date | null; time: string | null }) {
  const { t, isAr } = useLanguage();
  const locale = isAr ? arSA : undefined;
  const pkgName = pkg ? t.packages.packages[packagesMeta.findIndex((m) => m.id === pkg.id)]?.name : "";
  return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 20 }} className="text-center py-16">
      <div className="relative inline-flex items-center justify-center mb-8">
        <div className="absolute inset-0 bg-[#a3e635]/20 rounded-full blur-xl scale-150" />
        <div className="relative w-24 h-24 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30 flex items-center justify-center">
          <CheckCircle2 size={48} className="text-[#a3e635]" />
        </div>
      </div>
      <h2 className="text-4xl font-black text-white mb-3">{t.booking.successTitle}</h2>
      <p className="text-neutral-400 text-lg mb-8 max-w-md mx-auto">{t.booking.successMsg}</p>
      <div className="inline-flex flex-col items-center glass rounded-2xl border border-[#a3e635]/20 px-10 py-6 mb-10 text-sm">
        <p className="text-[#a3e635] font-black text-lg mb-2">{pkgName}</p>
        {date && <p className="text-white font-semibold">{format(date, "EEEE, d MMMM yyyy", { locale })}</p>}
        {time && <p className="text-neutral-400">{TIME_SLOTS.find((s) => s.time === time)?.label12}</p>}
      </div>
      <p className="text-xs text-neutral-600 mb-8">{t.booking.successEmailNote}</p>
      <Link href="/" className="inline-flex items-center gap-2 bg-[#a3e635] text-black font-black px-8 py-3.5 rounded-full hover:scale-105 transition-transform">
        <Target size={18} /> {t.booking.successBack}
      </Link>
    </motion.div>
  );
}

// ─── Booking Wizard ───────────────────────────────────────────────────────────
function BookingWizard() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const preSelectedName = searchParams.get("package");

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<typeof packagesMeta[0] | null>(() => {
    if (!preSelectedName) return null;
    const idx = t.packages.packages.findIndex((p) => p.name === preSelectedName);
    return idx >= 0 ? packagesMeta[idx] : null;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [groupSize, setGroupSize] = useState(2);
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canProceed = () => {
    if (step === 0) return selectedPkg !== null;
    if (step === 1) return selectedDate !== null && selectedTime !== null;
    if (step === 2) return formData.name.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== "";
    return true;
  };

  const handleNext = () => {
    setError(null);
    if (!canProceed()) {
      setError(step === 0 ? t.booking.errPackage : step === 1 ? t.booking.errDateTime : t.booking.errInfo);
      return;
    }
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setDone(true);
  };

  const stepComponents = [
    <PackageStep key="pkg" selected={selectedPkg} onSelect={(p) => { setSelectedPkg(p); setGroupSize(2); }} />,
    <DateTimeStep key="dt" date={selectedDate} time={selectedTime} groupSize={groupSize} selectedPkg={selectedPkg} onDateSelect={setSelectedDate} onTimeSelect={setSelectedTime} onGroupSizeChange={setGroupSize} />,
    <InfoStep key="info" data={formData} onChange={setFormData} />,
    <ConfirmStep key="confirm" pkg={selectedPkg} date={selectedDate} time={selectedTime} groupSize={groupSize} info={formData} />,
  ];

  if (done) return <SuccessScreen pkg={selectedPkg} date={selectedDate} time={selectedTime} />;

  return (
    <div>
      <StepIndicator currentStep={step} steps={t.booking.steps} />
      <div className="glass rounded-3xl border border-white/8 p-6 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {stepComponents[step]}
          </motion.div>
        </AnimatePresence>

        {error && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-5 flex items-center gap-2 text-sm text-red-400">
            <AlertCircle size={16} /> {error}
          </motion.div>
        )}

        <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/8">
          <button onClick={() => { setError(null); setStep(Math.max(0, step - 1)); }} className={`flex items-center gap-2 text-sm font-semibold text-neutral-400 hover:text-white transition-colors ${step === 0 ? "opacity-0 pointer-events-none" : ""}`}>
            <ChevronLeft size={18} /> {t.booking.btnBack}
          </button>
          {step < 3 ? (
            <button onClick={handleNext} className="flex items-center gap-2 bg-[#a3e635] text-black font-black text-sm px-8 py-3 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] transition-all duration-300">
              {t.booking.btnContinue} <ChevronRight size={18} />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} className="flex items-center gap-2 bg-[#a3e635] text-black font-black text-sm px-8 py-3 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] transition-all duration-300 disabled:opacity-60">
              {submitting ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <><Zap size={18} /> {t.booking.btnConfirm}</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BookingPage() {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#a3e635]/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs font-semibold text-[#a3e635] border border-[#a3e635]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse" />
              {t.booking.badge}
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              {t.booking.title}{" "}<span className="text-[#a3e635] neon-text">{t.booking.titleHighlight}</span>
            </h1>
            <p className="text-neutral-400 max-w-lg mx-auto">{t.booking.subtitle}</p>
          </motion.div>
          <Suspense fallback={<div className="text-neutral-500 text-center py-20">...</div>}>
            <BookingWizard />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
