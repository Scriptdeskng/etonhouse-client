import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
// import { useGetOrderById } from "@/services/order.service";
import Confirm from "@/ui/confirmation/confirm";
import Shipping from "@/ui/confirmation/shipping";
import Steps from "@/ui/confirmation/steps";
import Summary from "@/ui/confirmation/summary";
import { useSearchParams } from "next/navigation";

const Confirmation = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  // const { data } = useGetOrderById(orderId);

  return (
    <Entrance>
      <Navbar active={10} />
      <div className="px-5 xl:px-20">
        <Confirm id={orderId} />
        <Shipping />
        <Summary />
        <Steps />
      </div>
      <Footer />
    </Entrance>
  );
};

export default Confirmation;
