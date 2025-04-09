"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import Product from "@/utils/product";

const products = [
  {
    id: 1,
    title: "Chair",
    name: "Sakarias Armchair",
    image: "chair1",
    price: "150,000",
  },
  {
    id: 2,
    title: "Chair",
    name: "Baltsar Chair",
    image: "chair2",
    price: "150,000",
  },
  {
    id: 3,
    title: "Chair",
    name: "Anjay Chair",
    image: "chair3",
    price: "150,000",
  },
  {
    id: 4,
    title: "Chair",
    name: "Nyantuy Chair",
    image: "chair4",
    price: "150,000",
  },
];

function ProductSlider() {
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

  return (
    <div className="relative w-full px-10">
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 xl:w-12.5 h-10 xl:h-12.5 z-10 rounded-full bg-white flex items-center justify-center cursor-pointer"
      >
        <FiArrowLeft className="text-black-300" size={20} />
      </button>

      <Slider {...settings} ref={sliderRef}>
        {products.map((product) => (
          <div key={product.name} className="p-5">
            <Product
              id={product.id}
              image={product.image}
              title={product.title}
              name={product.name}
              price={product.price}
            />
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
