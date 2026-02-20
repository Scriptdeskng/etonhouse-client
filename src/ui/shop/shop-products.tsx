import ResponsiveProduct from "@/utils/product/responsive-product";
import Sort from "@/utils/sort";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import EmptyProducts from "../product/empty";
import Pagination from "@/components/pagination";

const PAGE_SIZE = 10;

const ShopProducts = ({
  data,
  isLoading,
  handleClear,
  handleParams,
  page,
  currentSort,
}: {
  data: any;
  isLoading: boolean;
  handleClear: () => void;
  handleParams: (name: string, value: any) => void;
  page: number | undefined;
  currentSort?: string;
}) => {
  const currentPage = Number(page) || 1;
  const rangeStart = (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, data?.count);

  return (
    <div className="w-full min-h-screen border-l">
      <div className="w-full lg:border-b border-[#141414CC]">
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
                `${rangeStart}-${rangeEnd}/${data?.count}`
              )}
            </p>
          </div>
        </div>

        <div className="w-full px-5 pb-4 md:py-8 lg:pl-10 xl:pr-30 lg:py-12.5 flex items-center justify-end md:justify-between gap-2.5">
          <p className="hidden md:inline text-lg font-medium text-black">
            {isLoading ? (
              <Skeleton width={150} />
            ) : (
              `Showing ${rangeStart} – ${rangeEnd} of ${data?.count} results`
            )}
          </p>

          <Sort handleParams={handleParams} currentSort={currentSort} />
        </div>
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