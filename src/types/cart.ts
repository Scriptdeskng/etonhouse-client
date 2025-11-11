export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  productVariantId?: number;
}

export interface PackageCartItem {
  id: number;
  packageSlug: string;
  name: string;
  image: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  savedAmount: number;
  items: Array<{
    id: number;
    product: string;
    product_image: string;
    quantity: number;
  }>;
  addedAt: string;
}