/* eslint-disable @next/next/no-img-element */
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

const CheckProducts = () => {
  const { cart, packages, getCombinedTotalPrice } = useCartStore();

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const value = getCombinedTotalPrice();
    setTotal(value);
  }, [cart, packages, getCombinedTotalPrice]);

  const checking = [
    {
      title: "SUBTOTAL",
      value: `₦${Number(total).toLocaleString("en-GB")}`,
    },
    {
      title: "📦 SHIPPING",
      value: "",
    },
    {
      title: "🎁 DISCOUNT APPLIED",
      value: packages?.length > 0 ? `₦${packages.reduce((sum, pkg) => sum + pkg.savedAmount, 0).toLocaleString("en-GB")}` : "None",
    },
    {
      title: "TOTAL",
      value: `₦${Number(total).toLocaleString("en-GB")}`,
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
          {packages?.map((pkg: any) => (
            <div
              className="w-full grid grid-cols-[65%_1fr] gap-1 border-b-[0.6px] border-[#61616133] pt-4 pb-2.5 md:border-none lg:p-0"
              key={`package-${pkg.id}`}
            >
              <div className="md:pl-2 lg:pl-4 flex flex-col md:flex-row lg:items-center gap-2.5 lg:gap-[30px]">
                <img
                  src={pkg?.image}
                  alt={pkg?.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />

                <div className="flex flex-col gap-2.5 lg:gap-3">
                  <p className="leading-[100%] text-[#333333] font-medium">
                    {pkg?.name}
                  </p>

                  <div className="text-xs text-[#666666]">
                    {pkg?.items?.length} items included
                  </div>
                </div>
              </div>

              <p className="pl-2.5 xl:pl-[30px] text-[#333333] text-end sm:text-start font-medium">
                ₦{Number(pkg?.discountedPrice).toLocaleString()}
              </p>
            </div>
          ))}

          {cart?.map((item: any) => (
            <div
              className="w-full grid grid-cols-[65%_1fr] gap-1 border-b-[0.6px] border-[#61616133] pt-4 pb-2.5 md:border-none lg:p-0"
              key={`item-${item.id}`}
            >
              <div className="md:pl-2 lg:pl-4 flex flex-col md:flex-row lg:items-center gap-2.5 lg:gap-[30px]">
                <img
                  src={item?.image}
                  alt={item?.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />

                <div className="flex flex-col gap-2.5 lg:gap-3">
                  <p className="leading-[100%] text-[#333333] font-medium">
                    {item?.name}
                  </p>
                  x{item?.quantity}
                </div>
              </div>

              <p className="pl-2.5 xl:pl-[30px] text-[#333333] text-end sm:text-start">
                ₦{Number(item?.price * item?.quantity).toLocaleString()}
              </p>
            </div>
          ))}
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
              {
                <div
                  className={`w-full h-14 bg-[#F2F2F2] p-2 lg:pl-[30px] flex items-center ${index === 3 ? "font-bold" : "font-medium"
                    }`}
                >
                  {item.value}
                </div>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckProducts;