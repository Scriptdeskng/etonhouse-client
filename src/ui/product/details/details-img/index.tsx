/* eslint-disable @next/next/no-img-element */

interface Props {
  images: string[];
}

const DetailsImg = ({ images }: Props) => {
  return (
    <div className="w-full lg:border-r border-black py-8 px-5 flex lg:flex-col items-center gap-4 lg:gap-20">
      {images?.map((item) => (
        <div className="relative w-full h-16 sm:h-30 shadow-xs" key={item}>
          <img
            src={item}
            alt="Product"
            className="object-contain rounded-sm"
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
};

export default DetailsImg;
