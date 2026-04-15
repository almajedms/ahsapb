export type BookingStatus = "confirmed" | "pending" | "cancelled";
export type PackageId = "rookie" | "squad" | "elite";

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  package: PackageId;
  date: string;  // YYYY-MM-DD
  time: string;  // HH:mm
  groupSize: number;
  status: BookingStatus;
  total: number;
  notes: string;
  createdAt: string; // ISO datetime
}

export const PACKAGES: Record<PackageId, { name: string; price: number; color: string }> = {
  rookie: { name: "Rookie Rumble", price: 149, color: "#94a3b8" },
  squad:  { name: "Squad Assault", price: 279, color: "#a3e635" },
  elite:  { name: "Elite Warfare", price: 499, color: "#f97316" },
};

export const STATUS_STYLES: Record<BookingStatus, string> = {
  confirmed: "bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635]/20",
  pending:   "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export const MOCK_BOOKINGS: Booking[] = [
  { id: "BK-001", name: "Khalid Al-Rashidi",   phone: "+966 50 123 4567", email: "khalid@example.com",   package: "elite",  date: "2026-04-15", time: "10:00", groupSize: 18, status: "confirmed", total: 499, notes: "Corporate team building",          createdAt: "2026-04-10T09:00:00" },
  { id: "BK-002", name: "Sara Al-Mutairi",     phone: "+966 55 234 5678", email: "sara@example.com",     package: "squad",  date: "2026-04-15", time: "16:00", groupSize: 12, status: "confirmed", total: 279, notes: "30th birthday party",              createdAt: "2026-04-11T14:30:00" },
  { id: "BK-003", name: "Mohammed Al-Zahrani", phone: "+966 56 345 6789", email: "mzahrani@example.com", package: "rookie", date: "2026-04-16", time: "12:00", groupSize: 6,  status: "pending",   total: 149, notes: "",                               createdAt: "2026-04-14T18:45:00" },
  { id: "BK-004", name: "Fatima Al-Dosari",    phone: "+966 59 456 7890", email: "fatima@example.com",   package: "elite",  date: "2026-04-17", time: "10:00", groupSize: 28, status: "confirmed", total: 499, notes: "Need extra gear for all 28",      createdAt: "2026-04-08T10:00:00" },
  { id: "BK-005", name: "Ahmed Al-Ghamdi",     phone: "+966 50 567 8901", email: "ahmed@example.com",    package: "squad",  date: "2026-04-18", time: "18:00", groupSize: 10, status: "confirmed", total: 279, notes: "",                               createdAt: "2026-04-12T11:15:00" },
  { id: "BK-006", name: "Nora Al-Shehri",      phone: "+966 55 678 9012", email: "nora@example.com",     package: "rookie", date: "2026-04-18", time: "14:00", groupSize: 5,  status: "cancelled", total: 149, notes: "",                               createdAt: "2026-04-13T09:00:00" },
  { id: "BK-007", name: "Omar Al-Qahtani",     phone: "+966 56 789 0123", email: "omar@example.com",     package: "squad",  date: "2026-04-19", time: "10:00", groupSize: 14, status: "confirmed", total: 279, notes: "",                               createdAt: "2026-04-09T16:00:00" },
  { id: "BK-008", name: "Lina Al-Harbi",       phone: "+966 59 890 1234", email: "lina@example.com",     package: "elite",  date: "2026-04-20", time: "16:00", groupSize: 22, status: "pending",   total: 499, notes: "Awaiting catering confirmation", createdAt: "2026-04-14T20:00:00" },
  { id: "BK-009", name: "Tariq Al-Anzi",       phone: "+966 50 901 2345", email: "tariq@example.com",    package: "rookie", date: "2026-04-21", time: "12:00", groupSize: 4,  status: "confirmed", total: 149, notes: "",                               createdAt: "2026-04-10T13:00:00" },
  { id: "BK-010", name: "Hana Al-Shamsi",      phone: "+966 55 012 3456", email: "hana@example.com",     package: "squad",  date: "2026-04-21", time: "20:00", groupSize: 16, status: "confirmed", total: 279, notes: "Company outing",                  createdAt: "2026-04-11T08:30:00" },
  { id: "BK-011", name: "Rayan Al-Mutlaq",     phone: "+966 56 123 0987", email: "rayan@example.com",    package: "squad",  date: "2026-04-22", time: "10:00", groupSize: 8,  status: "pending",   total: 279, notes: "",                               createdAt: "2026-04-14T22:00:00" },
  { id: "BK-012", name: "Deema Al-Otaibi",     phone: "+966 59 234 1098", email: "deema@example.com",    package: "elite",  date: "2026-04-24", time: "16:00", groupSize: 30, status: "confirmed", total: 499, notes: "Annual company tournament",        createdAt: "2026-04-07T10:00:00" },
];
