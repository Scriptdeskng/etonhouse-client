import Image from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  image: string;
  title: string;
  name: string;
  price: string;
}

const Product = ({ id, image, title, name, price }: Props) => {
  return (
    <div className="w-full h-[450px] pt-18 rounded-[20px] grid grid-rows-2">
      <div className="bg-grey-50 rounded-t-[20px] relative">
        <div className="absolute -top-20 left-7">
          <Image
            src={`/assets/webp/${image}.webp`}
            alt={name}
            width={215}
            height={255}
            quality={100}
          />
        </div>
      </div>

      <div className="bg-white px-5 pt-3.5 pb-7 flex flex-col justify-between rounded-b-[20px]">
        <div className="flex flex-col gap-1.5 items-start">
          <p className="text-grey-200">{title}</p>

          <Link
            href={`/product/${id}`}
            className="font-bold text-xl text-blue-100"
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

          <button className="cursor-pointer">
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
