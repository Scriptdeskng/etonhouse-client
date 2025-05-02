"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import PageTitle from "@/utils/page-title";
import ProductCard from "@/utils/product/product-card";
import { useAllProducts } from "@/services/product.service";
import Skeleton from "react-loading-skeleton";

const NewArrivals = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  const { data, isLoading } = useAllProducts();

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
    infinite: data?.length < 4 ? false : true,
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
    <PageTitle title="NEW ARRIVALS" background="bg-white" path="/shop">
      <div className="relative w-full px-10 xl:pb-8 xl:border-b xl:border-black">
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 xl:w-12.5 h-10 xl:h-12.5 z-10 rounded-full bg-white flex xl:hidden items-center justify-center cursor-pointer shadow-md"
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
            : data?.map((product: any) => (
                <div key={product.name} className="p-5">
                  <ProductCard
                    id={product?.slug}
                    image={product?.images[0]?.image ?? null}
                    name={product?.name}
                    price={Number(product?.current_price).toLocaleString(
                      "en-GB"
                    )}
                  />
                </div>
              ))}
        </Slider>

        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 xl:w-12.5 h-10 xl:h-12.5 z-10 rounded-full bg-white flex xl:hidden items-center justify-center cursor-pointer shadow-md"
        >
          <FiArrowRight className="text-black-300" size={20} />
        </button>
      </div>
    </PageTitle>
  );
};

export default NewArrivals;
