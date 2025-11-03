/* eslint-disable @next/next/no-img-element */
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

interface Props {
  id: number;
  image: string;
  title: string;
  name: string;
  price: string;
  variants: any[];
}

const Product = ({ id, image, title, name, price, variants }: Props) => {
  const { addToCart } = useCartStore();

  function handleAdd() {
    addToCart({
      id: variants?.[0]?.id,
      image: image,
      name,
      price: Number(price.replace(/,/g, "")),
      quantity: 1,
    });

    toast.success("Successfully added to cart!");
  }

  return (
    <div className="shrink-0 w-full max-w-[300px] xl:max-w-full max-h-[386px] rounded-[20px] grid grid-rows-2 mx-auto xl:mx-0 bg-white">
      <div className="rounded-t-[20px] relative">
        <img
          src={image}
          alt={name}
          className="py-5 h-[250px] w-full object-cover rounded-t-[20px]"
          loading="eager"
        />
      </div>

      <div className="max-h-[180px] px-2 pt-11 flex flex-col rounded-b-[20px]">
        <div className="flex flex-col gap-1.5 items-start">
          <p className="text-grey-200 capitalize">{title}</p>

          <Link
            href={`/product/${id}`}
            className="font-semibold text-xl text-black capitalize whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {name}
          </Link>

          <Image
            src="/assets/svg/star.svg"
            alt="stars"
            width={104}
            height={18}
            quality={100}
          />
        </div>

        <div className="w-full flex items-center justify-between mt-5">
          <p className="text-black font-semibold text-lg">₦{price}</p>

          <button className="cursor-pointer" onClick={handleAdd}>
            <Image
              src="/assets/svg/cart-plus.svg"
              alt="stars"
              width={28}
              height={28}
              quality={100}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
