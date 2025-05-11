"use client";

import { useRouter } from "next/router";
import Button from "../button";
import clsx from "clsx";

const Checkout = ({ count, total }: { count: number; total: number }) => {
  const router = useRouter();

  return (
    <div className="w-[560px] flex flex-col gap-[30px]">
      <div className="w-full space-y-4">
        <div className="w-full grid grid-cols-[40%_1fr] lg:grid-cols-2 h-14 text-sm lg:text-base">
          <div className="w-full h-14 bg-[#D6DDD6] pl-[30px] flex items-center font-bold">
            SUBTOTAL
          </div>
          <div className="w-full h-14 bg-[#F2F2F2] p-2 lg:pl-[30px] flex items-center font-medium">
            ₦{total?.toLocaleString("en-GB")}
          </div>
        </div>

        <div className="w-full grid grid-cols-[40%_1fr] lg:grid-cols-2 h-14 text-sm lg:text-base">
          <div className="w-full h-14 bg-[#D6DDD6] pl-[30px] flex items-center font-bold">
            TOTAL
          </div>
          <div className="w-full h-14 bg-[#F2F2F2] p-2 lg:pl-[30px] flex items-center font-medium">
            ₦{total?.toLocaleString("en-GB")}
          </div>
        </div>

        <div className="w-full grid grid-cols-[40%_1fr] lg:grid-cols-2 h-14 text-sm lg:text-base">
          <div className="w-full h-14 bg-[#D6DDD6] pl-[30px] flex items-center font-bold">
            📦 SHIPPING
          </div>
          <div className="w-full h-14 bg-[#F2F2F2] p-2 lg:pl-[30px] flex items-center font-medium">
            Calculated at checkout
          </div>
        </div>
      </div>

      <Button
        text="Proceed to checkout"
        type="button"
        handleClick={() => router.push("/checkout")}
        disabled={count < 1}
        className={clsx(
          "!rounded-none !text-sm !h-11 !py-0 flex items-center justify-center",
          count < 1
            ? "border border-[#333333] bg-white !text-[#333333] !cursor-not-allowed"
            : "bg-[#333333] text-white"
        )}
      />
    </div>
  );
};

export default Checkout;
