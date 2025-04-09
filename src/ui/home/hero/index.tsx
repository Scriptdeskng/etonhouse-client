import EnterFromX from "@/animated/EnterFromX";
import EnterFromY from "@/animated/EnterFromY";
import ButtonLink from "@/utils/button/button-link";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full grid lg:grid-cols-2 items-center gap-4 xl:gap-16 px-5 py-14 xl:px-20 xl:py-28">
      <div className="w-[320px] sm:w-full flex flex-col items-start gap-5 md:gap-7.5">
        <EnterFromX>
          <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl leading-[150%] font-bold text-black-200">
            Elevate Your Space with Timeless Furniture
          </h1>
        </EnterFromX>

        <EnterFromY initial={30}>
          <p className="text-xl sm:text-2xl md:text-3xl xl:text-[32px] text-black-200 pr-4">
            Discover handcrafted pieces designed for modern living
          </p>
        </EnterFromY>

        <ButtonLink
          text="Shop now"
          className="w-[110px] text-[8px] h-8 py-0 flex items-center justify-center"
          path="/shop"
        />
      </div>

      <EnterFromX
        initial={300}
        className="relative mx-auto xl:mx-0 w-[280px] h-[280px] sm:w-100 sm:h-100 xl:w-[558px] xl:h-[558px]"
      >
        <Image
          src="/assets/webp/hero1.webp"
          alt="chair hero"
          fill
          loading="eager"
          quality={100}
        />
      </EnterFromX>
    </div>
  );
};

export default Hero;
