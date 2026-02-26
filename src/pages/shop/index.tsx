import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Showroom from "@/components/showroom";
import { useAllProducts, useCategoryDetail } from "@/services/product.service";
import { ShopParams } from "@/types/product";
import ShopProducts from "@/ui/shop/shop-products";
import ShopSidebar from "@/ui/shop/shop-sidebar";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const Shop = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || undefined;

  const urlCategory = searchParams?.get("category") || undefined;
  const urlSubcategory = searchParams?.get("subcategory") || undefined;

  const [params, setParams] = useState<ShopParams>({
    page: 1,
    search: searchQuery,
    category: urlCategory,
    subcategory: urlSubcategory,
    price_min: undefined,
    price_max: undefined,
    color: undefined,
    ordering: "-created_at",
  });

  const { data, isLoading } = useAllProducts(params);

  const {
    data: categoryDetail,
    isLoading: categoryDetailLoading,
  } = useCategoryDetail(params.category ?? "");

  const subcategories = useMemo(() => {
    if (!categoryDetail) return [];
    const raw = categoryDetail.subcategories;
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "string") {
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }, [categoryDetail]);

  function handleParams(name: string, value: any) {
    setParams((prev) => ({
      ...prev,
      [name]: value,
      ...(name !== "page" ? { page: 1 } : {}),
      ...(name === "category" ? { subcategory: undefined } : {}),
    }));
  }

  function handleClear() {
    setParams({
      page: 1,
      search: searchQuery,
      category: undefined,
      subcategory: undefined,
      price_min: undefined,
      price_max: undefined,
      color: undefined,
      ordering: "-created_at",
    });
  }

  return (
    <Entrance>
      <Navbar active={2} />
      <div className="w-full max-w-[1536px] mx-auto grid lg:grid-cols-[300px_auto] items-start">
        <ShopSidebar
          handleParams={handleParams}
          selectedCategory={params.category}
          selectedColor={params.color}
        />
        <ShopProducts
          data={data}
          isLoading={isLoading}
          handleClear={handleClear}
          handleParams={handleParams}
          page={params.page}
          currentSort={params.ordering}
          subcategories={subcategories}
          subcategoriesLoading={!!params.category && categoryDetailLoading}
          selectedSubcategory={params.subcategory}
          selectedCategory={params.category}
        />
      </div>
      <Showroom />
      <Footer />
    </Entrance>
  );
};

export default Shop;