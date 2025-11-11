"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import Product from "@/utils/product";
import Skeleton from "react-loading-skeleton";

interface Props {
  products: any[];
  isLoading: boolean;
}

function ProductSlider({ products, isLoading }: Props) {
  const sliderRef = useRef<Slider | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: products?.length < 4 ? false : true,
    speed: 500,
    slidesToShow:
      Number(width) >= 1280
        ? 4
        : Number(width) >= 1024
          ? 3
          : Number(width) >= 768
            ? 2
            : 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="relative w-full px-7 sm:px-10">
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 xl:w-12.5 h-10 xl:h-12.5 z-10 rounded-full bg-white flex items-center justify-center cursor-pointer"
      >
        <FiArrowLeft className="text-black-300" size={20} />
      </button>

      <Slider {...settings} ref={sliderRef}>
        {isLoading
          ? Array(4)
            .fill({})
            .map((_, index) => (
              <div key={index} className="p-5">
                <Skeleton
                  className="w-full max-w-[280px] xl:max-w-full h-[450px] pt-18 rounded-[20px]"
                  key={index}
                />
              </div>
            ))
          : products?.slice(0, 8)?.map((product) => (
            <div key={product.id || product.slug} className="p-5">
              <Product product={product} />
            </div>
          ))}
      </Slider>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 xl:w-12.5 h-10 xl:h-12.5 z-10 rounded-full bg-white flex items-center justify-center cursor-pointer"
      >
        <FiArrowRight className="text-black-300" size={20} />
      </button>
    </div>
  );
}

export default ProductSlider;
