import { useAllProducts } from "@/services/product.service";
import PageTitle from "@/utils/page-title";
import ProductCard from "@/utils/product/product-card";
import ResponsiveProduct from "@/utils/product/responsive-product";

const RecentlyViewed = () => {
  const { data } = useAllProducts();

  return (
    <PageTitle
      title="RECENTLY VIEWED"
      background="bg-white !px-0 !py-10 xl:py-0"
      path="/shop"
      className="px-5 xl:px-16"
    >
      <div className="px-5 xl:px-16 w-full hidden lg:grid grid-cols-4 gap-10 pb-20 border-b border-black">
        {data?.slice(0, 4).map((item: any) => {
          return (
            <ProductCard
              id={item?.slug}
              name={item?.name}
              image={item?.images[0]?.image ?? null}
              price={Number(item?.current_price).toLocaleString("en-GB")}
              key={item?.id}
            />
          );
        })}
      </div>

      <div className="px-5 w-full lg:hidden grid grid-cols-2 gap-4">
        {data?.slice(0, 2).map((item: any) => {
          return (
            <ResponsiveProduct
              name={item?.name}
              image={item?.images[0]?.image}
              price={Number(item?.current_price).toLocaleString("en-GB")}
              key={item?.name}
            />
          );
        })}
      </div>
    </PageTitle>
  );
};

export default RecentlyViewed;
