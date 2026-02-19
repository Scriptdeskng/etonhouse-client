"use client";

import Button from "@/utils/button";
import PageTitle from "@/utils/page-title";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const images = [
  { src: "/assets/carousel/1.jpg", alt: "Lagos Showroom - View 1" },
  { src: "/assets/carousel/2.jpg", alt: "Lagos Showroom - View 2" },
  { src: "/assets/carousel/3.jpg", alt: "Lagos Showroom - View 3" },
  { src: "/assets/carousel/4.jpg", alt: "Lagos Showroom - View 4" },
];

const MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=59A+Mainland+Way,+Dolphine+Estate,+Lagos+106104,+Lagos";

const ShowroomCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((index + images.length) % images.length);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating]
  );

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    goTo(current - 1);
  };

  const next = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      goTo(current + 1);
    },
    [current, goTo]
  );

  const autoNext = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(autoNext, 4000);
    return () => clearInterval(timer);
  }, [autoNext]);

  return (
    <div className="w-full h-[270px] md:h-full min-h-[320px] relative overflow-hidden group">
      {images.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
        >
          <Image src={img.src} alt={img.alt} fill className="object-cover" />
        </div>
      ))}

      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white w-8 h-8 flex items-center justify-center text-xl transition-all opacity-0 group-hover:opacity-100"
      >
        ‹
      </button>

      <button
        onClick={(e) => next(e)}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white w-8 h-8 flex items-center justify-center text-xl transition-all opacity-0 group-hover:opacity-100"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              goTo(i);
            }}
            aria-label={`Go to image ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-4" : "bg-white/50 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Visit = () => {
  return (
    <PageTitle
      title="VISIT OUR SHOWROOM"
      button={{ exists: true, path: MAPS_URL, text: "GET DIRECTIONS" }}
    >
      <p className="font-medium text-lg xl:text-xl">
        Find a showroom near you or explore real-life setups!
      </p>

      <div className="xl:pr-8">
        <div className="w-full grid md:grid-cols-2 bg-[#FBFBFB]">
          <ShowroomCarousel />

          <div className="w-full flex flex-col gap-6 px-5 py-[30px] xl:pl-10 xl:pr-20 xl:py-8">
            <h3 className="text-black-400 text-xl xl:text-2xl font-bold">Eton House</h3>

            <p className="xl:text-lg font-medium">Lagos, Nigeria</p>

            <p className="text-[#616161] font-medium">
              59A Mainland way, Dolphin estate, Ikoyi
            </p>

            <div>
              <div className="w-full flex items-center justify-between py-3 xl:py-4 border-b border-[#616161]/50 font-medium text-black-400 xl:text-lg">
                <p className="font-bold">Location</p>
                <p>59A Mainland way, Dolphin estate, Ikoyi</p>
              </div>
              <div className="w-full flex items-center justify-between py-3 xl:py-4 border-b border-[#616161]/50 font-medium text-black-400 xl:text-lg">
                <p className="font-bold">Phone</p>
                <p>+2348090397777</p>
              </div>
              <div className="w-full flex items-center justify-between py-3 xl:py-4 border-b border-[#616161]/50 font-medium text-black-400 xl:text-lg">
                <p className="font-bold">Opening hours</p>
                <p>Mon-Sat: 9AM - 7PM</p>
              </div>
            </div>

            <Link href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              <Button text="Visit" className="!w-full !text-sm !rounded-none !py-3" />
            </Link>
          </div>
        </div>
      </div>
    </PageTitle>
  );
};

export default Visit;