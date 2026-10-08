import { useEffect, useState } from 'react';
import { Gamepad2, Heart, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

export default function Navbar() {
  const { cartCount, favorites, search, setSearch, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#inicio', label: 'Início' },
    { href: '#produtos', label: 'Produtos' },
    { href: '#beneficios', label: 'Benefícios' },
    { href: '#contato', label: 'Contato' },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'bg-[#0a0a0f]/85 backdrop-blur-xl border-b border-white/10' : 'bg-gradient-to-b from-black/60 to-transparent'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-3">
          <a href="#inicio" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#8b5cf6]">
              <Gamepad2 className="h-5 w-5 text-white" />
            </span>
            <span className="font-heading text-base sm:text-lg font-bold text-slate-100">
              WEB <span className="text-[#00f0ff]">Parallax</span> <span className="text-[#8b5cf6]">GAMERS</span>
            </span>
          </a>
          <nav className="hidden lg:flex gap-7">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-slate-300 hover:text-[#00f0ff] transition-colors">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <label className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar RTX, Ryzen..."
                className="w-48 lg:w-60 rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-[#00f0ff]/60" />
            </label>
            <button aria-label="Favoritos" className="relative rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 hover:text-pink-400">
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[11px] font-bold text-white">{favorites.length}</span>}
            </button>
            <button onClick={() => setCartOpen(true)} aria-label="Carrinho" className="relative rounded-xl border border-[#00f0ff]/30 bg-[#00f0ff]/10 p-2 text-[#00f0ff] hover:bg-[#00f0ff]/20">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#00f0ff] px-1 text-[11px] font-bold text-black">{cartCount}</span>}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 lg:hidden">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <nav className="border-t border-white/10 bg-[#0a0a0f]/95 px-4 py-3 lg:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-[#00f0ff]">{l.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

