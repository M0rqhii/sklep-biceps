"use client";
import Link from "next/link";
import { Truck, Zap, RotateCcw, ShieldCheck, ArrowRight } from "lucide-react";
import { products, categories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const bestsellers = products.slice(0, 4);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-bg-dark">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(230,57,70,0.15)_0%,transparent_60%),radial-gradient(ellipse_at_20%_80%,rgba(230,57,70,0.08)_0%,transparent_50%)]" />
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
          <div className="animate-fade-up">
            <h1 className="font-display text-[clamp(56px,8vw,96px)] leading-[0.95] tracking-wider mb-6">
              PRZEKROCZ<br />
              <span className="text-accent">SWOJE LIMITY</span>
            </h1>
            <p className="text-lg text-text-secondary font-light max-w-[440px] mb-9">
              Najwyższej jakości suplementy i odżywki dla sportowców. Osiągnij swój potencjał z markami, którym ufają profesjonaliści.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/produkty"
                className="bg-accent text-white px-9 py-3.5 rounded-lg font-semibold text-sm uppercase tracking-wider hover:translate-y-[-2px] hover:shadow-[0_8px_32px_var(--color-accent-glow)] transition-all inline-block"
              >
                Zobacz Bestsellery
              </Link>
              <Link
                href="/produkty?tag=Nowość"
                className="border border-border text-text-primary px-9 py-3.5 rounded-lg font-semibold text-sm uppercase tracking-wider hover:border-accent hover:bg-accent/5 transition-all inline-block"
              >
                Nowa Kolekcja →
              </Link>
            </div>
          </div>

          {/* Hero product card */}
          <div className="hidden lg:flex justify-center animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="w-[340px] h-[440px] bg-bg-card border border-border rounded-2xl flex flex-col items-center justify-center gap-4 rotate-2 hover:rotate-0 hover:scale-[1.02] transition-all duration-400 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <span className="absolute top-4 left-4 bg-accent text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Bestseller
              </span>
              <div className="w-40 h-56 bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] rounded-xl flex items-center justify-center text-6xl">
                🏋️
              </div>
              <h3 className="font-display text-xl tracking-wider">WHEY PROTEIN GOLD</h3>
              <div className="text-accent font-bold text-lg">129,99 zł</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Truck size={24} />, title: "Darmowa dostawa", desc: "Od 150 zł zamówienia" },
            { icon: <Zap size={24} />, title: "Wysyłka 24h", desc: "Zamów do 14:00" },
            { icon: <RotateCcw size={24} />, title: "30 dni na zwrot", desc: "Bez pytań" },
            { icon: <ShieldCheck size={24} />, title: "Oryginalne produkty", desc: "100% autentyczność" },
          ].map((f) => (
            <div key={f.title} className="bg-bg-card border border-border rounded-xl p-6 text-center hover:border-accent/30 transition-all">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/10 text-accent flex items-center justify-center">{f.icon}</div>
              <h4 className="font-semibold text-sm mb-1">{f.title}</h4>
              <p className="text-text-secondary text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl tracking-wider">KATEGORIE <span className="text-accent">PRODUKTÓW</span></h2>
          <Link href="/produkty" className="text-sm text-text-secondary hover:text-accent transition-colors flex items-center gap-1">
            Wszystkie kategorie <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              href={`/produkty?cat=${cat.id}`}
              className="group bg-bg-card border border-border rounded-xl p-8 text-center hover:border-accent/40 hover:bg-bg-card-hover transition-all"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{cat.emoji}</div>
              <h3 className="font-display text-xl tracking-wider mb-1">{cat.name}</h3>
              <p className="text-text-secondary text-sm">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ BESTSELLERS ═══ */}
      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl tracking-wider">NAJLEPIEJ <span className="text-accent">SPRZEDAJĄCE SIĘ</span></h2>
          <Link href="/produkty" className="text-sm text-text-secondary hover:text-accent transition-colors flex items-center gap-1">
            Wszystkie produkty <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ═══ BANNER ═══ */}
      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-bg-card to-[#1a1a1a] border border-border rounded-2xl p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl tracking-wider leading-tight mb-4">
              DOŁĄCZ DO<br />KLUBU <span className="text-accent">BICEPS</span>
            </h2>
            <p className="text-text-secondary max-w-md mb-6">
              Zarejestruj się i odbieraj punkty za każdy zakup. Wymieniaj je na zniżki, darmowe produkty i ekskluzywne oferty.
            </p>
            <Link
              href="/rejestracja"
              className="bg-accent text-white px-8 py-3.5 rounded-lg font-semibold text-sm uppercase tracking-wider hover:translate-y-[-2px] hover:shadow-[0_8px_32px_var(--color-accent-glow)] transition-all inline-block"
            >
              Dołącz za darmo
            </Link>
          </div>
          <div className="flex gap-8 justify-center lg:justify-end">
            {[
              { val: "15K+", label: "Członków" },
              { val: "500+", label: "Produktów" },
              { val: "4.9★", label: "Ocena klientów" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <h4 className="font-display text-3xl tracking-wider text-accent">{s.val}</h4>
                <p className="text-text-secondary text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
