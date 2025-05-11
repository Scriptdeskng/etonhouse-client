/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Quantity from "../quantity";
import { FaRegHeart } from "react-icons/fa6";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

interface Props {
  id?: string;
  name: string;
  image: string;
  price: string;
  variants: any[];
}

const ResponsiveProduct = ({ name, image, price, variants }: Props) => {
  const [count, setCount] = useState(1);

  const { addToCart } = useCartStore();

  function handleAdd() {
    addToCart({
      id: variants?.[0]?.id,
      name,
      image,
      price: Number(price.replace(/,/g, "")),
      quantity: count,
    });

    toast.success("Successfully added to cart");
  }

  return (
    <div className="w-full border border-[#61616166] relative space-y-2 md:space-y-4 px-2 py-3">
      <FaRegHeart
        size={16}
        className="absolute top-3 right-3 text-black cursor-pointer z-50"
      />

      <div className="w-full h-[180px] sm:h-[220px] relative">
        <img
          src={image}
          alt={name}
          className="object-contain h-[180px] sm:h-[220px] mx-auto"
          loading="eager"
        />
      </div>

      <p className="text-sm font-medium">{name}</p>

      <p className="text-sm text-black-400">₦{price}</p>

      <div className="w-full flex items-end justify-between">
        <Quantity count={count} setCount={setCount} size="sm" />

        <button
          onClick={handleAdd}
          className="border-b border-black text-black text-[10px] sm:text-xs whitespace-nowrap cursor-pointer"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ResponsiveProduct;
