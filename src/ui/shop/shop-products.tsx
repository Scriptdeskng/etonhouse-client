import Pagination from "@/components/pagination";
import ProductCard from "@/utils/product/product-card";
import ResponsiveProduct from "@/utils/product/responsive-product";
import Sort from "@/utils/sort";
import Link from "next/link";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";

const ShopProducts = () => {
  const [page, setPage] = useState(1);

  const products = [
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
  ];

  return (
    <div className="w-full min-h-screen lg:border-l lg:border-[#141414CC]">
      <div className="w-full border-t lg:border-b lg:border-r border-[#141414CC]">
        <div className="flex flex-col gap-4 py-6 px-5 md:hidden">
          <p className="text-xl font-medium text-black">Shop</p>

          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Link href="/" className="text-sm text-black">
                Home
              </Link>
              <FaAngleRight size={10} />
              <p className="text-sm text-[#616161]">Shop</p>
            </div>

            <p className="text-sm text-black">1-16/573</p>
          </div>
        </div>

        <div className="w-full px-5 pb-4 md:py-8 lg:pl-10 xl:pr-30 lg:py-12.5 flex items-center justify-end md:justify-between gap-2.5">
          <p className="hidden md:inline text-lg font-medium text-black">
            Showing 1–16 of 573 results
          </p>

          <Sort />
        </div>
      </div>

      <div className="w-full px-5 pb-14 lg:pb-0 lg:pl-7.5 pt-12.5 lg:pr-4.5">
        <div className="hidden lg:grid grid-cols-3 gap-5">
          {products.map((item) => {
            return (
              <ProductCard
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                key={item.name}
              />
            );
          })}
        </div>

        <div className="grid grid-cols-2 lg:hidden gap-4">
          {products.map((item) => {
            return (
              <ResponsiveProduct
                name={item.name}
                image={item.image}
                price={item.price}
                key={item.name}
              />
            );
          })}
        </div>

        <div className="w-full mt-8 lg:mt-20 xl:pr-16">
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;
