export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: 'video-card' | 'processor' | 'gpu' | 'motherboard' | 'ram' | 'storage' | 'case' | 'psu' | 'cooling' | 'peripherals' | 'kits';
  brand: string;
  price: number;
  oldPrice?: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  specifications: Record<string, string>;
  image: string;
  images?: string[];
  stock: number;
  isFeatured: boolean;
  isNew?: boolean;
  isHot: boolean;
  colors?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export type Category = Product['category'];

export interface FilterState {
  categories: Category[];
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'popular' | 'price-low' | 'price-high' | 'rating' | 'newest';
  inStockOnly: boolean;
}

export interface NavbarState {
  isMenuOpen: boolean;
  isCartOpen: boolean;
  isDarkMode: boolean;
  searchQuery: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: {
    message: string;
    code: string;
  };
}

export type SortOrder = 'asc' | 'desc';

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'customer' | 'admin' | 'seller';
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: 'credit-card' | 'debit-card' | 'pix' | 'boleto' | 'paypal' | 'money-order';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  slug: string;
  quantity: number;
  price: number;
  image: string;
}
