import ProductSlider from "@/components/slider";
import { useAllCategories } from "@/services/category.service";
import { useProductByCategory } from "@/services/product.service";
import PageTitle from "@/utils/page-title";
import Tabs from "@/utils/tabs";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const BestSellers = () => {
  const [active, setActive] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);

  const { data, isLoading } = useProductByCategory(active);

  const { data: cats, isLoading: catsLoad } = useAllCategories();

  useEffect(() => {
    if (cats && cats.length >= 1) {
      setActive(cats?.[0]?.slug);
    }
  }, [cats]);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data, active]);

  return (
    <PageTitle title="BESTSELLERS" background="bg-grey-100" path="/shop">
      {catsLoad ? (
        <Skeleton className="w-1/3 lg:w-[45%]" />
      ) : (
        <Tabs active={active} setActive={setActive} tab={cats} />
      )}

      <ProductSlider products={products} isLoading={isLoading || catsLoad} />
    </PageTitle>
  );
};

export default BestSellers;
