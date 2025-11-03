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
    title: "Elevate Your Space with\nTimeless Furniture",
    subtitle: "Discover handcrafted pieces\ndesigned for modern living",
    buttonText: "Shop now",
    buttonLink: "/shop",
    image: "/assets/webp/hero1.webp",
    imageAlt: "chair hero",
  },
  {
    title: "Furnish Smarter: Bundle &\nSave",
    subtitle: "Select entire packages for savings\n& convenience, or customize item by item",
    buttonText: "Shop Packages",
    buttonLink: "/packages",
    image: "/assets/png/package-hero.png",
    imageAlt: "packages hero",
  },
  {
    title: "Make Gifting Easy for\nFriends & Family",
    subtitle: "From weddings to birthdays, make\ncelebrations easier with a\ncustom gift registry",
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
            <div className="w-full my-10 grid lg:grid-cols-2 items-center gap-10 sm:gap-16 px-5 py-7 xl:px-20 xl:py-10">
              {/* Text Section */}
              <div className="w-[320px] sm:w-full flex flex-col items-start gap-3 md:gap-7.5">
                <EnterFromX>
                  <h1 className="text-2xl md:text-4xl leading-[150%] font-bold text-black-200 whitespace-pre-line">
                    {slide.title}
                  </h1>
                </EnterFromX>

                <EnterFromY initial={30}>
                  <p className="text-lg sm:text-xl md:text-2xl text-black-200 pr-4 whitespace-pre-line">
                    {slide.subtitle}
                  </p>
                </EnterFromY>

                <ButtonLink
                  text={slide.buttonText}
                  className="text-sm h-10 w-40 flex items-center justify-center sm:h-12 sm:w-48 xl:w-52"
                  path={slide.buttonLink}
                />
              </div>

              {/* Image Section */}
              <EnterFromX
                initial={300}
                className="relative mx-auto xl:mx-0 w-[300px] h-[300px] sm:w-100 sm:h-100 lg:w-[629px] lg:h-[537px]"
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
