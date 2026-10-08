import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpDown, PackageSearch } from 'lucide-react';
import { CATEGORIES, products } from '@/data/products';
import type { SortOption } from '@/types';
import { useStore } from '@/store/StoreContext';
import ProductCard from './ProductCard';

const SORTS: { id: SortOption; label: string }[] = [
  { id: 'relevance', label: 'Relevância' },
  { id: 'price-asc', label: 'Menor preço' },
  { id: 'price-desc', label: 'Maior preço' },
  { id: 'rating', label: 'Avaliação' },
  { id: 'discount', label: 'Desconto' },
];

export default function ProductGrid() {
  const { search, category, setCategory, sort, setSort } = useStore();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchCat = category === 'todos' || p.category === category;
      const matchQ = !q || `${p.name} ${p.brand} ${p.categoryLabel}`.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
    switch (sort) {
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'rating': list = [...list].sort((a, b) => b.rating - a.rating); break;
      case 'discount':
        list = [...list].sort((a, b) => (b.oldPrice ?? b.price) - b.price - ((a.oldPrice ?? a.price) - a.price));
        break;
      default: list = [...list].sort((a, b) => Number(b.isFeatured ?? false) - Number(a.isFeatured ?? false));
    }
    return list;
  }, [search, category, sort]);

  return (
    <section id="produtos" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#00f0ff]">Loja</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-slate-100 sm:text-5xl">
            Vitrine <span className="text-[#8b5cf6]">Gamer</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">Filtros por categoria, busca instantânea e ordenação.</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setCategory(c.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${category === c.id
                ? 'border-[#00f0ff]/60 bg-[#00f0ff]/15 text-[#00f0ff]'
                : 'border-white/10 bg-white/5 text-slate-300 hover:border-[#00f0ff]/40 hover:text-[#00f0ff]'}`}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-400"><strong className="text-slate-100">{filtered.length}</strong> produtos</p>
          <label className="flex items-center gap-2 text-sm text-slate-400">
            <ArrowUpDown className="h-4 w-4" />
            <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-lg border border-white/10 bg-[#12121a] px-3 py-2 text-sm text-slate-200 outline-none focus:border-[#00f0ff]/60">
              {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/15 py-16 text-center">
            <PackageSearch className="h-10 w-10 text-slate-500" />
            <p className="font-semibold text-slate-200">Nenhum produto encontrado</p>
            <p className="text-sm text-slate-500">Tente outro termo ou categoria.</p>
          </div>
        ) : (
          <motion.div layout className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
