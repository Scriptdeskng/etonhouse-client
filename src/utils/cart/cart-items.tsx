import CartCard from "./cart-card";
import CartCoupon from "./cart-coupon";
import Checkout from "./checkout";

const CartItems = () => {
  return (
    <div className="pt-4 pb-24 space-y-[30px]">
      <div className="w-full h-14 grid grid-cols-[400px_120px_120px_230px] justify-between bg-[#D6DDD6]">
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

      <div className="space-y-[14px]">
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
      </div>

      <div className="w-full flex items-center justify-between">
        <p className="text-xl text-[#333333] font-medium">🛒 Total: ₦310,000</p>

        <p className="text-xl text-black font-medium">
          💳 Got a discount code?
        </p>
      </div>

      <div className="w-full flex items-start justify-between">
        <Checkout />

        <CartCoupon />
      </div>
    </div>
  );
};

export default CartItems;
