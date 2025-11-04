import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useGetOrderById } from "@/services/order.service";
import TrackHeader from "@/ui/tracking/track-header";
import TrackSummary from "@/ui/tracking/track-summary";
import TrackTimeline from "@/ui/tracking/track-timeline";
import { useSearchParams } from "next/navigation";

const Track = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { data, isLoading } = useGetOrderById(orderId);

  return (
    <Entrance>
      <Navbar active={10} />
      <div className="px-5 xl:px-20">
        <TrackHeader data={data} isLoading={isLoading} />
        <TrackTimeline data={data} isLoading={isLoading} />
        <TrackSummary isLoading={isLoading} data={data} />
      </div>
      <Footer />
    </Entrance>
  );
};

export default Track;
