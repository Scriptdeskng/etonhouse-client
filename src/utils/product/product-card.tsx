import Image from "next/image";
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
      <div className="w-full h-[400px] relative">
        <Image
          src={`/assets/webp/${image}.webp`}
          alt={name}
          fill
          quality={100}
        />
      </div>

      <p className="text-black">{name}</p>

      <p className="text-blue-100">₦{price}</p>
    </Link>
  );
};

export default ProductCard;
