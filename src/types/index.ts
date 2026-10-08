export type Category =
  | 'placas-video'
  | 'processadores'
  | 'placas-mae'
  | 'memorias'
  | 'armazenamento'
  | 'gabinetes'
  | 'fontes'
  | 'refrigeracao'
  | 'kits';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: Category;
  categoryLabel: string;
  brand: string;
  price: number;
  oldPrice?: number;
  installments: number;
  rating: number;
  reviewsCount: number;
  specs: { label: string; value: string }[];
  image: string;
  stock: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isHot?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
