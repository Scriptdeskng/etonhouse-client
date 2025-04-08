import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Breadcrumbs from "@/utils/breadcrumbs";
import CartItems from "@/utils/cart/cart-items";
import { FaCircleInfo } from "react-icons/fa6";

const Cart = () => {
  return (
    <div>
      <Navbar />
      <div className="px-20">
        <div className="flex items-center justify-between py-6 border-b-[0.6px] border-[#141414CC]">
          <Breadcrumbs
            history={[{ name: "Home", path: "/" }, { name: "Cart" }]}
          />

          <div className="flex gap-2 items-center text-[#8D8F08]">
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
