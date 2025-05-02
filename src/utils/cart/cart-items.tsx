import {
  useDeleteCartItem,
  useGetCartItems,
  useUpdateCartItem,
} from "@/services/cart.service";
import CartCard from "./cart-card";
import CartCoupon from "./cart-coupon";
import Checkout from "./checkout";
import Skeleton from "react-loading-skeleton";

const CartItems = () => {
  const { data, isLoading, refetch } = useGetCartItems();
  const remove = useDeleteCartItem(refetch);
  const update = useUpdateCartItem(refetch);

  function handleRemove(id: number) {
    remove.mutate(id);
  }

  function handleQuantity(id: number, value: number) {
    update.mutate({ id, data: { quantity: value } });
  }

  return (
    <div className="pt-4 pb-24 space-y-[30px]">
      <div className="w-full h-14 hidden lg:grid grid-cols-[400px_120px_120px_230px] justify-between bg-[#D6DDD6]">
        <div className="w-full flex items-center pl-[30px] text-[#141414] font-bold">
          PRODUCT
        </div>
        <div className="w-full flex items-center text-[#141414] font-bold">
          PRICE
        </div>
        <div className="w-full flex items-center text-[#141414] font-bold">
          QUANTITY
        </div>
        <div className="w-full flex items-center text-[#141414] font-bold">
          SUBTOTAL
        </div>
      </div>

      <div className="lg:space-y-[14px]">
        {isLoading ? (
          <Skeleton className="w-full h-20" height={200} count={2} />
        ) : (
          data?.items?.map((item: any) => (
            <CartCard
              product={item}
              key={item?.id}
              handleRemove={handleRemove}
              handleQuantity={handleQuantity}
            />
          ))
        )}
      </div>

      <div className="w-full flex items-center justify-center md:hidden">
        <CartCoupon placeholder="Coupon Code" />
      </div>

      <div className="w-full flex items-center justify-between">
        <p className="md:text-xl text-[#333333] font-medium">
          🛒 Total: ₦{}
          {isLoading ? (
            <Skeleton width={150} className="ml-1" />
          ) : (
            Number(data?.total).toLocaleString()
          )}
        </p>

        <p className="hidden md:inline text-xl text-black font-medium">
          💳 Got a discount code?
        </p>
      </div>

      <div className="w-full flex items-start gap-2 justify-between">
        {isLoading ? (
          <Skeleton width={300} height={250} />
        ) : (
          <Checkout total={data?.total} />
        )}

        <div className="hidden md:inline">
          <CartCoupon />
        </div>
      </div>
    </div>
  );
};

export default CartItems;
