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
      className="shrink-0 w-full max-w-[280px] xl:max-w-full space-y-4 mx-auto xl:mx-0"
    >
      <div className="shadow-xs w-full h-[400px] relative aspect-auto">
        <img
          src={image}
          alt={name}
          loading="eager"
          className="object-contain mix-blend-darken h-full"
        />
      </div>

      <p className="text-black">{name}</p>

      <p className="text-blue-100">₦{price}</p>
    </Link>
  );
};

export default ProductCard;
