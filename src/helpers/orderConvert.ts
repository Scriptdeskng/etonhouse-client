import { CartItem } from "@/types/cart";
import { Order, OrderSchema } from "@/types/order";

export function OrderConvert(
  cart: CartItem[],
  data: Order,
  method: string
): OrderSchema {
  const result = cart.map((item) => ({
    variant_id: item.id,
    quantity: item.quantity,
  }));

  return {
    payment_method: method,
    email: data.email,
    shipping_address: {
      address_line1: data.address,
      city: data.city,
      country: data.country,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      state: data.state,
      postal_code: data.postalCode,
    },
    items: result,
  };
}
