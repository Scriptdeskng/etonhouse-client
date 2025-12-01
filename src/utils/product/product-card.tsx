/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Product } from "@/types/product";
import {formatPriceRange} from "@/helpers/formatPrice";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="shrink-0 w-full max-w-[280px] xl:max-w-full mx-auto xl:mx-0"
    >
      <div className="w-full h-[300px] flex items-center justify-center relative aspect-auto mb-2">
        <img
          src={product.images[0]?.image}
          alt={product.name}
          loading="eager"
          className="object-contain mix-blend-darken h-full"
        />
      </div>

      <p className="text-black text-lg capitalize mb-2">{product.name}</p>

      <p className="text-black-100 line-clamp-1">{formatPriceRange(product.price_range)}</p>
    </Link>
  );
};

export default ProductCard;
