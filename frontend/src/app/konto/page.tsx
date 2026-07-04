"use client";
import { useState } from "react";
import { Package, User, Clock, LogOut, ChevronRight, Edit2, Save, Truck, CheckCircle, XCircle, Timer } from "lucide-react";
import Link from "next/link";

// Mock data
const mockUser = {
  name: "Jan Kowalski",
  email: "jan@email.pl",
  phone: "+48 123 456 789",
  address: "ul. Sportowa 12/3",
  city: "Warszawa",
  zip: "00-001",
};

const mockOrders = [
  { id: "BIC-2026-001", date: "2026-03-28", status: "shipped", total: 219.98, items: [
    { name: "Gold Standard 100% Whey", qty: 1, price: 129.99, emoji: "🥤" },
    { name: "Pre-Workout Energy Blast", qty: 1, price: 89.99, emoji: "⚡" },
  ]},
  { id: "BIC-2026-002", date: "2026-03-15", status: "delivered", total: 69.99, items: [
    { name: "Creatine Monohydrate 500g", qty: 1, price: 69.99, emoji: "🥜" },
  ]},
  { id: "BIC-2026-003", date: "2026-02-20", status: "delivered", total: 179.97, items: [
    { name: "Vitamin D3 + K2 Complex", qty: 2, price: 49.99, emoji: "💊" },
    { name: "BCAA 8:1:1 Powder", qty: 1, price: 79.99, emoji: "💪" },
  ]},
  { id: "BIC-2025-048", date: "2025-12-10", status: "cancelled", total: 159.99, items: [
    { name: "Whey Isolate Premium", qty: 1, price: 159.99, emoji: "🥛" },
  ]},
];

const statusMap: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: "W realizacji", color: "text-yellow-400 bg-yellow-400/10", icon: <Timer size={14} /> },
  shipped: { label: "Wysłane", color: "text-blue-400 bg-blue-400/10", icon: <Truck size={14} /> },
  delivered: { label: "Dostarczone", color: "text-green-400 bg-green-400/10", icon: <CheckCircle size={14} /> },
  cancelled: { label: "Anulowane", color: "text-red-400 bg-red-400/10", icon: <XCircle size={14} /> },
};

type Tab = "orders" | "profile" | "history";

