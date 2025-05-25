import CheckoutCard from "@/utils/cart/checkout-card";
import Skeleton from "react-loading-skeleton";

interface Props {
  data: any;
  isLoading: boolean;
}

const Summary = ({ data, isLoading }: Props) => {
  return (
    <div className="lg:pt-10 lg:pb-8 space-y-[30px] lg:border-b-[0.6px] border-[#61616133]">
      <div className="w-full h-14 bg-[#D6DDD6] flex items-center">
        <p className="pl-4 lg:pl-[30px] text-[#141414] lg:text-xl font-bold">
          ORDER SUMMARY
        </p>
      </div>

      <div className="w-full space-y-5">
        {isLoading ? (
          <Skeleton width="100%" height={200} className="mb-5" />
        ) : (
          data?.items.map((item: any) => (
            <CheckoutCard product={item} key={item?.id} />
          ))
        )}

        <p className="lg:text-lg font-medium text-[#333333]">
          🔹 Subtotal: ₦{" "}
          {isLoading ? (
            <Skeleton width={150} height={30} />
          ) : (
            Number(data?.subtotal).toLocaleString()
          )}
        </p>

        <p className="lg:text-lg font-medium text-[#333333]">
          🚚 Shipping Fee: ₦
          {isLoading ? (
            <Skeleton width={150} height={30} />
          ) : (
            Number(data?.shipping_fee).toLocaleString()
          )}
        </p>

        <p className="lg:text-lg font-medium text-[#333333]">
          💳 Tax: ₦
          {isLoading ? (
            <Skeleton width={150} height={30} />
          ) : (
            Number(data?.tax).toLocaleString()
          )}
        </p>

        <p className="lg:text-lg font-medium text-[#333333]">
          💰 Total Amount Paid: ₦
          {isLoading ? (
            <Skeleton width={150} height={30} />
          ) : (
            Number(data?.total).toLocaleString()
          )}
        </p>

        <p className="lg:text-lg font-medium text-[#333333] capitalize">
          🛒 Payment Method:{" "}
          {isLoading ? (
            <Skeleton width={150} height={30} />
          ) : (
            data?.payment_method
          )}
        </p>
      </div>
    </div>
  );
};

export default Summary;
