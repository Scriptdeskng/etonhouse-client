import CartCard from "@/utils/cart/cart-card";

const Summary = () => {
  return (
    <div className="lg:pt-10 lg:pb-8 space-y-[30px] lg:border-b-[0.6px] border-[#61616133]">
      <div className="w-full h-14 bg-[#D6DDD6] flex items-center">
        <p className="pl-4 lg:pl-[30px] text-[#141414] lg:text-xl font-bold">
          ORDER SUMMARY
        </p>
      </div>

      <div className="space-y-5">
        <CartCard product={{}} handleQuantity={() => null} disabled />

        <p className="lg:text-lg font-medium text-[#333333]">
          🔹 Subtotal: ₦310,000
        </p>
        <p className="lg:text-lg font-medium text-[#333333]">
          🚚 Shipping Fee: ₦5,000
        </p>
        <p className="lg:text-lg font-medium text-[#333333]">
          🎁 Discount Applied: -₦10,000 (Promo Code: WELCOME10)
        </p>
        <p className="lg:text-lg font-medium text-[#333333]">
          💰 Total Amount Paid: ₦305,000
        </p>
        <p className="lg:text-lg font-medium text-[#333333]">
          🛒 Payment Method: Visa (**** 1234)
        </p>
      </div>
    </div>
  );
};

export default Summary;
