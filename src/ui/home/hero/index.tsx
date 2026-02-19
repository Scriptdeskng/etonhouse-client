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
    image: "/assets/newassets/timeless.png",
    imageAlt: "chair hero",
  },
  {
    title: "Furnish Smarter: \nBundle & Save",
    subtitle: "Select entire packages for savings\n& convenience, or customize item by item",
    buttonText: "Shop Packages",
    buttonLink: "/packages",
    image: "/assets/newassets/furnish.png",
    imageAlt: "packages hero",
  },
  {
    title: "Make Gifting Easy for\nFriends & Family",
    subtitle: "From weddings to birthdays, make\ncelebrations easier with a\ncustom gift registry",
    buttonText: "Create a Registry",
    buttonLink: "/registry",
    image: "/assets/hero/1.png",
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
        className="w-full h-screen max-h-[90vh]"
      >
        {heroSlides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-screen max-h-[100vh]">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                loading="eager"
                quality={100}
                className="object-cover"
                priority={idx === 0}
              />
              
              {/* Dark Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Text Content Overlay */}
              <div className="relative z-10 h-full flex items-center px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24">
                <div className="w-full max-w-2xl flex flex-col items-start gap-4 md:gap-6 mb-[10vh]">
                  <EnterFromX>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl md:leading-16 font-bold text-white whitespace-pre-line">
                      {slide.title}
                    </h1>
                  </EnterFromX>

                  <EnterFromY initial={30}>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 whitespace-pre-line">
                      {slide.subtitle}
                    </p>
                  </EnterFromY>

                  <ButtonLink
                    text={slide.buttonText}
                    className="text-sm bg-white text-black sm:text-base h-12 w-44 flex items-center justify-center sm:h-14 sm:w-52 md:h-16 md:w-56 font-medium"
                    path={slide.buttonLink}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;