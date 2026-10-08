import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShieldCheck, ShoppingCart, Trash2, Truck, X } from 'lucide-react';
import { formatBRL } from '@/data/products';
import { useStore } from '@/store/StoreContext';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, cartTotal, clearCart } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" />
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0d0d15]">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-slate-100">
                <ShoppingCart className="h-5 w-5 text-[#00f0ff]" /> Carrinho ({cart.length})
              </h2>
              <button onClick={() => setCartOpen(false)} aria-label="Fechar" className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <ShoppingCart className="h-12 w-12 text-slate-600" />
                  <p className="font-semibold text-slate-300">Carrinho vazio</p>
                  <p className="text-sm text-slate-500">Adicione hardwares épicos para começar.</p>
                  <button onClick={() => setCartOpen(false)} className="mt-2 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#8b5cf6] px-6 py-2.5 text-sm font-semibold text-white">
                    Explorar produtos
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {cart.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <img src={product.image} alt={product.name} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-100">{product.name}</p>
                        <p className="text-sm font-bold text-[#00f0ff]">{formatBRL(product.price)}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQty(product.id, quantity - 1)} className="rounded-md border border-white/10 p-1 text-slate-300 hover:border-[#00f0ff]/50" aria-label="Diminuir"><Minus className="h-3.5 w-3.5" /></button>
                            <span className="w-6 text-center text-sm font-bold text-white">{quantity}</span>
                            <button onClick={() => updateQty(product.id, quantity + 1)} className="rounded-md border border-white/10 p-1 text-slate-300 hover:border-[#00f0ff]/50" aria-label="Aumentar"><Plus className="h-3.5 w-3.5" /></button>
                          </div>
                          <button onClick={() => removeFromCart(product.id)} className="text-slate-500 hover:text-red-400" aria-label="Remover"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {cart.length > 0 && (
              <div className="space-y-3 border-t border-white/10 p-5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Truck className="h-4 w-4 text-emerald-400" /> Frete grátis acima de R$ 500
                  <ShieldCheck className="ml-auto h-4 w-4 text-[#00f0ff]" /> Compra protegida
                </div>
                <div className="flex items-center justify-between text-lg font-bold text-white">
                  <span>Total</span><span className="text-[#00f0ff]">{formatBRL(cartTotal)}</span>
                </div>
                <p className="text-xs text-slate-500">em até 12x de {formatBRL(cartTotal / 12)} sem juros</p>
                <button className="w-full rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#8b5cf6] py-3.5 font-bold text-white transition hover:shadow-xl hover:shadow-[#00f0ff]/25 active:scale-[0.99]">
                  Finalizar Compra
                </button>
                <button onClick={clearCart} className="w-full py-1 text-xs text-slate-500 hover:text-red-400">Limpar carrinho</button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
