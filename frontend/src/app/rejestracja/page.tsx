"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, User, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RejestracjaPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Hasła nie są identyczne");
      return;
    }

    setLoading(true);
    const result = await register(form.name, form.email, form.password);
    setLoading(false);

    if (result.ok) {
      router.push("/konto");
    } else {
      setError(result.error || "Błąd rejestracji");
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl tracking-wider mb-3">
          DOŁĄCZ DO <span className="text-accent">BICEPS</span>
        </h1>
        <p className="text-text-secondary">Załóż konto i zacznij zbierać punkty lojalnościowe.</p>
      </div>

      <div className="bg-bg-card border border-border rounded-2xl p-8">
        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-5 text-sm">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-text-secondary block mb-2">Imię i nazwisko</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="text" value={form.name} onChange={handleChange("name")} placeholder="Jan Kowalski" required
                className="w-full bg-bg-dark border border-border rounded-lg pl-10 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors" />
            </div>
          </div>

          <div>
            <label className="text-sm text-text-secondary block mb-2">E-mail</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="email" value={form.email} onChange={handleChange("email")} placeholder="twoj@email.pl" required
                className="w-full bg-bg-dark border border-border rounded-lg pl-10 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors" />
            </div>
          </div>

          <div>
            <label className="text-sm text-text-secondary block mb-2">Hasło</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange("password")} placeholder="Min. 8 znaków" required minLength={8}
                className="w-full bg-bg-dark border border-border rounded-lg pl-10 pr-12 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-text-secondary block mb-2">Potwierdź hasło</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type={showPassword ? "text" : "password"} value={form.confirmPassword} onChange={handleChange("confirmPassword")} placeholder="Powtórz hasło" required
                className="w-full bg-bg-dark border border-border rounded-lg pl-10 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors" />
            </div>
          </div>

          <label className="flex items-start gap-2 text-text-secondary text-sm cursor-pointer">
            <input type="checkbox" required className="accent-accent mt-1" />
            <span>Akceptuję <a href="#" className="text-accent hover:underline">regulamin</a> i <a href="#" className="text-accent hover:underline">politykę prywatności</a></span>
          </label>

          <button type="submit" disabled={loading}
            className="w-full bg-accent text-white py-3.5 rounded-lg font-semibold text-sm uppercase tracking-wider hover:translate-y-[-2px] hover:shadow-[0_8px_32px_var(--color-accent-glow)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Rejestracja..." : "Zarejestruj się"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-text-secondary">
          Masz już konto?{" "}
          <Link href="/logowanie" className="text-accent hover:underline font-semibold">
            Zaloguj się
          </Link>
        </div>
      </div>
    </div>
  );
}
