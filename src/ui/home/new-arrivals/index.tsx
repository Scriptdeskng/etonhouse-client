"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import PageTitle from "@/utils/page-title";
import ProductCard from "@/utils/product/product-card";

interface Props {
  id: number;
  image: string;
  name: string;
  price: string;
}

const NewArrivals = () => {
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
    infinite: true,
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

  const arrive: Props[] = [
    {
      id: 5,
      image: "new1",
      name: "New Product 1",
      price: "150,000",
    },
    {
      id: 6,
      image: "new2",
      name: "New Product 2",
      price: "150,000",
    },
    {
      id: 7,
      image: "new3",
      name: "New Product 3",
      price: "150,000",
    },
    {
      id: 8,
      image: "new4",
      name: "New Product 4",
      price: "150,000",
    },
  ];

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
          {arrive.map((product) => (
            <div key={product.name} className="p-5">
              <ProductCard
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
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
