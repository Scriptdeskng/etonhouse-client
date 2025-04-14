import Breadcrumbs from "@/utils/breadcrumbs";
import { FaCircleInfo } from "react-icons/fa6";

const CheckTitle = () => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between py-4 md:py-6 lg:border-b-[0.6px] border-[#141414CC]">
      <p className="text-xl font-medium text-black lg:hidden">Checkout</p>

      <Breadcrumbs
        history={[{ name: "Cart", path: "/cart" }, { name: "Checkout" }]}
      />

      <div className="flex gap-2 items-start text-sm md:text-base md:items-center text-[#8D8F08]">
        <FaCircleInfo size={16} />
        <p>
          You&apos;re just a step away from your dream home. Complete your order
          now!
        </p>
      </div>
    </div>
  );
};

export default CheckTitle;
