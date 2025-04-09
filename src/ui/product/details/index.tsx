import { Product } from "@/pages/product/[id]";
import DetailsImg from "./details-img";
import DetailsInfo from "./details-info";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";

interface Props {
  product: Product;
}

const Details = ({ product }: Props) => {
  return (
    <div className="w-full border-b-0 lg:border-b border-black grid grid-cols-1 lg:grid-cols-[140px_1fr] pb-14 lg:pb-28">
      <div className="flex flex-col gap-4 py-6 px-5 lg:hidden">
        <p className="text-xl font-medium text-black">Shop</p>

        <div className="flex items-center gap-2.5">
          <Link href="/" className="text-sm text-black">
            Home
          </Link>
          <FaAngleRight size={10} />
          <Link href="/shop" className="text-sm text-black">
            Shop
          </Link>
          <FaAngleRight size={10} />
          <p className="text-sm text-[#616161]">{product.name}</p>
        </div>
      </div>

      <div className="hidden lg:flex w-full">
        <DetailsImg images={product.images} />
      </div>

      <DetailsInfo product={product} />
    </div>
  );
};

export default Details;
