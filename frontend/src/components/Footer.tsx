import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-dark">
      {/* Newsletter */}
      <div className="text-center py-16 px-6 border-b border-border">
        <h2 className="font-display text-4xl tracking-wider mb-3">
          BĄDŹ NA <span className="text-accent">BIEŻĄCO</span>
        </h2>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Zapisz się na newsletter — kody rabatowe, nowości i porady treningowe
        </p>
        <div className="flex max-w-md mx-auto gap-3">
          <input
            type="email"
            placeholder="Twój adres e-mail..."
            className="flex-1 bg-bg-card border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
          />
          <button className="bg-accent text-white px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider hover:translate-y-[-2px] hover:shadow-[0_8px_32px_var(--color-accent-glow)] transition-all">
            Zapisz się
          </button>
        </div>
      </div>

      {/* Footer grid */}
      <div className="max-w-[1280px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-3xl tracking-[4px] mb-4">
            <span className="text-accent">💪</span> BICEP<span className="text-accent">S</span>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">
            Twój sklep z suplementami i odżywkami dla sportowców. Oryginalne produkty, szybka wysyłka i najlepsze ceny.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-display text-lg tracking-wider mb-2">SKLEP</h4>
          {["Suplementy", "Odżywki", "Witaminy", "Akcesoria", "Wyprzedaż"].map((l) => (
            <Link key={l} href="/produkty" className="text-text-secondary text-sm hover:text-text-primary transition-colors">{l}</Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-display text-lg tracking-wider mb-2">INFORMACJE</h4>
          {["O nas", "Dostawa", "Zwroty", "Regulamin", "Polityka prywatności"].map((l) => (
            <Link key={l} href="#" className="text-text-secondary text-sm hover:text-text-primary transition-colors">{l}</Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-display text-lg tracking-wider mb-2">KONTAKT</h4>
          <a href="mailto:kontakt@biceps.pl" className="text-text-secondary text-sm hover:text-text-primary transition-colors">kontakt@biceps.pl</a>
          <a href="tel:+48123456789" className="text-text-secondary text-sm hover:text-text-primary transition-colors">+48 123 456 789</a>
          <a href="#" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Instagram</a>
          <a href="#" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Facebook</a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-6 px-6 flex flex-col sm:flex-row items-center justify-between max-w-[1280px] mx-auto gap-4">
        <span className="text-text-muted text-sm">© 2026 BICEPS. Wszystkie prawa zastrzeżone.</span>
        <div className="text-2xl flex gap-3">💳 🏦 📱</div>
      </div>
    </footer>
  );
}
