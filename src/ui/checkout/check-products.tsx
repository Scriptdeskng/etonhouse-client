import { useGetCartItems } from "@/services/cart.service";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

const CheckProducts = () => {
  const { data, isLoading } = useGetCartItems();

  const checking = [
    {
      title: "SUBTOTAL",
      value: `₦${Number(data?.total ?? 0).toLocaleString()}`,
    },
    {
      title: "📦 SHIPPING",
      value: "Enter your address to view shipping options.",
    },
    {
      title: "🎁 DISCOUNT APPLIED",
      value: " -₦10,000 (Promo Code: WELCOME10)",
    },
    {
      title: "TOTAL",
      value: `₦${Number((data?.total ?? 10000) - 10000).toLocaleString()}`,
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-[65%_1fr] gap-1 bg-[#D6DDD6]">
        <div className="w-full h-14 flex items-center pl-2.5 xl:pl-[30px] text-[#141414] font-bold">
          PRODUCT
        </div>
        <div className="w-full h-14 flex items-center pl-2.5 xl:pl-[30px] text-[#141414] font-bold">
          SUBTOTAL
        </div>
      </div>

      <div className="w-full flex flex-col gap-5 lg:py-[30px] bg-[#FDFDFD] md:border-[0.5px] md:border-[#61616133]">
        <div className="lg:space-y-6">
          {isLoading ? (
            <div className="md:px-2 lg:px-4">
              <Skeleton height={100} count={2} />
            </div>
          ) : (
            data?.items?.map((item: any) => (
              <div
                className="w-full grid grid-cols-[65%_1fr] gap-1 border-b-[0.6px] border-[#61616133] pt-4 pb-2.5 md:border-none lg:p-0"
                key={item.id}
              >
                <div className="md:pl-2 lg:pl-4 flex flex-col md:flex-row lg:items-center gap-2.5 lg:gap-[30px]">
                  <Image
                    src="/assets/png/cart-img.png"
                    alt="Cart Item"
                    width={60}
                    height={60}
                    quality={100}
                  />

                  <div className="flex flex-col gap-2.5 lg:gap-3">
                    <p className="leading-[100%] text-[#333333]">
                      {item?.product_variant?.color?.name}
                    </p>
                    x{item?.quantity}
                  </div>
                </div>

                <p className="pl-2.5 xl:pl-[30px] text-[#333333] text-end sm:text-start">
                  ₦{Number(item?.total_price).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="w-full space-y-4 lg:px-4">
          {checking.map((item, index) => (
            <div
              className="w-full grid grid-cols-[40%_1fr] lg:grid-cols-2 h-14 text-sm lg:text-base"
              key={index}
            >
              <div className="w-full h-14 bg-[#D6DDD6] pl-2 lg:pl-[30px] flex items-center font-bold">
                {item.title}
              </div>
              {isLoading ? (
                <div className="px-8">
                  <Skeleton height={45} />
                </div>
              ) : (
                <div
                  className={`w-full h-14 bg-[#F2F2F2] p-2 lg:pl-[30px] flex items-center ${
                    index === 3 ? "font-bold" : "font-medium"
                  }`}
                >
                  {item.value}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckProducts;
