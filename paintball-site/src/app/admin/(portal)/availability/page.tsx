"use client";

import { useState, useEffect } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Check, Ban, Save, RotateCcw } from "lucide-react";
import { MOCK_BOOKINGS } from "../../data";

// ── Constants ─────────────────────────────────────────────────────────────────

const TIME_SLOTS = [
  { time: "10:00", label: "10:00 AM" },
  { time: "12:00", label: "12:00 PM" },
  { time: "14:00", label: "2:00 PM" },
  { time: "16:00", label: "4:00 PM" },
  { time: "18:00", label: "6:00 PM" },
  { time: "20:00", label: "8:00 PM" },
  { time: "22:00", label: "10:00 PM" },
];

// LocalStorage key for blocked slots
const LS_KEY = "admin_blocked_slots";

// A slot key is "YYYY-MM-DD|HH:mm"
type SlotKey = string;

function slotKey(date: string, time: string): SlotKey {
  return `${date}|${time}`;
}

function loadBlocked(): Set<SlotKey> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? new Set(JSON.parse(raw) as SlotKey[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveBlocked(blocked: Set<SlotKey>) {
  localStorage.setItem(LS_KEY, JSON.stringify([...blocked]));
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AvailabilityPage() {
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date("2026-04-15"), { weekStartsOn: 1 }) // Monday
  );
  const [blocked, setBlocked] = useState<Set<SlotKey>>(new Set());
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setBlocked(loadBlocked());
  }, []);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const toggleSlot = (dateStr: string, time: string) => {
    const key = slotKey(dateStr, time);
    setBlocked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    setDirty(true);
    setSaved(false);
  };

  const handleSave = () => {
    saveBlocked(blocked);
    setDirty(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    const fresh = loadBlocked();
    setBlocked(fresh);
    setDirty(false);
  };

  // Check if a slot has a booking
  const getBookingsForSlot = (dateStr: string, time: string) =>
    MOCK_BOOKINGS.filter(
      (b) => b.date === dateStr && b.time === time && b.status !== "cancelled"
    );

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-white">Availability</h1>
          <p className="text-neutral-500 text-sm mt-1">
            Block or unblock time slots for the week. Slots with bookings are shown in green.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {dirty && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white px-3 py-2 rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              <RotateCcw size={13} /> Discard
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!dirty}
            className={`flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-xl border transition-all duration-200 ${
              saved
                ? "bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635]/30"
                : dirty
                ? "bg-[#a3e635] text-black border-[#a3e635] hover:shadow-[0_0_20px_rgba(163,230,53,0.35)]"
                : "bg-white/4 text-neutral-500 border-white/8 cursor-not-allowed"
            }`}
          >
            {saved ? <><Check size={13} /> Saved</> : <><Save size={13} /> Save Changes</>}
          </button>
        </div>
      </div>

      {/* Week navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setWeekStart((d) => addDays(d, -7))}
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-bold text-white">
          {format(weekStart, "d MMM")} – {format(addDays(weekStart, 6), "d MMM yyyy")}
        </span>
        <button
          onClick={() => setWeekStart((d) => addDays(d, 7))}
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
        >
          <ChevronRight size={16} />
        </button>
        <button
          onClick={() => setWeekStart(startOfWeek(new Date("2026-04-15"), { weekStartsOn: 1 }))}
          className="ml-2 text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
        >
          This week
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 text-xs text-neutral-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-[#a3e635]/20 border border-[#a3e635]/30" /> Available with booking
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-white/5 border border-white/10" /> Available (open)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-red-500/10 border border-red-500/20" /> Blocked
        </span>
      </div>

      {/* Grid */}
      <div className="glass rounded-2xl border border-white/8 overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-white/6">
          <div className="px-4 py-3" />
          {weekDays.map((day) => {
            const isToday = format(day, "yyyy-MM-dd") === "2026-04-15";
            return (
              <div
                key={day.toISOString()}
                className={`px-2 py-3 text-center border-l border-white/6 ${isToday ? "bg-[#a3e635]/5" : ""}`}
              >
                <p className={`text-[10px] font-bold uppercase ${isToday ? "text-[#a3e635]" : "text-neutral-600"}`}>
                  {format(day, "EEE")}
                </p>
                <p className={`text-sm font-black mt-0.5 ${isToday ? "text-[#a3e635]" : "text-white"}`}>
                  {format(day, "d")}
                </p>
              </div>
            );
          })}
        </div>

        {/* Time slot rows */}
        {TIME_SLOTS.map(({ time, label }) => (
          <div key={time} className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-white/5 last:border-b-0">
            {/* Time label */}
            <div className="px-4 py-3 flex items-center">
              <span className="text-xs font-semibold text-neutral-600">{label}</span>
            </div>

            {/* Cells */}
            {weekDays.map((day) => {
              const dateStr = format(day, "yyyy-MM-dd");
              const key = slotKey(dateStr, time);
              const isBlocked = blocked.has(key);
              const slotBookings = getBookingsForSlot(dateStr, time);
              const hasBooking = slotBookings.length > 0;

              return (
                <div key={key} className="border-l border-white/6 p-1.5">
                  <button
                    onClick={() => toggleSlot(dateStr, time)}
                    title={
                      isBlocked
                        ? "Click to unblock"
                        : hasBooking
                        ? `Booked: ${slotBookings[0].name}`
                        : "Click to block"
                    }
                    className={`w-full h-12 rounded-lg border flex flex-col items-center justify-center gap-0.5 transition-all duration-200 text-[10px] font-semibold ${
                      isBlocked
                        ? "bg-red-500/8 border-red-500/20 text-red-400 hover:bg-red-500/15"
                        : hasBooking
                        ? "bg-[#a3e635]/8 border-[#a3e635]/20 text-[#a3e635] hover:bg-[#a3e635]/15"
                        : "bg-white/3 border-white/8 text-neutral-600 hover:bg-white/8 hover:border-white/15 hover:text-neutral-400"
                    }`}
                  >
                    {isBlocked ? (
                      <><Ban size={12} /> Blocked</>
                    ) : hasBooking ? (
                      <><Check size={12} /> Booked</>
                    ) : (
                      <span className="text-neutral-700">Open</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="glass rounded-xl border border-white/8 p-4">
          <p className="text-2xl font-black text-white">{TIME_SLOTS.length * 7 - blocked.size}</p>
          <p className="text-xs text-neutral-500 mt-0.5">Open slots this week</p>
        </div>
        <div className="glass rounded-xl border border-white/8 p-4">
          <p className="text-2xl font-black text-white">{blocked.size}</p>
          <p className="text-xs text-neutral-500 mt-0.5">Blocked slots</p>
        </div>
        <div className="glass rounded-xl border border-white/8 p-4">
          <p className="text-2xl font-black text-[#a3e635]">
            {weekDays.reduce((sum, day) => {
              const dateStr = format(day, "yyyy-MM-dd");
              return sum + MOCK_BOOKINGS.filter(
                (b) => b.date === dateStr && b.status !== "cancelled"
              ).length;
            }, 0)}
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">Bookings this week</p>
        </div>
      </div>
    </div>
  );
}
