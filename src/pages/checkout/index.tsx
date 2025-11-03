import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import CheckInfo from "@/ui/checkout/check-info";
import CheckTitle from "@/ui/checkout/check-title";

const Checkout = () => {
  return (
    <Entrance>
      <Navbar active={10} />
      <div className="px-5 xl:px-20 max-w-[1536px] mx-auto">
        <CheckTitle />
        <CheckInfo />
      </div>
      <Footer />
    </Entrance>
  );
};

export default Checkout;
