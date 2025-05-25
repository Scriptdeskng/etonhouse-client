import { convertDate } from "@/helpers/convertDate";
import Skeleton from "react-loading-skeleton";

interface Props {
  data: any;
  isLoading: boolean;
}

const TrackHeader = ({ data, isLoading }: Props) => {
  return (
    <div className="lg:pt-10 lg:pb-8 space-y-[30px]">
      <div className="w-full h-21 bg-[#D6DDD6] flex items-center">
        <p className="pl-4 lg:pl-[30px] text-[#141414] text-2xl lg:text-[32px] font-bold">
          🚚 Track Your Order
        </p>
      </div>

      <div className="space-y-5 pb-8 lg:border-b-[0.6px] lg:border-[#61616133]">
        <p className="lg:text-lg font-medium text-[#333333]">
          📦 Order Number:{" "}
          {isLoading ? (
            <Skeleton width={150} height={30} />
          ) : (
            data?.order_number
          )}
        </p>

        <p className="lg:text-lg font-medium text-[#333333]">
          📅 Order Date:{" "}
          {isLoading ? (
            <Skeleton width={150} height={30} />
          ) : (
            convertDate(data?.created_at)
          )}
        </p>

        <p className="lg:text-lg font-medium text-[#333333]">
          💳 Payment Status:{" "}
          {isLoading ? <Skeleton width={150} height={30} /> : "✅ Paid"}
        </p>

        <p className="lg:text-lg font-medium text-[#333333]">
          📍 Shipping Address
        </p>

        <p className="lg:text-lg text-[#333333]">
          {isLoading ? (
            <Skeleton width={150} height={30} />
          ) : (
            `${data?.shipping_address?.first_name} ${data?.shipping_address?.last_name}`
          )}
        </p>

        <p className="lg:text-lg text-[#333333]">
          {isLoading ? (
            <Skeleton width={150} height={30} />
          ) : (
            `${data?.shipping_address?.address_line1}, ${data?.shipping_address?.city} ${data?.shipping_address?.state} ${data?.shipping_address?.postal_code}`
          )}
        </p>

        <p className="lg:text-lg font-medium text-[#333333]">
          📞{" "}
          {isLoading ? (
            <Skeleton width={150} height={30} />
          ) : (
            data?.shipping_address?.phone
          )}
        </p>
      </div>
    </div>
  );
};

export default TrackHeader;
