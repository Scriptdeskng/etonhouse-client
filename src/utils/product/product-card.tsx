import Image from "next/image";

interface Props {
  name: string;
  image: string;
  price: string;
}

const ProductCard = ({ name, image, price }: Props) => {
  return (
    <div className="w-full space-y-4">
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
    </div>
  );
};

export default ProductCard;
