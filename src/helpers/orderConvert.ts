import { CartItem } from "@/types/cart";
import { Order } from "@/types/order";

export function OrderConvert(
  cart: CartItem[],
  data: Order,
  method: string,
  options: { addressId?: number; isUsingSavedAddress: boolean }
) {
  const items = cart.map((item) => ({
    variant_id: item.id,
    quantity: item.quantity,
  }));

  const basePayload: any = {
    payment_method: method,
    email: data.email,
    items,
  };

  if (options.isUsingSavedAddress && options.addressId) {
    basePayload.shipping_address_id = options.addressId;
  } else {
    basePayload.shipping_address = {
      first_name: data.firstName,
      last_name: data.lastName,
      address_line1: data.address,
      address_line2: "",
      city: data.city,
      state: data.state,
      postal_code: data.postalCode,
      country: data.country,
      phone: data.phone,
    };
  }

  return basePayload;
}
