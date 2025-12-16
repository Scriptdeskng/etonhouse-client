import ProductSlider from "@/components/slider";
import { useProductByCategory } from "@/services/product.service";
import PageTitle from "@/utils/page-title";
import Tabs from "@/utils/tabs";
import { useEffect, useState } from "react";
import { useAllCategories } from "@/services/category.service";
import Skeleton from "react-loading-skeleton";

const BestSellers = () => {
  const [active, setActive] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);

  const { data, isLoading } = useProductByCategory(active);
  const { data: cats, isLoading: catsLoad } = useAllCategories();

  useEffect(() => {
    if (cats && cats.results?.length >= 1) {
      setActive(cats?.results?.[0]?.slug);
    }
  }, [cats]);

  useEffect(() => {
    if (data?.results) {
      const shuffled = [...data.results].sort(() => Math.random() - 0.5);
      setProducts(shuffled);
    }
  }, [data, active]);

  return (
    <div className="bg-[#F6F6F6]">
      <div className="w-full max-w-[1536px] mx-auto">
        <PageTitle title="BESTSELLERS" background="bg-[#F6F6F6]" path="/shop">
          {catsLoad ? (
            <Skeleton className="w-1/3 lg:w-[45%]" />
          ) : (
            <Tabs active={active} setActive={setActive} tab={cats?.results ?? []} />
          )}

          {!isLoading && products.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No products available in this category</p>
            </div>
          ) : (
            <ProductSlider
              products={products}
              isLoading={isLoading || catsLoad}
            />
          )}
        </PageTitle>
      </div>
    </div>
  );
};

export default BestSellers;