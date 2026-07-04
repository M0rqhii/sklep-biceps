"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, User, ShoppingCart, Menu, X, Shield, LogOut, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { totalItems } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { href: "/produkty", label: "Suplementy" },
    { href: "/produkty?cat=bialko", label: "Odżywki" },
    { href: "/produkty?cat=akcesoria", label: "Akcesoria" },
    { href: "/produkty?tag=Nowość", label: "Nowości" },
    { href: "/produkty?sale=true", label: "Wyprzedaż" },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-accent text-white text-center py-2 px-4 text-[13px] font-semibold tracking-wider uppercase">
        🔥 Darmowa dostawa od 150 zł — Kod: <strong>BICEPS10</strong> = 10% rabatu
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-bg-dark/92 backdrop-blur-xl border-b border-border">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link href="/" className="font-display text-[38px] tracking-[4px] text-text-primary flex items-center gap-2">
            <span className="text-accent">💪</span> BICEP<span className="text-accent">S</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:block">
            <ul className="flex gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-bg-card border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all">
              <Search size={18} />
            </button>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 h-10 px-3 rounded-full bg-bg-card border border-border hover:border-accent hover:bg-accent/10 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-[10px] font-bold text-accent">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span className="text-sm text-text-secondary hidden sm:inline">{user.name.split(" ")[0]}</span>
                  <ChevronDown size={12} className="text-text-muted" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-bg-dark border border-border rounded-xl shadow-xl z-50 min-w-[200px] overflow-hidden">
                    <div className="px-4 py-3 border-b border-border">
                      <div className="text-sm font-semibold">{user.name}</div>
                      <div className="text-xs text-text-muted">{user.email}</div>
                      {isAdmin && <span className="inline-block mt-1 text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">ADMIN</span>}
                    </div>
                    <Link href="/konto" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:bg-bg-card-hover transition-colors">
                      <User size={14} /> Moje konto
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-accent hover:bg-bg-card-hover transition-colors">
                        <Shield size={14} /> Panel Admina
                      </Link>
                    )}
                    <button onClick={() => { logout(); setUserMenuOpen(false); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:bg-bg-card-hover transition-colors border-t border-border">
                      <LogOut size={14} /> Wyloguj się
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/logowanie"
                className="w-10 h-10 rounded-full bg-bg-card border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all"
              >
                <User size={18} />
              </Link>
            )}
            <Link
              href="/koszyk"
              className="w-10 h-10 rounded-full bg-bg-card border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all relative"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden w-10 h-10 rounded-full bg-bg-card border border-border flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-border bg-bg-dark/95 backdrop-blur-xl">
            <ul className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 px-4 text-sm font-medium uppercase tracking-wider text-text-secondary hover:text-text-primary hover:bg-bg-card rounded-lg transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
