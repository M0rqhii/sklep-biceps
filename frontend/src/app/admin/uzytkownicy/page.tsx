"use client";
import { useState } from "react";
import { Search, MoreHorizontal, Shield, ShieldOff, Mail } from "lucide-react";

const mockUsers = [
  { id: 1, name: "Jan Kowalski", email: "jan@email.pl", joined: "2026-01-15", orders: 12, spent: 1549.87, role: "user", active: true },
  { id: 2, name: "Anna Nowak", email: "anna@email.pl", joined: "2026-02-03", orders: 8, spent: 879.92, role: "user", active: true },
  { id: 3, name: "Piotr Wiśniewski", email: "piotr@email.pl", joined: "2026-02-14", orders: 5, spent: 449.95, role: "user", active: true },
  { id: 4, name: "Marta Zielińska", email: "marta@email.pl", joined: "2025-11-20", orders: 21, spent: 3210.79, role: "user", active: true },
  { id: 5, name: "Tomasz Lewandowski", email: "tomek@email.pl", joined: "2026-03-01", orders: 3, spent: 209.97, role: "user", active: true },
  { id: 6, name: "Karolina Dąbrowska", email: "karolina@email.pl", joined: "2025-09-10", orders: 34, spent: 5120.66, role: "user", active: true },
  { id: 7, name: "Michał Kowalczyk", email: "michal@email.pl", joined: "2026-01-28", orders: 6, spent: 519.94, role: "user", active: false },
  { id: 8, name: "Admin BICEPS", email: "admin@biceps.pl", joined: "2025-01-01", orders: 0, spent: 0, role: "admin", active: true },
  { id: 9, name: "Agnieszka Kamińska", email: "aga@email.pl", joined: "2026-03-10", orders: 2, spent: 99.98, role: "user", active: true },
  { id: 10, name: "Jakub Mazur", email: "jakub@email.pl", joined: "2025-12-05", orders: 15, spent: 2340.85, role: "user", active: false },
];

export default function AdminUzytkownicyPage() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const toggleRole = (id: number) => {
    setUsers(users.map((u) => u.id === id ? { ...u, role: u.role === "admin" ? "user" : "admin" } : u));
    setOpenMenu(null);
  };

  const toggleActive = (id: number) => {
    setUsers(users.map((u) => u.id === id ? { ...u, active: !u.active } : u));
    setOpenMenu(null);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl tracking-wider mb-1">UŻYTKOWNICY</h1>
        <p className="text-text-secondary text-sm">{users.length} zarejestrowanych użytkowników</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Wszyscy", val: users.length, color: "bg-bg-card" },
          { label: "Aktywni", val: users.filter(u => u.active).length, color: "bg-green-400/5" },
          { label: "Nieaktywni", val: users.filter(u => !u.active).length, color: "bg-red-400/5" },
          { label: "Admini", val: users.filter(u => u.role === "admin").length, color: "bg-accent/5" },
        ].map((s) => (
          <div key={s.label} className={`${s.color} border border-border rounded-xl p-4 text-center`}>
            <div className="font-display text-2xl">{s.val}</div>
            <div className="text-text-muted text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Szukaj użytkownika..."
            className="w-full bg-bg-card border border-border rounded-lg pl-11 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors" />
        </div>
        <div className="flex gap-2">
          {["all", "user", "admin"].map((r) => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                roleFilter === r ? "bg-accent text-white" : "bg-bg-card border border-border text-text-secondary hover:border-accent/40"
              }`}>
              {r === "all" ? "Wszyscy" : r === "admin" ? "Admini" : "Użytkownicy"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Użytkownik</th>
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Dołączył</th>
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Zamówienia</th>
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Wydano</th>
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Rola</th>
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Status</th>
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold w-16"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-border/50 hover:bg-bg-card-hover transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                        u.role === "admin" ? "bg-accent/20 text-accent" : "bg-bg-dark text-text-secondary"
                      }`}>
                        {u.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{u.name}</div>
                        <div className="text-text-muted text-xs">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-text-secondary">{u.joined}</td>
                  <td className="px-5 py-4 text-sm text-text-secondary">{u.orders}</td>
                  <td className="px-5 py-4 text-sm font-bold">{u.spent.toFixed(2)} zł</td>
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      u.role === "admin" ? "text-accent bg-accent/10" : "text-text-secondary bg-bg-dark"
                    }`}>
                      {u.role === "admin" ? "Admin" : "Klient"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`w-2 h-2 rounded-full inline-block mr-2 ${u.active ? "bg-green-400" : "bg-red-400"}`} />
                    <span className="text-xs text-text-secondary">{u.active ? "Aktywny" : "Nieaktywny"}</span>
                  </td>
                  <td className="px-5 py-4 relative">
                    <button onClick={() => setOpenMenu(openMenu === u.id ? null : u.id)}
                      className="w-8 h-8 rounded-lg bg-bg-dark flex items-center justify-center text-text-secondary hover:text-text-primary transition-all">
                      <MoreHorizontal size={16} />
                    </button>

                    {openMenu === u.id && (
                      <div className="absolute right-0 top-full mt-1 bg-bg-dark border border-border rounded-lg shadow-xl z-10 min-w-[180px]">
                        <button onClick={() => toggleRole(u.id)}
                          className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-text-secondary hover:bg-bg-card-hover transition-colors rounded-t-lg">
                          {u.role === "admin" ? <ShieldOff size={14} /> : <Shield size={14} />}
                          {u.role === "admin" ? "Usuń admina" : "Nadaj admina"}
                        </button>
                        <button onClick={() => toggleActive(u.id)}
                          className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-text-secondary hover:bg-bg-card-hover transition-colors">
                          {u.active ? "Dezaktywuj" : "Aktywuj"}
                        </button>
                        <button className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-text-secondary hover:bg-bg-card-hover transition-colors rounded-b-lg">
                          <Mail size={14} /> Wyślij e-mail
                        </button>
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
