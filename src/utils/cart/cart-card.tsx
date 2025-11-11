/* eslint-disable @next/next/no-img-element */
import { useCartStore } from "@/store/cartStore";
import CartQuantity from "../quantity/cart-quantity";
import { FaTrash } from "react-icons/fa6";

const CartCard = ({
  product,
  disabled,
}: {
  product?: any;
  disabled?: boolean;
}) => {
  const { removeCartItem, updateCartItem } = useCartStore();
  return (
    <div className="w-full p-4 lg:p-0 lg:h-[105px] grid grid-cols-1 gap-5 lg:gap-0 lg:grid-cols-[400px_120px_120px_230px] items-center justify-between border-[0.4px] border-[#6161614D]">
      <div className="flex items-center gap-2.5 lg:gap-[30px] lg:pl-[30px]">
        <img
          src={product?.image}
          alt={product?.slug}
          width={80}
          height={80}
          className="object-contain"
        />

        <div className="flex flex-col gap-2.5 lg:gap-5">
          <p className="xl:text-lg leading-[100%] font-medium text-[#333333] capitalize">
            {product?.name}
          </p>

          {!disabled && (
            <div
              role="button"
              onClick={() => {
                removeCartItem(product?.id);
              }}
              className="flex items-center gap-2.5 cursor-pointer text-[#616161]"
            >
              <FaTrash size={16} />
              <p className="text-sm">REMOVE</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex items-center justify-between lg:justify-start">
        <p className="text-sm md:text-lg text-[#141414] lg:hidden">Price:</p>
        <p className="text-sm md:text-lg font-medium text-[#333333]">
          ₦{Number(product?.price).toLocaleString()}
        </p>
      </div>

      <div className="w-full flex items-center justify-between lg:justify-start">
        <p className="text-sm md:text-lg text-[#141414] lg:hidden">Quantity:</p>
        {!disabled ? (
          <CartQuantity
            count={product?.quantity}
            handleQuantity={(value: number) =>
              updateCartItem(product?.id, value)
            }
          />
        ) : (
          <p className="text-sm md:text-lg font-medium text-[#333333]">
            {product?.quantity}
          </p>
        )}
      </div>

      <div className="w-full flex items-center justify-between lg:justify-start">
        <p className="text-sm md:text-lg text-[#141414] lg:hidden">Subtotal:</p>
        <p className="text-sm md:text-lg font-bold text-[#333333]">
          ₦{Number(product?.price * product?.quantity).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CartCard;
