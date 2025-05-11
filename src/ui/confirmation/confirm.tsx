const Confirm = ({ id }: { id: string | null }) => {
  return (
    <div className="lg:pt-10 lg:pb-8 space-y-[30px]">
      <div className="w-full h-21 bg-[#D6DDD6] flex items-center">
        <p className="pl-4 lg:pl-[30px] text-[#141414] text-2xl lg:text-[32px] font-bold">
          ✅ Order Confirmed!
        </p>
      </div>

      <div className="space-y-5 pb-8 lg:border-b-[0.6px] border-[#61616133]">
        <p className="lg:text-lg font-medium text-[#333333]">
          Thank you for your purchase! Your order has been successfully placed.
        </p>
        <p className="lg:text-lg font-medium text-[#333333]">
          📦 Order Number: {id ?? "-"}
        </p>
        <p className="lg:text-lg font-medium text-[#333333]">
          📅 Order Date: February 5, 2025
        </p>
      </div>
    </div>
  );
};

export default Confirm;
