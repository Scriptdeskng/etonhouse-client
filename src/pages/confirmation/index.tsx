import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useGetOrderById } from "@/services/order.service";
import { useCartStore } from "@/store/cartStore";
import Confirm from "@/ui/confirmation/confirm";
import Shipping from "@/ui/confirmation/shipping";
import Steps from "@/ui/confirmation/steps";
import Summary from "@/ui/confirmation/summary";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Confirmation = () => {
  const { clearCart } = useCartStore();

  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { data, isLoading } = useGetOrderById(orderId);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <Entrance>
      <Navbar active={10} />
      <div className="px-5 xl:px-20">
        <Confirm isLoading={isLoading} data={data} />
        <Shipping isLoading={isLoading} data={data} />
        <Summary isLoading={isLoading} data={data} />
        <Steps id={orderId} />
      </div>
      <Footer />
    </Entrance>
  );
};

export default Confirmation;
