"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import EnterFromX from "@/animated/EnterFromX";
import EnterFromY from "@/animated/EnterFromY";
import ButtonLink from "@/utils/button/button-link";
import Image from "next/image";

const heroSlides = [
  {
    title: "Elevate Your Space with Timeless Furniture",
    subtitle: "Discover handcrafted pieces designed for modern living",
    buttonText: "Shop now",
    buttonLink: "/shop",
    image: "/assets/webp/hero1.webp",
    imageAlt: "chair hero",
  },
  {
    title: "Furnish Smarter: Bundle & Save",
    subtitle: "Select entire packages for convenience & savings, or customize item by item",
    buttonText: "Shop Packages",
    buttonLink: "/packages",
    image: "/assets/png/package-hero.png",
    imageAlt: "packages hero",
  },
  {
    title: "Make Gifting Easy for Friends & Family",
    subtitle: "From weddings to birthdays, make celebrations easier with a custom gift registry",
    buttonText: "Create a Registry",
    buttonLink: "/registry",
    image: "/assets/png/registry-banner.png",
    imageAlt: "Family Image",
  },
];

const Hero = () => {
  return (
    <div className="w-full max-w-[1536px] mx-auto">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
      >
        {heroSlides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full grid lg:grid-cols-2 items-center gap-4 xl:gap-16 px-5 py-7 xl:px-20 xl:py-10">
              {/* Text Section */}
              <div className="w-[320px] sm:w-full flex flex-col items-start gap-5 md:gap-7.5">
                <EnterFromX>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl leading-[150%] font-bold text-black-200">
                    {slide.title}
                  </h1>
                </EnterFromX>

                <EnterFromY initial={30}>
                  <p className="text-xl sm:text-2xl md:text-3xl xl:text-[32px] text-black-200 pr-4">
                    {slide.subtitle}
                  </p>
                </EnterFromY>

                <ButtonLink
                  text={slide.buttonText}
                  className="w-[110px] text-[8px] h-8 py-0 flex items-center justify-center"
                  path={slide.buttonLink}
                />
              </div>

              {/* Image Section */}
              <EnterFromX
                initial={300}
                className="relative mx-auto xl:mx-0 w-[280px] h-[280px] sm:w-100 sm:h-100 xl:w-[558px] xl:h-[558px]"
              >
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  loading="eager"
                  quality={100}
                />
              </EnterFromX>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
