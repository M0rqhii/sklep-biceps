"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, ArrowLeft, Shield } from "lucide-react";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/admin/produkty", label: "Produkty", icon: <Package size={18} /> },
  { href: "/admin/zamowienia", label: "Zamówienia", icon: <ShoppingCart size={18} /> },
  { href: "/admin/uzytkownicy", label: "Użytkownicy", icon: <Users size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-card border-r border-border shrink-0 sticky top-0 h-screen flex flex-col">
        {/* Admin logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={20} className="text-accent" />
            <span className="font-display text-xl tracking-wider">BICEP<span className="text-accent">S</span></span>
          </div>
          <span className="text-[11px] uppercase tracking-widest text-text-muted font-semibold">Panel Admina</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-card-hover"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Back to store */}
        <div className="p-3 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-all"
          >
            <ArrowLeft size={18} />
            Wróć do sklepu
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
