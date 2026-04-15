"use client";

import Link from "next/link";
import { format } from "date-fns";
import {
  CalendarDays, DollarSign, Users, Clock,
  ArrowRight, TrendingUp, Target,
} from "lucide-react";
import { MOCK_BOOKINGS, PACKAGES, STATUS_STYLES, type BookingStatus } from "../../data";

// ── Derived stats ─────────────────────────────────────────────────────────────

const total = MOCK_BOOKINGS.length;
const confirmed = MOCK_BOOKINGS.filter((b) => b.status === "confirmed").length;
const revenue = MOCK_BOOKINGS.filter((b) => b.status !== "cancelled")
  .reduce((sum, b) => sum + b.total, 0);
const totalPlayers = MOCK_BOOKINGS.filter((b) => b.status !== "cancelled")
  .reduce((sum, b) => sum + b.groupSize, 0);

const STATS = [
  { label: "Total Bookings",  value: total,                          sub: `${confirmed} confirmed`,        icon: CalendarDays, color: "#a3e635" },
  { label: "Revenue (SAR)",   value: revenue.toLocaleString(),       sub: "excl. cancellations",           icon: DollarSign,   color: "#f97316" },
  { label: "Total Players",   value: totalPlayers.toLocaleString(),  sub: "across all bookings",           icon: Users,        color: "#a3e635" },
  { label: "Upcoming",        value: 8,                              sub: "sessions next 7 days",          icon: Clock,        color: "#f97316" },
];

// Package breakdown
const pkgBreakdown = (["rookie", "squad", "elite"] as const).map((id) => ({
  ...PACKAGES[id],
  id,
  count: MOCK_BOOKINGS.filter((b) => b.package === id && b.status !== "cancelled").length,
}));
const maxCount = Math.max(...pkgBreakdown.map((p) => p.count));

// Recent bookings (latest 6 by createdAt)
const recent = [...MOCK_BOOKINGS]
  .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  .slice(0, 6);

// ── Component ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Overview</h1>
        <p className="text-neutral-500 text-sm mt-1">
          Welcome back. Here&apos;s what&apos;s happening at Ahsa Paintball.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="glass rounded-2xl border border-white/8 p-5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${color}18`, border: `1px solid ${color}30` }}
            >
              <Icon size={16} style={{ color }} />
            </div>
            <p className="text-2xl font-black text-white">{value}</p>
            <p className="text-xs font-semibold text-neutral-400 mt-0.5">{label}</p>
            <p className="text-[11px] text-neutral-600 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <div className="lg:col-span-2 glass rounded-2xl border border-white/8 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/6 flex items-center justify-between">
            <h2 className="text-sm font-black text-white">Recent Bookings</h2>
            <Link
              href="/admin/bookings"
              className="flex items-center gap-1 text-xs text-[#a3e635] hover:text-[#a3e635]/80 transition-colors font-semibold"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {recent.map((b) => (
              <div key={b.id} className="px-6 py-3.5 flex items-center gap-4 hover:bg-white/2 transition-colors">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-black text-neutral-300">
                    {b.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </span>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{b.name}</p>
                  <p className="text-xs text-neutral-500">
                    {PACKAGES[b.package].name} · {format(new Date(b.date), "d MMM")} · {b.groupSize} players
                  </p>
                </div>
                {/* Status */}
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${STATUS_STYLES[b.status as BookingStatus]}`}
                >
                  {b.status}
                </span>
                {/* Total */}
                <span className="text-sm font-black text-white hidden sm:block">{b.total} SAR</span>
              </div>
            ))}
          </div>
        </div>

        {/* Package breakdown */}
        <div className="glass rounded-2xl border border-white/8 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/6">
            <h2 className="text-sm font-black text-white">Package Split</h2>
            <p className="text-xs text-neutral-500 mt-0.5">confirmed + pending only</p>
          </div>
          <div className="px-6 py-5 space-y-5">
            {pkgBreakdown.map((pkg) => (
              <div key={pkg.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: pkg.color }} />
                    <span className="text-xs font-semibold text-neutral-300">{pkg.name}</span>
                  </div>
                  <span className="text-xs font-black text-white">{pkg.count}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: maxCount > 0 ? `${(pkg.count / maxCount) * 100}%` : "0%",
                      background: pkg.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="px-6 pb-5 pt-2 space-y-2 border-t border-white/6 mt-2">
            <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider mb-3">Quick Actions</p>
            <Link
              href="/admin/bookings"
              className="flex items-center gap-2 w-full text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-white/8"
            >
              <CalendarDays size={13} /> Manage Bookings
            </Link>
            <Link
              href="/admin/availability"
              className="flex items-center gap-2 w-full text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-white/8"
            >
              <Clock size={13} /> Manage Availability
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 w-full text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-white/8"
            >
              <Target size={13} /> View Public Site
            </a>
          </div>
        </div>
      </div>

      {/* Revenue trend (simplified visual) */}
      <div className="glass rounded-2xl border border-white/8 p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={16} className="text-[#a3e635]" />
          <h2 className="text-sm font-black text-white">Upcoming Schedule</h2>
          <span className="text-xs text-neutral-600 ml-auto">Next 7 days</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }, (_, i) => {
            const d = new Date("2026-04-15");
            d.setDate(d.getDate() + i);
            const dateStr = d.toISOString().slice(0, 10);
            const dayBookings = MOCK_BOOKINGS.filter(
              (b) => b.date === dateStr && b.status !== "cancelled"
            );
            const isToday = i === 0;
            return (
              <div key={dateStr} className={`rounded-xl p-3 border text-center ${isToday ? "border-[#a3e635]/30 bg-[#a3e635]/5" : "border-white/6 bg-white/2"}`}>
                <p className={`text-[10px] font-bold uppercase ${isToday ? "text-[#a3e635]" : "text-neutral-600"}`}>
                  {format(d, "EEE")}
                </p>
                <p className={`text-lg font-black mt-0.5 ${isToday ? "text-[#a3e635]" : "text-white"}`}>
                  {format(d, "d")}
                </p>
                <div className={`text-xs font-black mt-1 ${dayBookings.length > 0 ? "text-white" : "text-neutral-700"}`}>
                  {dayBookings.length > 0 ? dayBookings.length : "—"}
                </div>
                {dayBookings.length > 0 && (
                  <p className="text-[9px] text-neutral-500 mt-0.5">sessions</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
