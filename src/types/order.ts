export interface Order {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  state: string;
  address: string;
  city: string;
  postalCode: string;
}

export type OrderSchema = {
  payment_method: string;
  email: string;
  items: { variant_id: number; quantity: number }[];
  shipping_address_id?: number;
  shipping_address?: {
    first_name: string;
    last_name: string;
    address_line1: string;
    city: string;
    country: string;
    phone: string;
    state: string;
    postal_code: string;
  };
};

export interface Payment {
  email: string;
  reference: string;
  order_id: number;
  payment_method?: string;
}
