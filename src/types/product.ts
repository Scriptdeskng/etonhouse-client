export interface ShopParams {
  page?: number;
  search?: string;
  category?: string;
  subcategory?: string;
  price_min?: number;
  price_max?: number;
  color?: string;
  ordering?: string;
}

export interface Color {
  id: number;
  name: string;
  hex_code: string;
}

export interface Size {
  id: number;
  name: string;
}

export interface ProductImage {
  id: number;
  image: string;
  is_featured: boolean;
}

export interface Category {
  id: number;
  name: string;
  image: string | null;
  slug: string;
  description: string;
  product_count: number;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  category: number;
  product_count: number;
}

export interface Variant {
  id: number;
  product?: {
    id: number;
    name: string;
    slug: string;
    featured_image: string;
  };
  color: Color;
  size: Size;
  sku: string | null;
  stock: number;
  allow_backorders: boolean;
  base_price: string;
  discount_price: string | null;
  current_price: string;
  is_on_sale: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: Category;
  subcategory: Subcategory | null;
  description: string;
  care_description: string;
  sustainability_description: string;
  dimensions: string;
  min_price: string;
  max_price: string;
  price_range: string;
  is_on_sale: boolean;
  average_rating: string;
  review_count: number;
  sold_count: number;
  images: ProductImage[];
  variants: Variant[];
  created_at: string;
}

export interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export interface ProductDetailResponse extends Product {}