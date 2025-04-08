import Button from "../button";

const CartCoupon = () => {
  return (
    <div className="w-[200px] h-11 flex gap-2.5">
      <input
        type="text"
        placeholder="Enter Code"
        className="w-[100px] h-11 border-[0.4px] border-[#61616166] px-2 text-[#616161] text-sm leading-[100%] outline-none"
      />

      <Button
        text="Apply"
        className="w-[90px] h-11 bg-[#333333] text-white !rounded-none !text-sm !py-0 flex items-center justify-center"
        type="button"
      />
    </div>
  );
};

export default CartCoupon;
