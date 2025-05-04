import ProductSlider from "@/components/slider";
import { useAllCategories } from "@/services/category.service";
import {
  useAllProducts,
  useProductByCategory,
} from "@/services/product.service";
import PageTitle from "@/utils/page-title";
import Tabs from "@/utils/tabs";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const BestSellers = () => {
  const [active, setActive] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);

  const { data, isLoading } = useProductByCategory(active);

  const { data: all, isLoading: allLoad } = useAllProducts();
  const { data: cats, isLoading: catsLoad } = useAllCategories();

  useEffect(() => {
    if (cats && cats.length >= 1) {
      setActive(cats?.[0]?.slug);
    }
  }, [cats]);

  useEffect(() => {
    if (data) {
      if (data?.length < 1) {
        setProducts(all);
        return;
      }
      setProducts(data);
    }
  }, [data, all, active]);

  return (
    <PageTitle title="BESTSELLERS" background="bg-grey-100" path="/shop">
      {catsLoad ? (
        <Skeleton className="w-1/3 lg:w-[45%]" />
      ) : (
        <Tabs active={active} setActive={setActive} tab={cats} />
      )}

      <ProductSlider
        products={products}
        isLoading={isLoading || catsLoad || allLoad}
      />
    </PageTitle>
  );
};

export default BestSellers;
