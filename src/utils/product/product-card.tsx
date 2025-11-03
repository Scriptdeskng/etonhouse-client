/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

interface Props {
  id: number;
  name: string;
  image: string;
  price: string;
}

const ProductCard = ({ id, name, image, price }: Props) => {
  return (
    <Link
      href={`/product/${id}`}
      className="shrink-0 w-full max-w-[280px] xl:max-w-full mx-auto xl:mx-0"
    >
      <div className="w-full h-[300px] flex items-center justify-center relative aspect-auto mb-2">
        <img
          src={image}
          alt={name}
          loading="eager"
          className="object-contain mix-blend-darken h-full"
        />
      </div>

      <p className="text-black text-lg capitalize mb-2">{name}</p>

      <p className="text-black-100">₦{price}</p>
    </Link>
  );
};

export default ProductCard;
