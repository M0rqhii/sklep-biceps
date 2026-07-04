"use client";
import { useState } from "react";
import { Plus, Search, Edit2, Trash2, X, Save } from "lucide-react";
import { products as initialProducts, categories, Product } from "@/lib/data";

export default function AdminProduktyPage() {
  const [items, setItems] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const emptyProduct: Product = {
    id: "", name: "", brand: "", price: 0, category: "", rating: 5, reviews: 0,
    description: "", emoji: "📦",
  };

  const [form, setForm] = useState<Product>(emptyProduct);

  const filtered = items.filter((p) => {
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
  });

  const openAdd = () => {
    setForm({ ...emptyProduct, id: `product-${Date.now()}` });
    setAdding(true);
    setEditing(null);
  };

  const openEdit = (product: Product) => {
    setForm({ ...product });
    setEditing(product);
    setAdding(false);
  };

  const handleSave = () => {
    if (adding) {
      setItems([form, ...items]);
    } else if (editing) {
      setItems(items.map((p) => (p.id === editing.id ? form : p)));
    }
    setAdding(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  const closeForm = () => {
    setAdding(false);
    setEditing(null);
  };

  const showForm = adding || editing;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl tracking-wider mb-1">PRODUKTY</h1>
          <p className="text-text-secondary text-sm">{items.length} produktów w bazie</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:translate-y-[-1px] hover:shadow-[0_4px_16px_var(--color-accent-glow)] transition-all"
        >
          <Plus size={16} /> Dodaj produkt
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Szukaj produktów..."
          className="w-full bg-bg-card border border-border rounded-lg pl-11 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
        />
      </div>

      {/* ═══ FORM MODAL ═══ */}
      {showForm && (
        <div className="bg-bg-card border border-accent/30 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-xl tracking-wider">
              {adding ? "NOWY PRODUKT" : "EDYCJA PRODUKTU"}
            </h3>
            <button onClick={closeForm} className="text-text-muted hover:text-text-primary transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-text-secondary block mb-1.5">Nazwa</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-1.5">Marka</label>
              <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-1.5">Kategoria</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none transition-colors cursor-pointer">
                <option value="">Wybierz...</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-1.5">Cena (zł)</label>
              <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-1.5">Stara cena (zł, opcjonalna)</label>
              <input type="number" step="0.01" value={form.oldPrice || ""} onChange={(e) => setForm({ ...form, oldPrice: parseFloat(e.target.value) || undefined })}
                className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-1.5">Emoji</label>
              <input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none transition-colors" />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="text-xs text-text-secondary block mb-1.5">Opis</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none transition-colors resize-none" />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button onClick={closeForm} className="px-5 py-2.5 border border-border rounded-lg text-sm text-text-secondary hover:border-accent/40 transition-all">
              Anuluj
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:translate-y-[-1px] transition-all">
              <Save size={14} /> {adding ? "Dodaj" : "Zapisz"}
            </button>
          </div>
        </div>
      )}

      {/* ═══ TABLE ═══ */}
      <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Produkt</th>
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Kategoria</th>
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Cena</th>
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold">Ocena</th>
                <th className="px-5 py-4 text-xs text-text-muted uppercase tracking-wider font-semibold w-24">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-bg-card-hover transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{p.emoji}</span>
                      <div>
                        <div className="text-sm font-medium">{p.name}</div>
                        <div className="text-text-muted text-xs">{p.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs bg-bg-dark px-2.5 py-1 rounded-full text-text-secondary">
                      {categories.find((c) => c.id === p.category)?.name || p.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-bold">{p.price.toFixed(2)} zł</div>
                    {p.oldPrice && <div className="text-xs text-text-muted line-through">{p.oldPrice.toFixed(2)} zł</div>}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-amber-400 text-sm">{"★".repeat(p.rating)}{"☆".repeat(5 - p.rating)}</span>
                    <span className="text-text-muted text-xs ml-1">({p.reviews})</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg bg-bg-dark flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all">
                        <Edit2 size={14} />
                      </button>
                      {deleteConfirm === p.id ? (
                        <button onClick={() => handleDelete(p.id)} className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-all">
                          <Trash2 size={14} />
                        </button>
                      ) : (
                        <button onClick={() => setDeleteConfirm(p.id)} className="w-8 h-8 rounded-lg bg-bg-dark flex items-center justify-center text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-all">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
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
