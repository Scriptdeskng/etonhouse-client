/* eslint-disable @next/next/no-img-element */
import { useAddToCart } from "@/services/cart.service";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  image: string;
  title: string;
  name: string;
  price: string;
  variants: any[];
}

const Product = ({ id, image, title, name, price, variants }: Props) => {
  const mutation = useAddToCart();

  function handleAdd() {
    mutation.mutate({
      variant_id: variants?.[0]?.id,
      quantity: 1,
    });
  }

  return (
    <div className="shrink-0 w-full max-w-[280px] xl:max-w-full h-[450px] pt-18 rounded-[20px] grid grid-rows-2 mx-auto xl:mx-0">
      <div className="bg-grey-50 rounded-t-[20px] relative">
        <div className="absolute -top-20 inset-x-0">
          <img
            src={image}
            alt={name}
            width={215}
            height={255}
            className="mx-auto"
            loading="eager"
          />
        </div>
      </div>

      <div className="bg-white px-5 pt-3.5 pb-7 flex flex-col justify-between rounded-b-[20px]">
        <div className="flex flex-col gap-1.5 items-start">
          <p className="text-grey-200 capitalize">{title}</p>

          <Link
            href={`/product/${id}`}
            className="font-bold text-xl text-blue-100 capitalize"
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

        <div className="w-full flex items-center justify-between">
          <p className="text-blue-100 font-bold text-xl">₦{price}</p>

          <button className="cursor-pointer" onClick={handleAdd}>
            <Image
              src="/assets/svg/cart-plus.svg"
              alt="stars"
              width={48}
              height={48}
              quality={100}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
