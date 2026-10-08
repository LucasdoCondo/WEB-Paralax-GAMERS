import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CartItem, Category, Product, SortOption } from '@/types';

interface StoreState {
  cart: CartItem[];
  cartOpen: boolean;
  cartCount: number;
  cartTotal: number;
  favorites: string[];
  search: string;
  category: Category | 'todos';
  sort: SortOption;
  selected: Product | null;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  setSearch: (value: string) => void;
  setCategory: (c: Category | 'todos') => void;
  setSort: (s: SortOption) => void;
  openProduct: (p: Product) => void;
  closeProduct: () => void;
}

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | 'todos'>('todos');
  const [sort, setSort] = useState<SortOption>('relevance');
  const [selected, setSelected] = useState<Product | null>(null);

  const openProduct = useCallback((p: Product) => setSelected(p), []);
  const closeProduct = useCallback(() => setSelected(null), []);

  const addToCart = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i,
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, quantity: qty } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const { cartCount, cartTotal } = useMemo(() => {
    return {
      cartCount: items.reduce((acc, i) => acc + i.quantity, 0),
      cartTotal: items.reduce((acc, i) => acc + i.quantity * i.product.price, 0),
    };
  }, [items]);

  const value = useMemo<StoreState>(
    () => ({
      cart: items,
      cartOpen,
      cartCount,
      cartTotal,
      favorites,
      search,
      category,
      sort,
      selected,
      setCartOpen,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleFavorite,
      isFavorite,
      setSearch,
      setCategory,
      setSort,
      openProduct,
      closeProduct,
    }),
    [items, cartOpen, cartCount, cartTotal, favorites, search, category, sort, selected, addToCart, removeFromCart, updateQty, clearCart, toggleFavorite, isFavorite, openProduct, closeProduct],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore deve ser usado dentro de <StoreProvider>');
  return ctx;
}
