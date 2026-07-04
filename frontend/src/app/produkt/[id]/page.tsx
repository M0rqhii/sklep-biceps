"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Heart, ShoppingCart, Minus, Plus, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { products } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

export default function ProduktPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState(0);

  if (!product) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="font-display text-3xl tracking-wider mb-4">Produkt nie znaleziony</h1>
        <Link href="/produkty" className="text-accent hover:underline">← Wróć do produktów</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <Link href="/produkty" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-8 text-sm">
        <ArrowLeft size={16} /> Wróć do produktów
      </Link>

      {/* Product detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="bg-bg-card border border-border rounded-2xl h-[500px] flex items-center justify-center text-[120px] relative">
          {product.tag && (
            <span className={`absolute top-6 left-6 text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider ${
              product.tag === "Nowość" ? "bg-green-600 text-white" : "bg-accent text-white"
            }`}>
              {product.tag}
            </span>
          )}
          {product.emoji}
        </div>

        {/* Info */}
        <div>
          <div className="text-text-muted text-sm uppercase tracking-wider mb-2">{product.brand}</div>
          <h1 className="font-display text-4xl tracking-wider mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-0.5 text-lg">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < product.rating ? "text-amber-400" : "text-text-muted"}>★</span>
              ))}
            </div>
            <span className="text-text-secondary text-sm">({product.reviews} opinii)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">{product.price.toFixed(2)} zł</span>
            {product.oldPrice && (
              <span className="text-xl text-text-muted line-through">{product.oldPrice.toFixed(2)} zł</span>
            )}
            {product.oldPrice && (
              <span className="bg-accent/20 text-accent text-sm font-semibold px-2 py-0.5 rounded">
                Oszczędzasz {(product.oldPrice - product.price).toFixed(2)} zł
              </span>
            )}
          </div>

          <p className="text-text-secondary leading-relaxed mb-6">{product.description}</p>

          {product.weight && (
            <div className="text-sm text-text-secondary mb-4">
              <span className="text-text-muted">Waga/Ilość:</span> {product.weight}
            </div>
          )}

          {/* Flavors */}
          {product.flavors && (
            <div className="mb-6">
              <label className="text-sm text-text-muted block mb-2">Smak:</label>
              <div className="flex flex-wrap gap-2">
                {product.flavors.map((f, i) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFlavor(i)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFlavor === i
                        ? "bg-accent text-white"
                        : "bg-bg-card border border-border text-text-secondary hover:border-accent/40"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to cart */}
          <div className="flex gap-4 mb-8">
            <div className="flex items-center bg-bg-card border border-border rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-11 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-11 h-11 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-accent text-white rounded-lg font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:translate-y-[-2px] hover:shadow-[0_8px_32px_var(--color-accent-glow)] transition-all"
            >
              <ShoppingCart size={18} /> Dodaj do koszyka
            </button>
            <button className="w-11 h-11 border border-border rounded-lg flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all">
              <Heart size={18} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Truck size={18} />, text: "Darmowa dostawa od 150 zł" },
              { icon: <RotateCcw size={18} />, text: "30 dni na zwrot" },
              { icon: <ShieldCheck size={18} />, text: "Oryginalny produkt" },
            ].map((b) => (
              <div key={b.text} className="bg-bg-card border border-border rounded-lg p-3 flex items-center gap-2 text-xs text-text-secondary">
                <span className="text-accent">{b.icon}</span> {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <h2 className="font-display text-2xl tracking-wider mb-6">PODOBNE <span className="text-accent">PRODUKTY</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
