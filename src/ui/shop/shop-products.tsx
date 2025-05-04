import ProductCard from "@/utils/product/product-card";
import ResponsiveProduct from "@/utils/product/responsive-product";
import Sort from "@/utils/sort";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";

const ShopProducts = ({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) => {
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

            <p className="text-sm text-black">
              {isLoading ? (
                <Skeleton width={150} />
              ) : (
                `1-${data?.length}/${data?.length}`
              )}
            </p>
          </div>
        </div>

        <div className="w-full px-5 pb-4 md:py-8 lg:pl-10 xl:pr-30 lg:py-12.5 flex items-center justify-end md:justify-between gap-2.5">
          <p className="hidden md:inline text-lg font-medium text-black">
            {isLoading ? (
              <Skeleton width={150} />
            ) : (
              `Showing 1–${data?.length} of ${data?.length} results`
            )}
          </p>

          <Sort />
        </div>
      </div>

      <div className="w-full px-5 pb-14 lg:pb-0 lg:pl-7.5 pt-12.5 lg:pr-4.5">
        <div className="hidden lg:grid grid-cols-3 gap-5">
          {isLoading
            ? Array(6)
                .fill({})
                .map((_, index) => (
                  <Skeleton className="w-full h-[400px]" key={index} />
                ))
            : data?.map((product: any) => {
                return (
                  <ProductCard
                    key={product?.id}
                    id={product?.slug}
                    image={product?.images[0]?.image ?? null}
                    name={product?.name}
                    price={Number(product?.current_price).toLocaleString(
                      "en-GB"
                    )}
                  />
                );
              })}
        </div>

        <div className="grid grid-cols-2 lg:hidden gap-4">
          {data?.map((product: any) => {
            return (
              <ResponsiveProduct
                id={product?.slug}
                name={product?.name}
                image={product?.images[0]?.image}
                price={Number(product?.current_price).toLocaleString("en-GB")}
                key={product?.id}
                variants={product?.variants}
              />
            );
          })}
        </div>

        {/* <div className="w-full mt-8 lg:mt-20 xl:pr-16">
          <Pagination page={page} setPage={setPage} />
        </div> */}
      </div>
    </div>
  );
};

export default ShopProducts;
