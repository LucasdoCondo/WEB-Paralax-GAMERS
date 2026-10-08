import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/types';
import { discountPercent, formatBRL } from '@/data/products';
import { useStore } from '@/store/StoreContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const fav = isFavorite(product.id);
  const off = discountPercent(product);

  return (
    <motion.article
      layout initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#12121a] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00f0ff]/50 hover:shadow-xl hover:shadow-[#00f0ff]/15"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={product.image} alt={product.name} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          {off > 0 && <span className="rounded-full bg-red-500/90 px-2.5 py-1 text-xs font-bold text-white">-{off}%</span>}
          {product.isNew && <span className="rounded-full bg-[#8b5cf6]/90 px-2.5 py-1 text-xs font-bold text-white">NOVO</span>}
        </div>
        <button onClick={() => toggleFavorite(product.id)} aria-label="Favoritar"
          className={`absolute right-3 top-3 rounded-full p-2 backdrop-blur transition ${fav ? 'bg-pink-500 text-white' : 'bg-black/40 text-white hover:bg-pink-500'}`}>
          <Heart className={`h-4 w-4 ${fav ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#00f0ff]">{product.categoryLabel}</p>
        <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-slate-100">{product.name}</h3>
        <ul className="mt-2 space-y-1">
          {product.specs.slice(0, 2).map((s) => (
            <li key={s.label} className="truncate text-xs text-slate-400">• {s.label}: {s.value}</li>
          ))}
        </ul>
        <div className="mt-3 flex items-center gap-1 text-xs text-slate-400">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-slate-200">{product.rating.toFixed(1)}</span>({product.reviewsCount})
        </div>
        <div className="mt-2">
          {product.oldPrice && <p className="text-xs text-slate-500 line-through">{formatBRL(product.oldPrice)}</p>}
          <p className="text-xl font-bold text-slate-100">{formatBRL(product.price)}</p>
          <p className="text-xs text-slate-400">12x de {formatBRL(product.price / 12)} sem juros</p>
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={() => addToCart(product)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#8b5cf6] px-3 py-2.5 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-[#00f0ff]/30 active:scale-95">
            <ShoppingCart className="h-4 w-4" /> Adicionar
          </button>
        </div>
      </div>
    </motion.article>
  );
}
