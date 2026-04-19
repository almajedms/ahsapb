"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Search, Filter, ChevronDown, ChevronUp,
  Check, X, Clock, Phone, Mail, Users, MessageSquare, RefreshCw,
} from "lucide-react";
import { PACKAGES, STATUS_STYLES, type BookingStatus, type PackageId } from "../../data";

interface Booking {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  package_id: PackageId;
  package_name: string;
  package_price: number;
  date: string;
  time: string;
  group_size: number;
  total_price: number;
  notes?: string;
  status: BookingStatus;
}

const ALL_STATUSES: BookingStatus[] = ["confirmed", "pending", "cancelled"];
const ALL_PACKAGES: PackageId[] = ["rookie", "squad", "elite"];

const STATUS_ACTIONS: Record<BookingStatus, { next: BookingStatus; label: string; icon: typeof Check }[]> = {
  pending:   [{ next: "confirmed", label: "Confirm", icon: Check }, { next: "cancelled", label: "Cancel", icon: X }],
  confirmed: [{ next: "cancelled", label: "Cancel",  icon: X }],
  cancelled: [{ next: "confirmed", label: "Restore", icon: Check }],
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [pkgFilter, setPkgFilter] = useState<PackageId | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/bookings");
    const json = await res.json();
    setBookings(json.bookings ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id: string, next: BookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: next } : b)));
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });
  };

  const filtered = bookings.filter((b) => {
    const q = query.toLowerCase();
    const matchesQuery = !q || b.name.toLowerCase().includes(q) || b.email?.toLowerCase().includes(q) || b.phone.includes(q);
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesPkg    = pkgFilter === "all" || b.package_id === pkgFilter;
    return matchesQuery && matchesStatus && matchesPkg;
  });

  const counts = {
    all:       bookings.length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    pending:   bookings.filter((b) => b.status === "pending").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Bookings</h1>
          <p className="text-neutral-500 text-sm mt-1">
            {bookings.length} total · {counts.pending} pending action
          </p>
        </div>
        <button onClick={fetchBookings} className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 px-3 py-2 rounded-xl transition-all">
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {(["all", ...ALL_STATUSES] as const).map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
              statusFilter === s
                ? s === "all" ? "bg-white/10 text-white border-white/20" : STATUS_STYLES[s as BookingStatus]
                : "text-neutral-500 border-white/8 hover:border-white/20 hover:text-neutral-300"
            }`}
          >
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            <span className="ml-1.5 opacity-60">{counts[s as keyof typeof counts]}</span>
          </button>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, phone…"
            className="w-full bg-white/4 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#a3e635]/40 transition-all" />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-neutral-500" />
          <select value={pkgFilter} onChange={(e) => setPkgFilter(e.target.value as PackageId | "all")}
            className="bg-white/4 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#a3e635]/40 transition-all appearance-none cursor-pointer">
            <option value="all">All packages</option>
            {ALL_PACKAGES.map((id) => <option key={id} value={id}>{PACKAGES[id].name}</option>)}
          </select>
        </div>
      </div>

      {/* List */}
      <div className="glass rounded-2xl border border-white/8 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center">
            <div className="w-6 h-6 border-2 border-[#a3e635]/30 border-t-[#a3e635] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-neutral-500 text-sm">Loading bookings…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-neutral-500 text-sm">{bookings.length === 0 ? "No bookings yet." : "No bookings match your filters."}</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((b) => {
              const pkg = PACKAGES[b.package_id] ?? { name: b.package_name, color: "#a3e635" };
              const isExpanded = expanded === b.id;
              return (
                <div key={b.id} className="transition-colors hover:bg-white/[0.015]">
                  <button className="w-full text-left px-6 py-4 flex items-center gap-4" onClick={() => setExpanded(isExpanded ? null : b.id)}>
                    <div className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-black text-neutral-300">{b.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-white">{b.name}</span>
                        <span className="text-[10px] font-mono text-neutral-600">{b.id.slice(0, 8)}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                        <span className="text-xs" style={{ color: pkg.color }}>{pkg.name}</span>
                        <span className="text-xs text-neutral-600">{format(new Date(b.date), "d MMM yyyy")} · {b.time}</span>
                        <span className="text-xs text-neutral-600 flex items-center gap-1"><Users size={11} /> {b.group_size}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border flex-shrink-0 ${STATUS_STYLES[b.status]}`}>{b.status}</span>
                    <span className="text-sm font-black text-white hidden md:block flex-shrink-0">{b.total_price} SAR</span>
                    <span className="text-neutral-600 flex-shrink-0">{isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</span>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-5 border-t border-white/5 pt-4 bg-white/[0.02]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider">Contact</p>
                          <p className="flex items-center gap-2 text-sm text-neutral-300"><Phone size={12} className="text-neutral-500" /> {b.phone}</p>
                          {b.email && <p className="flex items-center gap-2 text-sm text-neutral-300"><Mail size={12} className="text-neutral-500" /> {b.email}</p>}
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider">Session</p>
                          <p className="text-sm text-neutral-300">{format(new Date(b.date), "EEEE, d MMMM yyyy")}</p>
                          <p className="flex items-center gap-2 text-sm text-neutral-300"><Clock size={12} className="text-neutral-500" /> {b.time} · {b.group_size} players</p>
                        </div>
                        {b.notes && (
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider">Notes</p>
                            <p className="flex items-start gap-2 text-sm text-neutral-300"><MessageSquare size={12} className="text-neutral-500 mt-0.5 flex-shrink-0" />{b.notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider mr-1">Change status:</span>
                        {STATUS_ACTIONS[b.status].map(({ next, label, icon: Icon }) => (
                          <button key={next} onClick={() => updateStatus(b.id, next)}
                            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                              next === "confirmed" ? "border-[#a3e635]/30 text-[#a3e635] hover:bg-[#a3e635]/10"
                              : next === "cancelled" ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                              : "border-white/20 text-white hover:bg-white/8"
                            }`}
                          >
                            <Icon size={12} /> {label}
                          </button>
                        ))}
                        <span className="ml-auto text-xs text-neutral-600">Booked {format(new Date(b.created_at), "d MMM yyyy, HH:mm")}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
