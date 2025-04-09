import Image from "next/image";

interface Props {
  images: string[];
}

const DetailsImg = ({ images }: Props) => {
  return (
    <div className="w-full lg:border-r border-black py-8 px-5 flex lg:flex-col items-center gap-4 lg:gap-20">
      {images.map((item) => (
        <div className="relative w-full h-16 sm:h-30" key={item}>
          <Image
            src={`/assets/webp/${item}.webp`}
            alt="Product"
            fill
            className="object-cover rounded-sm"
            quality={100}
            priority
          />
        </div>
      ))}
    </div>
  );
};

export default DetailsImg;
