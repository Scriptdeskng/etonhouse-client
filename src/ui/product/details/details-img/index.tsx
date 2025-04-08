import Image from "next/image";

interface Props {
  images: string[];
}

const DetailsImg = ({ images }: Props) => {
  return (
    <div className="w-full border-r border-black py-8 px-5 flex flex-col items-center gap-20">
      {images.map((item) => (
        <div className="relative w-full h-30" key={item}>
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
