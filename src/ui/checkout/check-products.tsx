import Image from "next/image";

const CheckProducts = () => {
  const checking = [
    { title: "SUBTOTAL", value: "₦310,000" },
    {
      title: "📦 SHIPPING",
      value: "Enter your address to view shipping options.",
    },
    {
      title: "🎁 DISCOUNT APPLIED",
      value: " -₦10,000 (Promo Code: WELCOME10)",
    },
    { title: "TOTAL", value: "₦310,000" },
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
          {Array(4)
            .fill({})
            .map((_, index) => (
              <div
                className="w-full grid grid-cols-[65%_1fr] gap-1 border-b-[0.6px] border-[#61616133] pt-4 pb-2.5 md:border-none lg:p-0"
                key={index}
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
                      🛋️ Modern Oak Dining Table
                    </p>
                    x1
                  </div>
                </div>

                <p className="pl-2.5 xl:pl-[30px] text-[#333333] text-end sm:text-start">
                  ₦150,000
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
              <div
                className={`w-full h-14 bg-[#F2F2F2] p-2 lg:pl-[30px] flex items-center ${
                  index === 3 ? "font-bold" : "font-medium"
                }`}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckProducts;
