import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Breadcrumbs from "@/utils/breadcrumbs";
import CartItems from "@/utils/cart/cart-items";
import { FaCircleInfo } from "react-icons/fa6";

const Cart = () => {
  return (
    <div>
      <Navbar />
      <div className="px-5 xl:px-20 border-t lg:border-t-0 border-[#14141499]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between py-6 lg:border-b-[0.6px] border-[#141414CC]">
          <p className="text-xl font-medium text-black lg:hidden">Cart</p>

          <Breadcrumbs
            history={[{ name: "Home", path: "/" }, { name: "Cart" }]}
          />

          <div className="hidden lg:flex gap-2 items-center text-[#8D8F08]">
            <FaCircleInfo size={16} />
            <p>Review your items before checkout!</p>
          </div>
        </div>

        <CartItems />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
