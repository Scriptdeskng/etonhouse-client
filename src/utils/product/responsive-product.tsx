import Image from "next/image";
import { useState } from "react";
import Quantity from "../quantity";
import { FaRegHeart } from "react-icons/fa6";

interface Props {
  name: string;
  image: string;
  price: string;
}

const ResponsiveProduct = ({ name, image, price }: Props) => {
  const [count, setCount] = useState(1);

  return (
    <div className="w-full border border-[#61616166] relative space-y-2 md:space-y-4 px-2 py-3">
      <FaRegHeart
        size={16}
        className="absolute top-3 right-3 text-black cursor-pointer"
      />

      <div className="w-full h-[180px] sm:h-[220px] relative">
        <Image
          src={`/assets/webp/${image}.webp`}
          alt={name}
          fill
          className="object-contain"
          quality={100}
        />
      </div>

      <p className="text-sm font-medium">{name}</p>

      <p className="text-sm text-black-400">₦{price}</p>

      <div className="w-full flex items-end justify-between">
        <Quantity count={count} setCount={setCount} size="sm" />

        <p className="border-b border-black text-black text-[10px] sm:text-xs whitespace-nowrap">
          ADD TO CART
        </p>
      </div>
    </div>
  );
};

export default ResponsiveProduct;
