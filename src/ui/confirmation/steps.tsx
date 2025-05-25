import ButtonLink from "@/utils/button/button-link";

interface Props {
  id: string | null;
}

const Steps = ({ id }: Props) => {
  return (
    <div className="pt-10 pb-24 space-y-[30px]">
      <div className="w-full h-14 bg-[#D6DDD6] flex items-center">
        <p className="pl-4 lg:pl-[30px] text-[#141414] lg:text-xl font-bold">
          NEXT STEPS
        </p>
      </div>

      <div className="space-y-5">
        <p className="text-sm lg:text-base font-medium text-[#333333]">
          ✅ You&apos;ll receive an order confirmation email shortly.
        </p>
        <p className="text-sm lg:text-base font-medium text-[#333333]">
          ✅ Track your order status in your account
        </p>
        <p className="text-sm lg:text-base font-medium text-[#333333]">
          ✅ Need assistance? Contact our support team
        </p>
      </div>

      <div className="max-w-[700px] grid grid-cols-2 gap-4">
        <ButtonLink
          text="Track my order"
          path={`/track?orderId=${id}`}
          className="text-white !rounded-none !text-sm !h-11 !py-0 flex items-center justify-center"
        />

        <ButtonLink
          text="Continue shopping"
          path="/shop"
          className="!border !border-[#333333] !bg-transparent !text-[#333333] !rounded-none !text-sm !h-11 !py-0 flex items-center justify-center"
        />
      </div>
    </div>
  );
};

export default Steps;
