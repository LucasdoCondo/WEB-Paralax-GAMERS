import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cpu, Heart, Minus, Plus, ShieldCheck, ShoppingCart, Star, Truck, X, Zap } from 'lucide-react';
import { discountPercent, formatBRL, products } from '@/data/products';
import { useStore } from '@/store/StoreContext';

const GALLERY_POOL = [
  'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587202372583-49330a15584d?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=900&q=80&auto=format&fit=crop',
];

export default function ProductModal() {
  const { selected, closeProduct, addToCart, toggleFavorite, isFavorite } = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  const gallery = useMemo(() => {
    if (!selected) return [];
    const others = GALLERY_POOL.filter((g) => !selected.image.includes(g.split('photo-')[1]?.slice(0, 4) ?? ''));
    return [selected.image, ...others.slice(0, 3)];
  }, [selected]);

  const related = useMemo(() => {
    if (!selected) return [];
    return products.filter((p) => p.category === selected.category && p.id !== selected.id).slice(0, 3);
  }, [selected]);

  useEffect(() => {
    setActiveImg(0);
    setQty(1);
  }, [selected?.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeProduct(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeProduct]);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const fav = selected ? isFavorite(selected.id) : false;
  const off = selected ? discountPercent(selected) : 0;
  const pixPrice = selected ? selected.price * 0.9 : 0;

  return (
    <AnimatePresence>
      {selected && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
          <div onClick={closeProduct} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <motion.div role="dialog" aria-modal="true" aria-label={selected.name}
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-[#0d0d15] sm:rounded-3xl">
            <button onClick={closeProduct} aria-label="Fechar detalhes"
              className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/50 p-2 text-slate-300 hover:border-[#00f0ff]/60 hover:text-[#00f0ff]">
              <X className="h-5 w-5" />
            </button>
            <div className="grid flex-1 overflow-y-auto md:grid-cols-2">
              <div className="bg-black/30 p-4 sm:p-6">
                <div className="relative overflow-hidden rounded-2xl border border-white/10">
                  <img src={gallery[activeImg]} alt={selected.name} className="aspect-square w-full object-cover" />
                  <div className="absolute left-3 top-3 flex gap-2">
                    {off > 0 && <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">-{off}% OFF</span>}
                    {selected.isNew && <span className="rounded-full bg-[#8b5cf6] px-3 py-1 text-xs font-bold text-white">NOVO</span>}
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {gallery.map((g, i) => (
                    <button key={g + i} onClick={() => setActiveImg(i)}
                      className={`overflow-hidden rounded-xl border-2 transition ${i === activeImg ? 'border-[#00f0ff]' : 'border-white/10 opacity-70 hover:opacity-100'}`}>
                      <img src={g} alt={`Foto ${i + 1}`} className="aspect-square w-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <p className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-slate-300">
                    <Truck className="h-4 w-4 shrink-0 text-emerald-400" /> Frete grátis +R$ 500
                  </p>
                  <p className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-slate-300">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#00f0ff]" /> 2 anos de garantia
                  </p>
                </div>
              </div>
              <div className="flex flex-col p-4 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#00f0ff]">{selected.categoryLabel} • {selected.brand}</p>
                <h2 className="mt-1.5 font-heading text-2xl font-bold text-white">{selected.name}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <strong className="text-slate-100">{selected.rating.toFixed(1)}</strong>
                  <span>{selected.reviewsCount} avaliações</span>
                  <span className={selected.stock < 15 ? 'font-semibold text-amber-400' : 'text-emerald-400'}>
                    {selected.stock < 15 ? `Restam ${selected.stock}` : 'Em estoque'}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{selected.description}</p>
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  {selected.oldPrice && <p className="text-sm text-slate-500 line-through">{formatBRL(selected.oldPrice)}</p>}
                  <p className="text-3xl font-bold text-white">{formatBRL(selected.price * qty)}</p>
                  <p className="text-sm text-emerald-400">{formatBRL(pixPrice * qty)} no Pix (-10%)</p>
                  <p className="mt-1 text-xs text-slate-400">em até {selected.installments}x de {formatBRL((selected.price * qty) / selected.installments)} sem juros</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 px-2 py-1.5">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Diminuir" className="p-1 text-slate-300 hover:text-[#00f0ff]"><Minus className="h-4 w-4" /></button>
                      <span className="w-6 text-center font-bold text-white">{qty}</span>
                      <button onClick={() => setQty(Math.min(selected.stock, qty + 1))} aria-label="Aumentar" className="p-1 text-slate-300 hover:text-[#00f0ff]"><Plus className="h-4 w-4" /></button>
                    </div>
                    <button onClick={() => toggleFavorite(selected.id)} aria-label="Favoritar"
                      className={`rounded-xl border p-2.5 ${fav ? 'border-pink-500/60 bg-pink-500/15 text-pink-400' : 'border-white/10 text-slate-300'}`}>
                      <Heart className={`h-5 w-5 ${fav ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="mt-3 grid gap-2">
                    <button onClick={() => { addToCart(selected, qty); closeProduct(); }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#8b5cf6] py-3.5 font-bold text-white hover:shadow-xl hover:shadow-[#00f0ff]/25">
                      <ShoppingCart className="h-5 w-5" /> Adicionar ao Carrinho
                    </button>
                    <button onClick={() => addToCart(selected, qty)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#00f0ff]/40 bg-[#00f0ff]/10 py-3 font-bold text-[#00f0ff] hover:bg-[#00f0ff]/20">
                      <Zap className="h-5 w-5" /> Comprar Agora
                    </button>
                  </div>
                </div>
                <h3 className="mt-4 flex items-center gap-2 font-semibold text-slate-100"><Cpu className="h-4 w-4 text-[#00f0ff]" /> Especificações técnicas</h3>
                <dl className="mt-2 overflow-hidden rounded-2xl border border-white/10">
                  {selected.specs.map((s, i) => (
                    <div key={s.label} className={`flex justify-between gap-4 px-4 py-2.5 text-sm ${i % 2 === 0 ? 'bg-white/[0.04]' : ''}`}>
                      <dt className="text-slate-400">{s.label}</dt>
                      <dd className="text-right font-semibold text-slate-100">{s.value}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between bg-white/[0.04] px-4 py-2.5 text-sm">
                    <dt className="text-slate-400">Marca</dt><dd className="font-semibold text-slate-100">{selected.brand}</dd>
                  </div>
                  <div className="flex justify-between px-4 py-2.5 text-sm">
                    <dt className="text-slate-400">SKU</dt><dd className="font-mono text-xs text-slate-300">{selected.slug}</dd>
                  </div>
                </dl>
                {related.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-slate-200">Combina com</h3>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {related.map((r) => (
                        <div key={r.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                          <img src={r.image} alt={r.name} className="aspect-square w-full object-cover" />
                          <p className="truncate px-2 pt-1.5 text-[11px] text-slate-200">{r.name}</p>
                          <p className="px-2 pb-2 text-[11px] font-bold text-[#00f0ff]">{formatBRL(r.price)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
