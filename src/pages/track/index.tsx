import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import TrackHeader from "@/ui/tracking/track-header";
import TrackSummary from "@/ui/tracking/track-summary";
import TrackTimeline from "@/ui/tracking/track-timeline";

const Track = () => {
  return (
    <Entrance>
      <Navbar active={10} />
      <div className="px-5 xl:px-20">
        <TrackHeader />
        <TrackTimeline />
        <TrackSummary />
      </div>
      <Footer />
    </Entrance>
  );
};

export default Track;
