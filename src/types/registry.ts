export interface Registry {
  id: number;
  owner: string;
  name: string;
  type: 'wedding' | 'baby-shower' | 'birthday' | 'housewarming' | 'graduation' | 'other';
  date: string;
  description: string;
  cover_image: string;
  is_public: boolean;
  delivery_address: string;
  items: RegistryItem[];
  created_at: string;
  updated_at: string;
}

export interface RegistryItem {
  id: number;
  product: string;
  product_variant: string;
  product_image: string;
  product_price: number;
  quantity_requested: number;
  quantity_fulfilled: number;
  quantity_remaining: string;
  is_fulfilled: boolean;
}

export interface RegistryItemInput {
  product_id: number;
  product_variant_id?: number;
  product_price: number;
  quantity_requested: number;
  quantity_fulfilled?: number;
  is_fulfilled?: boolean;
}

export interface RegistryPurchase {
  id: number;
  registry_item: number;
  buyer: string;
  message: string;
  quantity: number;
  fulfilled: boolean;
  purchased_at: string;
}

export interface RegistryPurchaseInput {
  registry_item: number;
  message?: string;
  quantity: number;
  fulfilled?: boolean;
}

export interface CreateRegistryInput {
  name: string;
  type: 'wedding' | 'baby-shower' | 'birthday' | 'housewarming' | 'graduation' | 'other';
  date: string;
  description: string;
  cover_image?: File | string;
  is_public: boolean;
  delivery_address?: string;
}

export interface UpdateRegistryInput {
  name?: string;
  type?: 'wedding' | 'baby-shower' | 'birthday' | 'housewarming' | 'graduation' | 'other';
  date?: string;
  description?: string;
  cover_image?: File | string;
  is_public?: boolean;
  delivery_address?: string;
}