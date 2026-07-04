"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group bg-bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 hover:bg-bg-card-hover transition-all duration-300">
      {/* Image area */}
      <Link href={`/produkt/${product.id}`} className="block relative">
        <div className="h-56 bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
          {product.emoji}
        </div>
        {product.tag && (
          <span className={`absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
            product.tag === "Nowość" ? "bg-green-600 text-white" : "bg-accent text-white"
          }`}>
            {product.tag}
          </span>
        )}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-text-secondary hover:text-accent hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
          onClick={(e) => { e.preventDefault(); }}
        >
          <Heart size={16} />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4">
        <div className="text-text-muted text-xs uppercase tracking-wider mb-1">{product.brand}</div>
        <Link href={`/produkt/${product.id}`}>
          <h3 className="text-sm font-semibold text-text-primary mb-2 hover:text-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex gap-0.5 mb-3 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < product.rating ? "text-amber-400" : "text-text-muted"}>★</span>
          ))}
          <span className="text-text-muted text-xs ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-text-primary">{product.price.toFixed(2)} zł</span>
            {product.oldPrice && (
              <span className="text-sm text-text-muted line-through">{product.oldPrice.toFixed(2)} zł</span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center text-white text-lg font-bold hover:scale-110 hover:shadow-[0_4px_16px_var(--color-accent-glow)] transition-all"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
