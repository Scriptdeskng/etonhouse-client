import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Protected from "@/components/protected";
import Confirm from "@/ui/confirmation/confirm";
import Shipping from "@/ui/confirmation/shipping";
import Steps from "@/ui/confirmation/steps";
import Summary from "@/ui/confirmation/summary";
import { useSearchParams } from "next/navigation";

const Confirmation = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <Protected redirect="/cart">
      <Entrance>
        <Navbar active={10} />
        <div className="px-5 xl:px-20">
          <Confirm  id={orderId} />
          <Shipping />
          <Summary />
          <Steps />
        </div>
        <Footer />
      </Entrance>
    </Protected>
  );
};

export default Confirmation;
