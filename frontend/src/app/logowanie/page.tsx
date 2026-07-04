"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LogowaniePage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.ok) {
      router.push("/konto");
    } else {
      setError(result.error || "Błąd logowania");
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl tracking-wider mb-3">
          ZALOGUJ <span className="text-accent">SIĘ</span>
        </h1>
        <p className="text-text-secondary">Witaj z powrotem! Zaloguj się na swoje konto.</p>
      </div>

      <div className="bg-bg-card border border-border rounded-2xl p-8">
        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-5 text-sm">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-text-secondary block mb-2">E-mail</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="twoj@email.pl" required
                className="w-full bg-bg-dark border border-border rounded-lg pl-10 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors" />
            </div>
          </div>

          <div>
            <label className="text-sm text-text-secondary block mb-2">Hasło</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                className="w-full bg-bg-dark border border-border rounded-lg pl-10 pr-12 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
              <input type="checkbox" className="accent-accent" /> Zapamiętaj mnie
            </label>
            <a href="#" className="text-accent hover:underline">Zapomniałeś hasła?</a>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-accent text-white py-3.5 rounded-lg font-semibold text-sm uppercase tracking-wider hover:translate-y-[-2px] hover:shadow-[0_8px_32px_var(--color-accent-glow)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 bg-bg-dark rounded-lg p-4">
          <p className="text-xs text-text-muted mb-2 font-semibold uppercase tracking-wider">Konta demo:</p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Klient:</span>
              <span className="text-text-primary font-mono text-xs">klient@biceps.pl / klient123</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Admin:</span>
              <span className="text-text-primary font-mono text-xs">admin@biceps.pl / admin123</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-text-secondary">
          Nie masz konta?{" "}
          <Link href="/rejestracja" className="text-accent hover:underline font-semibold">
            Zarejestruj się
          </Link>
        </div>
      </div>
    </div>
  );
}
