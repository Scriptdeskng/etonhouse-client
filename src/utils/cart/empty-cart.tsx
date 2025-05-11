import { FiShoppingCart } from "react-icons/fi";
import ButtonLink from "../button/button-link";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <FiShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Your cart is empty
      </h2>

      <p className="text-gray-500 mb-6">
        Looks like you haven’t added anything to your cart yet.
      </p>

      <ButtonLink
        text="Browse Shop"
        path="/shop"
        className="bg-[#333333] text-white !rounded-none !text-base !h-11 !py-0 flex items-center justify-center w-full sm:max-w-[280px]"
      />
    </div>
  );
};

export default EmptyCart;
