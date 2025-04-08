import { useState } from "react";
import CartQuantity from "../quantity/cart-quantity";
import Image from "next/image";
import { FaTrash } from "react-icons/fa6";

const CartCard = () => {
  const [count, setCount] = useState(1);

  return (
    <div className="w-full h-[105px] grid grid-cols-[400px_120px_120px_230px] items-center justify-between border-[0.4px] border-[#6161614D]">
      <div className="flex items-center gap-[30px] pl-[30px]">
        <Image
          src="/assets/png/cart-img.png"
          alt="Cart Item"
          width={60}
          height={60}
          quality={100}
        />

        <div className="flex flex-col gap-5">
          <p className="text-xl leading-0 font-medium text-[#333333]">
            🛋️ Modern Oak Dining Table
          </p>

          <div className="flex items-center gap-2.5 cursor-pointer text-[#616161]">
            <FaTrash size={16} />
            <p className="text-sm">REMOVE</p>
          </div>
        </div>
      </div>

      <p className="text-lg font-medium text-[#333333]">₦150,000</p>

      <CartQuantity count={count} setCount={setCount} />

      <p className="text-lg font-bold text-[#333333]">₦150,000</p>
    </div>
  );
};

export default CartCard;
