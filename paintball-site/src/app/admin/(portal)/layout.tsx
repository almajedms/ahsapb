"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, CalendarDays, Clock, Target,
  LogOut, Menu, X, ChevronRight,
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard",    label: "Dashboard",    icon: LayoutDashboard },
  { href: "/admin/bookings",     label: "Bookings",     icon: CalendarDays },
  { href: "/admin/availability", label: "Availability", icon: Clock },
];

export default function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "true") {
      setAuthed(true);
    } else {
      router.replace("/admin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/admin");
  };

  // Blank screen while checking auth (prevents flash of content)
  if (!authed) return <div className="min-h-screen bg-[#080808]" />;

  const pageTitle = NAV.find((n) => n.href === pathname)?.label ?? "Admin";

  return (
    <div className="min-h-screen bg-[#080808] flex">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 bg-[#0c0c0c] border-r border-white/6 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-5 py-4 border-b border-white/6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#a3e635]/10 border border-[#a3e635]/20 flex items-center justify-center flex-shrink-0">
              <Target size={15} className="text-[#a3e635]" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-black text-xs leading-none">Ahsa Paintball</p>
              <p className="text-neutral-600 text-[10px] mt-0.5">Command Center</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-[#a3e635]/10 text-[#a3e635] border border-[#a3e635]/20"
                    : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon size={15} className="flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={13} />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-white/6 space-y-1">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-neutral-500 hover:text-red-400 hover:bg-red-400/5 transition-all w-full border border-transparent"
          >
            <LogOut size={15} />
            Log Out
          </button>
          <a
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            ← Main site
          </a>
        </div>
      </aside>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main area ───────────────────────────────────────── */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-[#080808]/90 backdrop-blur border-b border-white/6 px-4 sm:px-6 h-14 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/8 transition-colors"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <p className="text-white font-bold text-sm">{pageTitle}</p>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
