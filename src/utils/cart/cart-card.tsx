import CartQuantity from "../quantity/cart-quantity";
import Image from "next/image";
import { FaTrash } from "react-icons/fa6";

const CartCard = ({
  product,
  disabled,
  handleRemove,
  handleQuantity,
}: {
  product: any;
  disabled?: boolean;
  handleRemove?: (id: number) => void;
  handleQuantity: (id: number, value: number) => void;
}) => {
  return (
    <div className="w-full p-4 lg:p-0 lg:h-[105px] grid grid-cols-1 gap-5 lg:gap-0 lg:grid-cols-[400px_120px_120px_230px] items-center justify-between border-[0.4px] border-[#6161614D]">
      <div className="flex items-center gap-2.5 lg:gap-[30px] lg:pl-[30px]">
        <Image
          src="/assets/png/cart-img.png"
          alt="Cart Item"
          width={60}
          height={60}
          quality={100}
        />

        <div className="flex flex-col gap-2.5 lg:gap-5">
          <p className="md:text-xl leading-[100%] font-medium text-[#333333] capitalize">
            {product?.product_variant?.color?.name}
          </p>

          {!disabled && (
            <div
              role="button"
              onClick={() => {
                if (handleRemove) {
                  handleRemove(product?.id);
                }
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
          ₦{Number(product?.total_price / product?.quantity).toLocaleString()}
        </p>
      </div>

      <div className="w-full flex items-center justify-between lg:justify-start">
        <p className="text-sm md:text-lg text-[#141414] lg:hidden">Quantity:</p>
        {!disabled ? (
          <CartQuantity
            count={product?.quantity}
            handleQuantity={(value: number) =>
              handleQuantity(product?.id, value)
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
          ₦{Number(product?.total_price).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CartCard;
