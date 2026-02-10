export interface Product {
  id: string;
  name: string;
  nameAm?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  description: string;
  variants?: ProductVariant[];
  seller: Seller;
  tags?: string[];
  featured?: boolean;
  deal?: boolean;
}

export interface ProductVariant {
  type: string;
  options: string[];
}

export interface Seller {
  id: string;
  name: string;
  rating: number;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  nameAm?: string;
  icon: string;
  productCount: number;
  image?: string;
}