export default function KontoPage() {
  const [tab, setTab] = useState<Tab>("orders");
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(mockUser);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const tabs = [
    { id: "orders" as Tab, label: "Moje zamówienia", icon: <Package size={18} />, count: mockOrders.filter(o => o.status !== "delivered" && o.status !== "cancelled").length },
    { id: "profile" as Tab, label: "Dane osobowe", icon: <User size={18} /> },
    { id: "history" as Tab, label: "Historia zakupów", icon: <Clock size={18} /> },
  ];

  const activeOrders = mockOrders.filter(o => o.status === "pending" || o.status === "shipped");
  const historyOrders = mockOrders.filter(o => o.status === "delivered" || o.status === "cancelled");

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl tracking-wider mb-1">
            MOJE <span className="text-accent">KONTO</span>
          </h1>
          <p className="text-text-secondary">Witaj, {profile.name}!</p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
        >
          <LogOut size={16} /> Wyloguj się
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
            {/* User card */}
            <div className="p-5 border-b border-border">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-2xl mb-3">
                👤
              </div>
              <h3 className="font-semibold">{profile.name}</h3>
              <p className="text-text-secondary text-sm">{profile.email}</p>
            </div>

            {/* Nav */}
            <nav className="p-2">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    tab === t.id
                      ? "bg-accent/10 text-accent"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-card-hover"
                  }`}
                >
                  {t.icon}
                  {t.label}
                  {t.count ? (
                    <span className="ml-auto bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {t.count}
                    </span>
                  ) : (
                    <ChevronRight size={14} className="ml-auto opacity-40" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* ═══ ORDERS TAB ═══ */}
          {tab === "orders" && (
            <div>
              <h2 className="font-display text-2xl tracking-wider mb-6">
                AKTYWNE <span className="text-accent">ZAMÓWIENIA</span>
              </h2>

              {activeOrders.length === 0 ? (
                <div className="bg-bg-card border border-border rounded-xl p-12 text-center">
                  <div className="text-5xl mb-4">📦</div>
                  <h3 className="font-display text-xl tracking-wider mb-2">Brak aktywnych zamówień</h3>
                  <p className="text-text-secondary mb-6">Czas coś zamówić!</p>
                  <Link href="/produkty" className="bg-accent text-white px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider hover:translate-y-[-2px] transition-all inline-block">
                    Przejdź do sklepu
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      expanded={expandedOrder === order.id}
                      onToggle={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ PROFILE TAB ═══ */}
          {tab === "profile" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl tracking-wider">
                  DANE <span className="text-accent">OSOBOWE</span>
                </h2>
                <button
                  onClick={() => setEditing(!editing)}
                  className="flex items-center gap-2 text-sm text-accent hover:underline"
                >
                  {editing ? <Save size={16} /> : <Edit2 size={16} />}
                  {editing ? "Zapisz" : "Edytuj"}
                </button>
              </div>

              <div className="bg-bg-card border border-border rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { key: "name", label: "Imię i nazwisko" },
                    { key: "email", label: "E-mail" },
                    { key: "phone", label: "Telefon" },
                    { key: "address", label: "Adres" },
                    { key: "city", label: "Miasto" },
                    { key: "zip", label: "Kod pocztowy" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="text-sm text-text-secondary block mb-2">{field.label}</label>
                      {editing ? (
                        <input
                          type="text"
                          value={profile[field.key as keyof typeof profile]}
                          onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                          className="w-full bg-bg-dark border border-border rounded-lg px-4 py-3 text-text-primary focus:border-accent focus:outline-none transition-colors"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-bg-dark rounded-lg text-text-primary border border-transparent">
                          {profile[field.key as keyof typeof profile]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {editing && (
                  <div className="mt-6 flex gap-3 justify-end">
                    <button
                      onClick={() => { setEditing(false); setProfile(mockUser); }}
                      className="px-6 py-2.5 border border-border rounded-lg text-sm text-text-secondary hover:border-accent/40 transition-all"
                    >
                      Anuluj
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="px-6 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:translate-y-[-1px] transition-all"
                    >
                      Zapisz zmiany
                    </button>
                  </div>
                )}
              </div>

              {/* Change password section */}
              <div className="mt-6 bg-bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold mb-4">Zmiana hasła</h3>
                <div className="space-y-4 max-w-md">
                  <input type="password" placeholder="Aktualne hasło" className="w-full bg-bg-dark border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors" />
                  <input type="password" placeholder="Nowe hasło" className="w-full bg-bg-dark border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors" />
                  <input type="password" placeholder="Powtórz nowe hasło" className="w-full bg-bg-dark border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors" />
                  <button className="bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:translate-y-[-1px] transition-all">
                    Zmień hasło
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ═══ HISTORY TAB ═══ */}
          {tab === "history" && (
            <div>
              <h2 className="font-display text-2xl tracking-wider mb-6">
                HISTORIA <span className="text-accent">ZAKUPÓW</span>
              </h2>

              {historyOrders.length === 0 ? (
                <div className="bg-bg-card border border-border rounded-xl p-12 text-center">
                  <div className="text-5xl mb-4">📋</div>
                  <h3 className="font-display text-xl tracking-wider mb-2">Brak historii</h3>
                  <p className="text-text-secondary">Tu pojawią się Twoje zrealizowane zamówienia</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {historyOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      expanded={expandedOrder === order.id}
                      onToggle={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    />
                  ))}
                </div>
              )}

              {/* Summary */}
              <div className="mt-8 bg-bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold mb-4">Podsumowanie</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-bg-dark rounded-lg p-4 text-center">
                    <div className="font-display text-2xl text-accent">{mockOrders.length}</div>
                    <div className="text-text-secondary text-sm">Zamówień</div>
                  </div>
                  <div className="bg-bg-dark rounded-lg p-4 text-center">
                    <div className="font-display text-2xl text-accent">
                      {mockOrders.filter(o => o.status === "delivered").length}
                    </div>
                    <div className="text-text-secondary text-sm">Dostarczonych</div>
                  </div>
                  <div className="bg-bg-dark rounded-lg p-4 text-center">
                    <div className="font-display text-2xl text-accent">
                      {mockOrders.reduce((s, o) => s + (o.status !== "cancelled" ? o.total : 0), 0).toFixed(2)} zł
                    </div>
                    <div className="text-text-secondary text-sm">Wydano łącznie</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══ Order Card Component ═══ */
function OrderCard({ order, expanded, onToggle }: {
  order: typeof mockOrders[0];
  expanded: boolean;
  onToggle: () => void;
}) {
  const status = statusMap[order.status];

  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden hover:border-border/80 transition-all">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-5 text-left">
        <div className="flex items-center gap-4">
          <div className="text-3xl">📦</div>
          <div>
            <div className="font-semibold text-sm">{order.id}</div>
            <div className="text-text-muted text-xs">{order.date}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${status.color}`}>
            {status.icon} {status.label}
          </span>
          <span className="font-bold text-sm">{order.total.toFixed(2)} zł</span>
          <ChevronRight size={16} className={`text-text-muted transition-transform ${expanded ? "rotate-90" : ""}`} />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border p-5 bg-bg-dark/50">
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-text-muted text-xs">Ilość: {item.qty}</div>
                  </div>
                </div>
                <div className="text-sm font-semibold">{item.price.toFixed(2)} zł</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
            <span className="text-text-secondary text-sm">Suma</span>
            <span className="font-bold text-accent">{order.total.toFixed(2)} zł</span>
          </div>
        </div>
      )}
    </div>
  );
}
