export interface PackageItem {
  id: number;
  product: string;
  product_image: string;
  variant_id: number;
  size: string | null;
  color: string | null;
  price: string | null;
  quantity: number;
}

export interface Package {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  discount_percent: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  items: PackageItem[];
  total_price: string;
  discounted_price: string;
}