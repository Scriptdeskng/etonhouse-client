import { convertDate } from "@/helpers/convertDate";
import Skeleton from "react-loading-skeleton";

interface Props {
  data: any;
  isLoading: boolean;
}

const TrackTimeline = ({ data, isLoading }: Props) => {
  const timeline = [
    {
      id: 1,
      emoji: "✅",
      text: `Order Placed – ${convertDate(
        data?.created_at
      )} (Your order has been received.)`,
    },
    {
      id: 2,
      emoji: "✅",
      text: `Payment Confirmed – ${convertDate(
        data?.created_at
      )} (Your payment has been successfully processed.)`,
    },
    // {
    //   id: 3,
    //   emoji: "⏳",
    //   text: "Processing Order – Feb 6, 2025 (Your order is being prepared for shipping.)",
    // },
    // {
    //   id: 4,
    //   emoji: "🚚",
    //   text: "Shipped – Feb 8, 2025 (Your order is on the way!)",
    // },
    // {
    //   id: 5,
    //   emoji: "📍",
    //   text: "Out for Delivery – Feb 10, 2025 (Your order is near you!)",
    // },
    {
      id: 6,
      emoji: "📬",
      text: `Delivered – Estimated: ${convertDate(data?.estimated_delivery)}`,
    },
  ];

  return (
    <div className="lg:pt-10 lg:pb-8 space-y-[30px]">
      <div className="w-full h-14 bg-[#D6DDD6] flex items-center">
        <p className="pl-4 lg:pl-[30px] text-[#141414] lg:text-xl font-bold">
          ORDER STATUS TIMELINE
        </p>
      </div>

      <div className="pb-8 lg:border-b-[0.6px] border-[#61616133] w-full">
        {isLoading ? (
          <Skeleton width="100%" height={300} />
        ) : (
          timeline.map((item) => (
            <div key={item.id}>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-[#F4F4F4] text-sm">
                  {item.emoji}
                </div>

                <p className="text-sm md:text-base font-medium text-[#616161]">
                  {item.text}
                </p>
              </div>
              {item.id !== 6 && (
                <div className="ml-4.5 w-0.5 h-7 border border-dashed border-[#616161]" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrackTimeline;
