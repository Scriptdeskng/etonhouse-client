import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Showroom from "@/components/showroom";
import { useAllProducts } from "@/services/product.service";
import { ShopParams } from "@/types/product";
import ShopProducts from "@/ui/shop/shop-products";
import ShopSidebar from "@/ui/shop/shop-sidebar";
import { useState } from "react";

const Shop = () => {
  const [params, setParams] = useState<ShopParams>({
    category: undefined,
    subcategory: undefined,
    price_min: undefined,
    price_max: undefined,
  });

  const { data, isLoading } = useAllProducts(params);

  function handleParams(name: string, value: number) {
    setParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleClear() {
    setParams({
      category: undefined,
      subcategory: undefined,
      price_min: undefined,
      price_max: undefined,
    });
  }

  return (
    <Entrance>
      <Navbar active={2} />
      <div className="w-full grid lg:grid-cols-[300px_auto] items-start">
        <ShopSidebar handleParams={handleParams} />
        <ShopProducts
          data={data}
          isLoading={isLoading}
          handleClear={handleClear}
        />
      </div>
      <Showroom />
      <Footer />
    </Entrance>
  );
};

export default Shop;
