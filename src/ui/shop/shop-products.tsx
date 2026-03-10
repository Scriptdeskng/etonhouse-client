import ResponsiveProduct from "@/utils/product/responsive-product";
// import Sort from "@/utils/sort";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import EmptyProducts from "../product/empty";
import Pagination from "@/components/pagination";
import { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 10;

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  category: number;
}

interface ShopProductsProps {
  data: any;
  isLoading: boolean;
  handleClear: () => void;
  handleParams: (name: string, value: any) => void;
  page: number | undefined;
  currentSort?: string;
  categories?: Category[];
  categoriesLoading?: boolean;
  selectedCategory?: string;
  subcategories?: Subcategory[];
  subcategoriesLoading?: boolean;
  selectedSubcategory?: string;
}

const ShopProducts = ({
  data,
  isLoading,
  handleClear,
  handleParams,
  page,
  // currentSort,
  categories = [],
  categoriesLoading,
  selectedCategory,
  subcategories = [],
  subcategoriesLoading,
  selectedSubcategory,
}: ShopProductsProps) => {
  // const currentPage = Number(page) || 1;
  // const rangeStart = (currentPage - 1) * PAGE_SIZE + 1;
  // const rangeEnd = Math.min(currentPage * PAGE_SIZE, data?.count);

  const subcatRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeKey = selectedSubcategory;
    if (!activeKey) {
      setIndicatorStyle({ left: 0, width: 0 });
      return;
    }
    const el = subcatRefs.current[activeKey];
    if (el) {
      setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [selectedSubcategory, subcategories]);

  const handleCategoryClick = (slug: string | undefined) => {
    handleParams("category", slug);
  };

  const handleSubcategoryClick = (slug: string | undefined) => {
    handleParams("subcategory", selectedSubcategory === slug ? undefined : slug);
  };

  return (
    <div className="w-full min-h-screen border-l">

      {/* Categories — wrap on mobile */}
      <div className="w-full px-5 lg:pl-10 lg:pr-10 pt-8 pb-10">
        {categoriesLoading ? (
          <div className="flex gap-2 flex-wrap">
            {Array(5).fill(null).map((_, i) => (
              <Skeleton key={i} width={90} height={34} borderRadius={4} />
            ))}
          </div>
        ) : (
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleCategoryClick(undefined)}
              className={`px-4 py-1.5 text-sm border transition-colors duration-150 cursor-pointer ${
                !selectedCategory
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-[#61616166] hover:border-black"
              }`}
            >
              All
            </button>

            {categories.map((cat) => {
              const isActive = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(isActive ? undefined : cat.slug)}
                  className={`px-4 py-1.5 text-sm border transition-colors duration-150 cursor-pointer capitalize ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-[#61616166] hover:border-black"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Subcategories — horizontally scrollable, sliding underline */}
      {selectedCategory && (
        <div className="w-full min-w-0 overflow-hidden px-5 lg:pl-10 lg:pr-10 pb-8">
          {subcategoriesLoading ? (
            <div className="flex gap-6">
              {Array(4).fill(null).map((_, i) => (
                <Skeleton key={i} width={80} height={28} />
              ))}
            </div>
          ) : subcategories.length > 0 ? (
            <div className="relative min-w-0">
              <div className="flex gap-6 overflow-x-auto scrollbar-hide w-full">
                {subcategories.map((sub) => {
                  const isActive = selectedSubcategory === sub.slug;
                  return (
                    <button
                      key={sub.id}
                      ref={(el) => { subcatRefs.current[sub.slug] = el; }}
                      onClick={() => handleSubcategoryClick(sub.slug)}
                      className={`pb-3 text-sm whitespace-nowrap transition-colors duration-150 cursor-pointer capitalize ${
                        isActive
                          ? "text-black font-bold"
                          : "text-[#616161] hover:text-black"
                      }`}
                    >
                      {sub.name}
                    </button>
                  );
                })}
              </div>

              {/* Static bottom border */}
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#61616133]" />

              {/* Sliding active indicator */}
              <div
                className="absolute bottom-0 h-[2px] bg-black transition-all duration-300 ease-in-out"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
              />
            </div>
          ) : null}
        </div>
      )}

      <div className="w-full">
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

            {/* <p className="text-sm text-black">
              {isLoading ? (
                <Skeleton width={150} />
              ) : (
                `${rangeStart}-${rangeEnd}/${data?.count}`
              )}
            </p> */}
          </div>
        </div>

        {/* <div className="w-full px-5 pb-4 md:py-8 lg:pl-10 xl:pr-30 lg:py-12.5 flex items-center justify-end md:justify-between gap-2.5">
          <p className="hidden md:inline text-lg font-medium text-black">
            {isLoading ? (
              <Skeleton width={150} />
            ) : (
              `Showing ${rangeStart} – ${rangeEnd} of ${data?.count} results`
            )}
          </p>

          <Sort handleParams={handleParams} currentSort={currentSort} />
        </div> */}
      </div>

      <div className="w-full px-5 pb-14 lg:pb-0 lg:pl-7.5 pt-12.5 lg:pr-4.5">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 lg:pr-16 xl:pr-24">
          {isLoading ? (
            Array(PAGE_SIZE)
              .fill({})
              .map((_, index) => (
                <Skeleton className="w-full h-[280px]" key={index} />
              ))
          ) : data?.results?.length < 1 ? (
            <EmptyProducts clearFilters={handleClear} />
          ) : (
            data?.results?.map((product: any) => (
              <ResponsiveProduct key={product?.id} product={product} />
            ))
          )}
        </div>

        {!isLoading && (
          <div className="w-full mt-8 lg:mt-20 xl:pr-16">
            <Pagination
              page={page ?? 1}
              setPage={(value) => handleParams("page", value)}
              total={Math.ceil(data?.count / PAGE_SIZE)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopProducts;