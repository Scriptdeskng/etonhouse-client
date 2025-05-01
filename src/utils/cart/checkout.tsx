import ButtonLink from "../button/button-link";

const Checkout = ({ total }: { total: number }) => {
  return (
    <div className="w-[560px] flex flex-col gap-[30px]">
      <div className="w-full space-y-4">
        <div className="w-full grid grid-cols-[40%_1fr] lg:grid-cols-2 h-14 text-sm lg:text-base">
          <div className="w-full h-14 bg-[#D6DDD6] pl-[30px] flex items-center font-bold">
            SUBTOTAL
          </div>
          <div className="w-full h-14 bg-[#F2F2F2] p-2 lg:pl-[30px] flex items-center font-medium">
            ₦{total?.toLocaleString()}
          </div>
        </div>

        <div className="w-full grid grid-cols-[40%_1fr] lg:grid-cols-2 h-14 text-sm lg:text-base">
          <div className="w-full h-14 bg-[#D6DDD6] pl-[30px] flex items-center font-bold">
            TOTAL
          </div>
          <div className="w-full h-14 bg-[#F2F2F2] p-2 lg:pl-[30px] flex items-center font-medium">
            ₦{total?.toLocaleString()}
          </div>
        </div>

        <div className="w-full grid grid-cols-[40%_1fr] lg:grid-cols-2 h-14 text-sm lg:text-base">
          <div className="w-full h-14 bg-[#D6DDD6] pl-[30px] flex items-center font-bold">
            📦 SHIPPING
          </div>
          <div className="w-full h-14 bg-[#F2F2F2] p-2 lg:pl-[30px] flex items-center font-medium">
            Calculated at checkout
          </div>
        </div>
      </div>

      <ButtonLink
        text="Proceed to checkout"
        path="/checkout"
        className="bg-[#333333] text-white !rounded-none !text-sm !h-11 !py-0 flex items-center justify-center"
      />
    </div>
  );
};

export default Checkout;
