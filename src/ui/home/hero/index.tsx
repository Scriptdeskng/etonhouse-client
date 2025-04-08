import ButtonLink from "@/utils/button/button-link";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full grid grid-cols-2 items-center gap-16 px-20 py-28">
      <div className="flex flex-col items-start gap-7.5">
        <h1 className="text-5xl leading-[150%] font-bold text-black-200">
          Elevate Your Space with Timeless Furniture
        </h1>

        <p className="text-[32px] text-black-200 pr-4">
          Discover handcrafted pieces designed for modern living
        </p>

        <ButtonLink text="Shop now" className="px-20" path="/shop" />
      </div>

      <div className="relative w-[558px] h-[558px]">
        <Image
          src="/assets/webp/hero1.webp"
          alt="chair hero"
          fill
          loading="eager"
          quality={100}
        />
      </div>
    </div>
  );
};

export default Hero;
