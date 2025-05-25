export interface ShopParams {
  page?: number;
  category: string | undefined;
  subcategory: string | undefined;
  price_min: number | undefined;
  price_max: number | undefined;
}
