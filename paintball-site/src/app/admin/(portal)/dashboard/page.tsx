"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { CalendarDays, DollarSign, Users, Clock, ArrowRight, TrendingUp, Target } from "lucide-react";
import { PACKAGES, STATUS_STYLES, type BookingStatus, type PackageId } from "../../data";

interface Booking {
  id: string;
  created_at: string;
  name: string;
  package_id: PackageId;
  package_name: string;
  date: string;
  time: string;
  group_size: number;
  total_price: number;
  status: BookingStatus;
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((r) => r.json())
      .then((json) => { setBookings(json.bookings ?? []); setLoading(false); });
  }, []);

  const active = bookings.filter((b) => b.status !== "cancelled");
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const revenue = active.reduce((sum, b) => sum + b.total_price, 0);
  const totalPlayers = active.reduce((sum, b) => sum + b.group_size, 0);

  const today = new Date();
  const next7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
  const upcoming = bookings.filter((b) => next7.includes(b.date) && b.status !== "cancelled").length;

  const stats = [
    { label: "Total Bookings", value: bookings.length, sub: `${confirmed} confirmed`, icon: CalendarDays, color: "#a3e635" },
    { label: "Revenue (SAR)",  value: revenue.toLocaleString(), sub: "excl. cancellations", icon: DollarSign, color: "#f97316" },
    { label: "Total Players",  value: totalPlayers.toLocaleString(), sub: "across all bookings", icon: Users, color: "#a3e635" },
    { label: "Upcoming",       value: upcoming, sub: "sessions next 7 days", icon: Clock, color: "#f97316" },
  ];

  const pkgBreakdown = (["rookie", "squad", "elite"] as const).map((id) => ({
    ...PACKAGES[id],
    id,
    count: active.filter((b) => b.package_id === id).length,
  }));
  const maxCount = Math.max(...pkgBreakdown.map((p) => p.count), 1);

  const recent = [...bookings].slice(0, 6);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#a3e635]/30 border-t-[#a3e635] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-black text-white">Overview</h1>
        <p className="text-neutral-500 text-sm mt-1">{pending > 0 ? `${pending} booking${pending > 1 ? "s" : ""} waiting for confirmation.` : "All bookings are up to date."}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="glass rounded-2xl border border-white/8 p-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
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
            <Link href="/admin/bookings" className="flex items-center gap-1 text-xs text-[#a3e635] hover:text-[#a3e635]/80 transition-colors font-semibold">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {recent.length === 0 ? (
            <div className="py-12 text-center text-neutral-600 text-sm">No bookings yet.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {recent.map((b) => {
                const pkg = PACKAGES[b.package_id] ?? { name: b.package_name, color: "#a3e635" };
                return (
                  <div key={b.id} className="px-6 py-3.5 flex items-center gap-4 hover:bg-white/2 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-black text-neutral-300">{b.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{b.name}</p>
                      <p className="text-xs text-neutral-500">{pkg.name} · {format(new Date(b.date), "d MMM")} · {b.group_size} players</p>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${STATUS_STYLES[b.status]}`}>{b.status}</span>
                    <span className="text-sm font-black text-white hidden sm:block">{b.total_price} SAR</span>
                  </div>
                );
              })}
            </div>
          )}
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
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(pkg.count / maxCount) * 100}%`, background: pkg.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 pb-5 pt-2 space-y-2 border-t border-white/6 mt-2">
            <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider mb-3">Quick Actions</p>
            <Link href="/admin/bookings" className="flex items-center gap-2 w-full text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-white/8">
              <CalendarDays size={13} /> Manage Bookings
            </Link>
            <Link href="/admin/availability" className="flex items-center gap-2 w-full text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-white/8">
              <Clock size={13} /> Manage Availability
            </Link>
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 w-full text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-white/8">
              <Target size={13} /> View Public Site
            </a>
          </div>
        </div>
      </div>

      {/* Upcoming 7 days */}
      <div className="glass rounded-2xl border border-white/8 p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={16} className="text-[#a3e635]" />
          <h2 className="text-sm font-black text-white">Upcoming Schedule</h2>
          <span className="text-xs text-neutral-600 ml-auto">Next 7 days</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {next7.map((dateStr, i) => {
            const d = new Date(dateStr);
            const dayBookings = bookings.filter((b) => b.date === dateStr && b.status !== "cancelled");
            return (
              <div key={dateStr} className={`rounded-xl p-3 border text-center ${i === 0 ? "border-[#a3e635]/30 bg-[#a3e635]/5" : "border-white/6 bg-white/2"}`}>
                <p className={`text-[10px] font-bold uppercase ${i === 0 ? "text-[#a3e635]" : "text-neutral-600"}`}>{format(d, "EEE")}</p>
                <p className={`text-lg font-black mt-0.5 ${i === 0 ? "text-[#a3e635]" : "text-white"}`}>{format(d, "d")}</p>
                <div className={`text-xs font-black mt-1 ${dayBookings.length > 0 ? "text-white" : "text-neutral-700"}`}>
                  {dayBookings.length > 0 ? dayBookings.length : "—"}
                </div>
                {dayBookings.length > 0 && <p className="text-[9px] text-neutral-500 mt-0.5">sessions</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
