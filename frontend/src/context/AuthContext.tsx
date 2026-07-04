"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  city?: string;
  zip?: string;
  loyaltyPoints: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Demo accounts — work even without backend
const DEMO_ACCOUNTS: Record<string, { password: string; user: User }> = {
  "klient@biceps.pl": {
    password: "klient123",
    user: {
      id: "user_client_1",
      name: "Jan Kowalski",
      email: "klient@biceps.pl",
      role: "user",
      phone: "+48 123 456 789",
      address: "ul. Sportowa 12/3",
      city: "Warszawa",
      zip: "00-001",
      loyaltyPoints: 320,
    },
  },
  "admin@biceps.pl": {
    password: "admin123",
    user: {
      id: "user_admin_1",
      name: "Admin BICEPS",
      email: "admin@biceps.pl",
      role: "admin",
      phone: "+48 600 100 200",
      address: "ul. Siłowa 1",
      city: "Warszawa",
      zip: "00-002",
      loyaltyPoints: 0,
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("biceps_user");
    const savedToken = localStorage.getItem("biceps_token");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch {
        localStorage.removeItem("biceps_user");
        localStorage.removeItem("biceps_token");
      }
    }
    setLoading(false);
  }, []);

  const persistSession = (u: User, t: string) => {
    localStorage.setItem("biceps_user", JSON.stringify(u));
    localStorage.setItem("biceps_token", t);
    setUser(u);
    setToken(t);
  };

  const login = async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    // Try API first
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        persistSession(data.user, data.token);
        return { ok: true };
      }
      return { ok: false, error: data.error };
    } catch {
      // API unavailable — fallback to demo accounts
      const demo = DEMO_ACCOUNTS[email];
      if (demo && demo.password === password) {
        persistSession(demo.user, "demo-token-" + demo.user.id);
        return { ok: true };
      }
      if (demo) {
        return { ok: false, error: "Nieprawidłowe hasło" };
      }
      return { ok: false, error: "Nieprawidłowy email lub hasło" };
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    // Try API first
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        persistSession(data.user, data.token);
        return { ok: true };
      }
      return { ok: false, error: data.error };
    } catch {
      // API unavailable — create local session
      if (DEMO_ACCOUNTS[email]) {
        return { ok: false, error: "Email już zarejestrowany" };
      }
      const newUser: User = {
        id: "user_" + Date.now(),
        name,
        email,
        role: "user",
        loyaltyPoints: 0,
      };
      persistSession(newUser, "demo-token-" + newUser.id);
      return { ok: true };
    }
  };

  const logout = () => {
    localStorage.removeItem("biceps_user");
    localStorage.removeItem("biceps_token");
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
