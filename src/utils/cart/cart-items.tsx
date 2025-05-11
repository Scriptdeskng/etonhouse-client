import CartCard from "./cart-card";
import CartCoupon from "./cart-coupon";
import Checkout from "./checkout";
import { useCartStore } from "@/store/cartStore";
import EmptyCart from "./empty-cart";
import { useEffect, useState } from "react";

const CartItems = () => {
  const { cart, getTotalPrice } = useCartStore();

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const value = getTotalPrice();
    setTotal(value);
  }, [getTotalPrice]);

  return (
    <div className="pt-4 pb-24 space-y-[30px]">
      <div className="w-full h-14 hidden lg:grid grid-cols-[400px_120px_120px_230px] justify-between bg-[#D6DDD6]">
        <div className="w-full flex items-center pl-[30px] text-[#141414] font-bold">
          PRODUCT
        </div>
        <div className="w-full flex items-center text-[#141414] font-bold">
          PRICE
        </div>
        <div className="w-full flex items-center text-[#141414] font-bold">
          QUANTITY
        </div>
        <div className="w-full flex items-center text-[#141414] font-bold">
          SUBTOTAL
        </div>
      </div>

      <div className="lg:space-y-[14px]">
        {cart.length < 1 ? (
          <EmptyCart />
        ) : (
          cart?.map((item: any) => <CartCard product={item} key={item?.id} />)
        )}
      </div>

      <div className="w-full flex items-center justify-center md:hidden">
        <CartCoupon placeholder="Coupon Code" />
      </div>

      <div className="w-full flex items-center justify-between">
        <p className="md:text-xl text-[#333333] font-medium">
          🛒 Total: ₦{total.toLocaleString()}
        </p>

        <p className="hidden md:inline text-xl text-black font-medium">
          💳 Got a discount code?
        </p>
      </div>

      <div className="w-full flex items-start gap-2 justify-between">
        <Checkout total={total} count={cart.length} />

        <div className="hidden md:inline">
          <CartCoupon />
        </div>
      </div>
    </div>
  );
};

export default CartItems;
