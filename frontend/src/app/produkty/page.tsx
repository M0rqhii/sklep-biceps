"use client";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Grid3X3, LayoutList } from "lucide-react";
import { products, categories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function ProduktyPage() {
  return (
    <Suspense fallback={<div className="max-w-[1280px] mx-auto px-6 py-10 text-text-secondary">Ładowanie...</div>}>
      <ProduktyContent />
    </Suspense>
  );
}

function ProduktyContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") || "";
  const initialTag = searchParams.get("tag") || "";

  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCat) {
      result = result.filter((p) => p.category === selectedCat);
    }
    if (initialTag) {
      result = result.filter((p) => p.tag === initialTag);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [selectedCat, sortBy, search, initialTag]);

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl tracking-wider mb-2">
          {initialTag ? initialTag.toUpperCase() : selectedCat ? categories.find(c => c.id === selectedCat)?.name || "PRODUKTY" : "WSZYSTKIE"}{" "}
          <span className="text-accent">PRODUKTY</span>
        </h1>
        <p className="text-text-secondary">{filtered.length} produktów</p>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Szukaj produktów..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-bg-card border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
        />

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCat("")}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              !selectedCat
                ? "bg-accent text-white"
                : "bg-bg-card border border-border text-text-secondary hover:border-accent/40"
            }`}
          >
            Wszystkie
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id === selectedCat ? "" : cat.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                selectedCat === cat.id
                  ? "bg-accent text-white"
                  : "bg-bg-card border border-border text-text-secondary hover:border-accent/40"
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-bg-card border border-border rounded-lg px-4 py-3 text-text-secondary text-sm focus:border-accent focus:outline-none transition-colors cursor-pointer"
        >
          <option value="default">Sortuj: Domyślnie</option>
          <option value="price-asc">Cena: rosnąco</option>
          <option value="price-desc">Cena: malejąco</option>
          <option value="rating">Najwyżej oceniane</option>
          <option value="name">Nazwa A-Z</option>
        </select>
      </div>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-display text-2xl tracking-wider mb-2">Nie znaleziono produktów</h3>
          <p className="text-text-secondary">Spróbuj zmienić filtry lub wyszukaj coś innego</p>
        </div>
      )}
    </div>
  );
}
