"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Target, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

const ADMIN_PASSWORD = "admin1234";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    await new Promise((r) => setTimeout(r, 600));
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#a3e635]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/20 flex items-center justify-center">
            <Target size={20} className="text-[#a3e635]" />
          </div>
          <div>
            <p className="text-white font-black text-sm">Ahsa Paintball</p>
            <p className="text-neutral-500 text-xs">Admin Portal</p>
          </div>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl border border-white/8 p-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/20 mb-6 mx-auto">
            <Lock size={20} className="text-[#a3e635]" />
          </div>
          <h1 className="text-xl font-black text-white text-center mb-1">Admin Access</h1>
          <p className="text-neutral-500 text-xs text-center mb-8">
            Enter your admin password to access the command center.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Password"
                autoFocus
                className={`w-full bg-white/4 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:bg-white/6 transition-all pr-11 ${
                  error
                    ? "border-red-500/50 focus:border-red-500/70"
                    : "border-white/10 focus:border-[#a3e635]/50"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs">
                <AlertCircle size={14} />
                Incorrect password. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-[#a3e635] text-black font-black text-sm py-3 rounded-xl hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(163,230,53,0.4)] transition-all duration-300 disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                "Enter Command Center"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-neutral-700 text-xs mt-6">
          <a href="/" className="hover:text-neutral-400 transition-colors">
            ← Back to main site
          </a>
        </p>
      </div>
    </div>
  );
}
