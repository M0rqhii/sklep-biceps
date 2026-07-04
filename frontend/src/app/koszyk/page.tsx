"use client";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function KoszykPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const deliveryFree = totalPrice >= 150;
  const deliveryCost = deliveryFree ? 0 : 14.99;
  const finalTotal = totalPrice + deliveryCost;

  if (items.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-20 text-center">
        <div className="text-7xl mb-6">🛒</div>
        <h1 className="font-display text-4xl tracking-wider mb-4">Twój koszyk jest pusty</h1>
        <p className="text-text-secondary mb-8">Dodaj produkty, żeby zacząć zakupy</p>
        <Link
          href="/produkty"
          className="bg-accent text-white px-8 py-3.5 rounded-lg font-semibold text-sm uppercase tracking-wider hover:translate-y-[-2px] hover:shadow-[0_8px_32px_var(--color-accent-glow)] transition-all inline-block"
        >
          Przeglądaj produkty
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <Link href="/produkty" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-8 text-sm">
        <ArrowLeft size={16} /> Kontynuuj zakupy
      </Link>

      <h1 className="font-display text-4xl tracking-wider mb-8">TWÓJ <span className="text-accent">KOSZYK</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-bg-card border border-border rounded-xl p-5 flex gap-5 items-center">
              {/* Image */}
              <Link href={`/produkt/${product.id}`} className="w-20 h-20 bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] rounded-lg flex items-center justify-center text-3xl shrink-0">
                {product.emoji}
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-text-muted text-xs uppercase tracking-wider">{product.brand}</div>
                <Link href={`/produkt/${product.id}`} className="text-sm font-semibold hover:text-accent transition-colors block truncate">
                  {product.name}
                </Link>
                <div className="text-accent font-bold mt-1">{product.price.toFixed(2)} zł</div>
              </div>

              {/* Quantity */}
              <div className="flex items-center bg-bg-dark border border-border rounded-lg">
                <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
                  <Plus size={14} />
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right w-24 shrink-0">
                <div className="font-bold">{(product.price * quantity).toFixed(2)} zł</div>
              </div>

              {/* Remove */}
              <button onClick={() => removeItem(product.id)} className="text-text-muted hover:text-accent transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <button onClick={clearCart} className="text-sm text-text-muted hover:text-accent transition-colors">
            Wyczyść koszyk
          </button>
        </div>

        {/* Summary */}
        <div className="bg-bg-card border border-border rounded-xl p-6 h-fit sticky top-[90px]">
          <h3 className="font-display text-xl tracking-wider mb-6">PODSUMOWANIE</h3>

          <div className="space-y-3 mb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Produkty:</span>
              <span>{totalPrice.toFixed(2)} zł</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Dostawa:</span>
              <span className={deliveryFree ? "text-green-500 font-semibold" : ""}>
                {deliveryFree ? "DARMOWA" : `${deliveryCost.toFixed(2)} zł`}
              </span>
            </div>
            {!deliveryFree && (
              <p className="text-xs text-text-muted">
                Do darmowej dostawy brakuje <span className="text-accent font-semibold">{(150 - totalPrice).toFixed(2)} zł</span>
              </p>
            )}
            <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
              <span>Razem:</span>
              <span className="text-accent">{finalTotal.toFixed(2)} zł</span>
            </div>
          </div>

          {/* Promo code */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Kod rabatowy"
              className="flex-1 bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
            <button className="bg-bg-dark border border-border rounded-lg px-4 py-2.5 text-sm font-medium text-text-secondary hover:border-accent hover:text-accent transition-all">
              Zastosuj
            </button>
          </div>

          <button className="w-full bg-accent text-white py-3.5 rounded-lg font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:translate-y-[-2px] hover:shadow-[0_8px_32px_var(--color-accent-glow)] transition-all">
            <ShoppingBag size={18} /> Przejdź do kasy
          </button>

          <div className="mt-4 text-center text-xs text-text-muted">
            🔒 Bezpieczna płatność • 💳 Visa, Mastercard, BLIK
          </div>
        </div>
      </div>
    </div>
  );
}
