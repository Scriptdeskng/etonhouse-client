/* eslint-disable @next/next/no-img-element */
import { useRecommendedProducts } from "@/services/product.service";
import PageTitle from "@/utils/page-title";

import Link from "next/link";

const Recommended = () => {
  const { data } = useRecommendedProducts();

  return (
    <PageTitle
      title="RECOMMENDED FOR YOU"
      background="bg-white !px-0 !py-10 xl:py-0"
      path="/shop"
      className="px-5 xl:px-16"
    >
      <div className="px-5 xl:px-16 w-full grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10 lg:pb-20 lg:border-b border-black">
        {data?.slice(0, 4).map((item: any) => {
          return (
            <Link
              href={`/product/${item?.slug}`}
              className="relative bg-[#FAFAFA] flex items-center justify-center h-[340px] w-full"
              key={item?.id}
            >
              <img
                src={item?.images[0]?.image}
                alt={`Product ${item?.id}`}
                className="object-cove w-full h-full"
                loading="eager"
              />
            </Link>
          );
        })}
      </div>
    </PageTitle>
  );
};

export default Recommended;
