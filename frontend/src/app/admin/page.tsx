"use client";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Przychód (marzec)", value: "45 230 zł", change: "+12.5%", up: true, icon: <DollarSign size={20} /> },
  { label: "Zamówienia", value: "312", change: "+8.3%", up: true, icon: <ShoppingCart size={20} /> },
  { label: "Klienci", value: "1 247", change: "+23.1%", up: true, icon: <Users size={20} /> },
  { label: "Produkty", value: "48", change: "+2", up: true, icon: <Package size={20} /> },
];

const recentOrders = [
  { id: "BIC-2026-312", customer: "Anna Nowak", total: 219.98, status: "pending", date: "dziś, 14:22" },
  { id: "BIC-2026-311", customer: "Piotr Wiśniewski", total: 89.99, status: "shipped", date: "dziś, 12:05" },
  { id: "BIC-2026-310", customer: "Marta Zielińska", total: 349.97, status: "shipped", date: "dziś, 10:33" },
  { id: "BIC-2026-309", customer: "Tomasz Lewandowski", total: 69.99, status: "delivered", date: "wczoraj, 18:41" },
  { id: "BIC-2026-308", customer: "Karolina Dąbrowska", total: 159.99, status: "delivered", date: "wczoraj, 15:12" },
];

const topProducts = [
  { name: "Gold Standard 100% Whey", sold: 89, revenue: "11 569 zł", emoji: "🥤" },
  { name: "Creatine Monohydrate 500g", sold: 67, revenue: "4 689 zł", emoji: "🥜" },
  { name: "Pre-Workout Energy Blast", sold: 54, revenue: "4 859 zł", emoji: "⚡" },
  { name: "Vitamin D3 + K2 Complex", sold: 48, revenue: "2 399 zł", emoji: "💊" },
  { name: "Whey Isolate Premium", sold: 41, revenue: "6 559 zł", emoji: "🥛" },
];

const statusColors: Record<string, string> = {
  pending: "text-yellow-400 bg-yellow-400/10",
  shipped: "text-blue-400 bg-blue-400/10",
  delivered: "text-green-400 bg-green-400/10",
};
const statusLabels: Record<string, string> = {
  pending: "W realizacji",
  shipped: "Wysłane",
  delivered: "Dostarczone",
};

// Simple bar chart component
function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((val, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all hover:opacity-80"
          style={{
            height: `${(val / max) * 100}%`,
            background: color,
            minHeight: "4px",
          }}
        />
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const weeklyRevenue = [3200, 4100, 3800, 5200, 4800, 6100, 5400];
  const weeklyOrders = [28, 35, 31, 42, 38, 52, 44];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl tracking-wider mb-1">
          DASHBOARD
        </h1>
        <p className="text-text-secondary text-sm">Przegląd sklepu — marzec 2026</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-bg-card border border-border rounded-xl p-5 hover:border-accent/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                {s.icon}
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold ${s.up ? "text-green-400" : "text-red-400"}`}>
                {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {s.change}
              </span>
            </div>
            <div className="font-bold text-2xl mb-1">{s.value}</div>
            <div className="text-text-muted text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-sm mb-1">Przychód (ostatnie 7 dni)</h3>
          <p className="text-text-muted text-xs mb-4">Łącznie: 32 650 zł</p>
          <MiniChart data={weeklyRevenue} color="rgba(230, 57, 70, 0.7)" />
          <div className="flex justify-between text-[10px] text-text-muted mt-2">
            <span>Pon</span><span>Wt</span><span>Śr</span><span>Czw</span><span>Pt</span><span>Sob</span><span>Ndz</span>
          </div>
        </div>
        <div className="bg-bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-sm mb-1">Zamówienia (ostatnie 7 dni)</h3>
          <p className="text-text-muted text-xs mb-4">Łącznie: 270</p>
          <MiniChart data={weeklyOrders} color="rgba(59, 130, 246, 0.7)" />
          <div className="flex justify-between text-[10px] text-text-muted mt-2">
            <span>Pon</span><span>Wt</span><span>Śr</span><span>Czw</span><span>Pt</span><span>Sob</span><span>Ndz</span>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent orders */}
        <div className="bg-bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-sm">Ostatnie zamówienia</h3>
            <a href="/admin/zamowienia" className="text-xs text-accent flex items-center gap-1 hover:underline">
              Zobacz wszystkie <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="space-y-3">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium">{o.customer}</div>
                  <div className="text-text-muted text-xs">{o.id} · {o.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusColors[o.status]}`}>
                    {statusLabels[o.status]}
                  </span>
                  <span className="text-sm font-bold w-24 text-right">{o.total.toFixed(2)} zł</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-sm">Najpopularniejsze produkty</h3>
            <a href="/admin/produkty" className="text-xs text-accent flex items-center gap-1 hover:underline">
              Zarządzaj <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 py-2">
                <span className="text-text-muted text-xs font-bold w-4">{i + 1}</span>
                <span className="text-xl">{p.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.name}</div>
                  <div className="text-text-muted text-xs">{p.sold} sprzedanych</div>
                </div>
                <span className="text-sm font-bold text-accent">{p.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
