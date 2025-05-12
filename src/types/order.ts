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

export interface OrderSchema {
  payment_method: string;
  shipping_address: {
    first_name: string;
    last_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
  };
  email: string;
  items: {
    variant_id: number;
    quantity: number;
  }[];
}

export interface Payment {
  email: string;
  reference: string;
  order_id: number;
}
