import Pagination from "@/components/pagination";
import ProductCard from "@/utils/product/product-card";
import Sort from "@/utils/sort";
import { useState } from "react";

const ShopProducts = () => {
  const [page, setPage] = useState(1);

  const products = [
    {
      image: "new1",
      name: "New Product 1",
      price: "150,000",
    },
    {
      image: "new2",
      name: "New Product 2",
      price: "150,000",
    },
    {
      image: "new3",
      name: "New Product 3",
      price: "150,000",
    },
  ];

  return (
    <div className="w-full min-h-screen border-l border-[#141414CC]">
      <div className="w-full border-y border-r border-[#141414CC]">
        <div className="w-full pl-10 pr-30 py-12.5 flex items-center justify-between gap-2.5">
          <p className="text-lg font-medium text-black">
            Showing 1–16 of 573 results
          </p>

          <Sort />
        </div>
      </div>

      <div className="w-full pl-7.5 pt-12.5 pr-4.5">
        <div className="grid grid-cols-3 gap-5">
          {products.map((item) => {
            return (
              <ProductCard
                name={item.name}
                image={item.image}
                price={item.price}
                key={item.name}
              />
            );
          })}
          {products.map((item) => {
            return (
              <ProductCard
                name={item.name}
                image={item.image}
                price={item.price}
                key={item.name}
              />
            );
          })}
          {products.map((item) => {
            return (
              <ProductCard
                name={item.name}
                image={item.image}
                price={item.price}
                key={item.name}
              />
            );
          })}
          {products.map((item) => {
            return (
              <ProductCard
                name={item.name}
                image={item.image}
                price={item.price}
                key={item.name}
              />
            );
          })}
        </div>

        <div className="w-full mt-20 pr-16">
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;
