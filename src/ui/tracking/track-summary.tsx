import ButtonLink from "@/utils/button/button-link";
import CheckoutCard from "@/utils/cart/checkout-card";
import Skeleton from "react-loading-skeleton";

interface Props {
  data: any;
  isLoading: boolean;
}

const TrackSummary = ({ data, isLoading }: Props) => {
  return (
    <div className="lg:pt-10 pb-24 space-y-[30px]">
      <div className="w-full h-14 bg-[#D6DDD6] flex items-center">
        <p className="pl-4 lg:pl-[30px] text-[#141414] lg:text-xl font-bold">
          ORDER SUMMARY
        </p>
      </div>

      <div className="space-y-5 lg:pb-8 lg:border-b-[0.6px] border-[#61616133]">
        {isLoading ? (
          <Skeleton width="100%" height={200} className="mb-5" />
        ) : (
          data?.items.map((item: any) => (
            <CheckoutCard product={item} key={item?.id} />
          ))
        )}

        <p className="lg:text-lg font-medium text-[#333333]">
          💰 Total Amount Paid: ₦
          {isLoading ? (
            <Skeleton width={150} height={30} />
          ) : (
            Number(data?.total).toLocaleString()
          )}
        </p>
      </div>

      <p className="lg:text-lg font-medium text-[#333333] lg:pb-10">
        📌 Your order is currently in transit.
      </p>

      <ButtonLink
        text="Continue shopping"
        path="/"
        className="bg-[#333333] text-white !rounded-none !text-sm !h-11 !py-0 flex items-center justify-center max-w-[700px]"
      />
    </div>
  );
};

export default TrackSummary;
