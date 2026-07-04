"use client";
import { useState } from "react";
import { Search, Eye, ChevronDown } from "lucide-react";

const allOrders = [
  { id: "BIC-2026-312", customer: "Anna Nowak", email: "anna@email.pl", date: "2026-03-31", status: "pending", total: 219.98, items: 2 },
  { id: "BIC-2026-311", customer: "Piotr Wiśniewski", email: "piotr@email.pl", date: "2026-03-31", status: "pending", total: 89.99, items: 1 },
  { id: "BIC-2026-310", customer: "Marta Zielińska", email: "marta@email.pl", date: "2026-03-31", status: "shipped", total: 349.97, items: 3 },
  { id: "BIC-2026-309", customer: "Tomasz Lewandowski", email: "tomek@email.pl", date: "2026-03-30", status: "shipped", total: 69.99, items: 1 },
  { id: "BIC-2026-308", customer: "Karolina Dąbrowska", email: "karolina@email.pl", date: "2026-03-30", status: "delivered", total: 159.99, items: 1 },
  { id: "BIC-2026-307", customer: "Michał Kowalczyk", email: "michal@email.pl", date: "2026-03-29", status: "delivered", total: 259.97, items: 3 },
  { id: "BIC-2026-306", customer: "Agnieszka Kamińska", email: "aga@email.pl", date: "2026-03-29", status: "delivered", total: 49.99, items: 1 },
  { id: "BIC-2026-305", customer: "Jakub Mazur", email: "jakub@email.pl", date: "2026-03-28", status: "cancelled", total: 179.99, items: 1 },
  { id: "BIC-2026-304", customer: "Ewa Krawczyk", email: "ewa@email.pl", date: "2026-03-28", status: "delivered", total: 129.99, items: 1 },
  { id: "BIC-2026-303", customer: "Robert Wójcik", email: "robert@email.pl", date: "2026-03-27", status: "delivered", total: 319.96, items: 4 },
];

const statuses = ["all", "pending", "shipped", "delivered", "cancelled"];
const statusLabels: Record<string, string> = { all: "Wszystkie", pending: "W realizacji", shipped: "Wysłane", delivered: "Dostarczone", cancelled: "Anulowane" };
const statusColors: Record<string, string> = {
  pending: "text-yellow-400 bg-yellow-400/10",
  shipped: "text-blue-400 bg-blue-400/10",
  delivered: "text-green-400 bg-green-400/10",
  cancelled: "text-red-400 bg-red-400/10",
};

export default function AdminZamowieniaPage() {
  const [orders, setOrders] = useState(allOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const changeStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
    setOpenDropdown(null);
  };

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl tracking-wider mb-1">ZAMÓWIENIA</h1>
        <p className="text-text-secondary text-sm">{orders.length} zamówień łącznie</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              statusFilter === s ? "bg-accent text-white" : "bg-bg-card border border-border text-text-secondary hover:border-accent/40"
            }`}
          >
            {statusLabels[s]} ({statusCounts[s as keyof typeof statusCounts]})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Szukaj po ID lub kliencie..."
          className="w-full bg-bg-card border border-border rounded-lg pl-11 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors" />
      </div>

      {/* Table */}
      <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Zamówienie</th>
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Klient</th>
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Data</th>
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Produkty</th>
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Kwota</th>
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-border/50 hover:bg-bg-card-hover transition-colors">
                  <td className="px-5 py-4 text-sm font-mono font-medium">{o.id}</td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium">{o.customer}</div>
                    <div className="text-text-muted text-xs">{o.email}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-text-secondary">{o.date}</td>
                  <td className="px-5 py-4 text-sm text-text-secondary">{o.items} szt.</td>
                  <td className="px-5 py-4 text-sm font-bold">{o.total.toFixed(2)} zł</td>
                  <td className="px-5 py-4 relative">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === o.id ? null : o.id)}
                      className={`flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full cursor-pointer transition-all hover:ring-2 hover:ring-accent/20 ${statusColors[o.status]}`}
                    >
                      {statusLabels[o.status]}
                      <ChevronDown size={12} />
                    </button>

                    {openDropdown === o.id && (
                      <div className="absolute right-0 top-full mt-1 bg-bg-dark border border-border rounded-lg shadow-xl z-10 min-w-[160px]">
                        {["pending", "shipped", "delivered", "cancelled"].map((s) => (
                          <button
                            key={s}
                            onClick={() => changeStatus(o.id, s)}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-bg-card-hover transition-colors first:rounded-t-lg last:rounded-b-lg ${
                              o.status === s ? "text-accent font-semibold" : "text-text-secondary"
                            }`}
                          >
                            {statusLabels[s]}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
