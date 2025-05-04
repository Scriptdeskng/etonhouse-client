import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Protected from "@/components/protected";
import CheckInfo from "@/ui/checkout/check-info";
import CheckTitle from "@/ui/checkout/check-title";

const Checkout = () => {
  return (
    <Protected redirect="checkout">
      <Entrance>
        <Navbar active={10} />
        <div className="px-5 xl:px-20 border-t lg:border-t-0 border-[#14141499]">
          <CheckTitle />
          <CheckInfo />
        </div>
        <Footer />
      </Entrance>
    </Protected>
  );
};

export default Checkout;
