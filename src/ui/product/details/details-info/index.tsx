/* eslint-disable @next/next/no-img-element */
import { TriggerIcon } from "@/components/category";
import { Product } from "@/pages/product/[id]";
import Button from "@/utils/button";
import Quantity from "@/utils/quantity";
import { useState } from "react";
import DetailsImg from "../details-img";

interface Props {
  product: Product;
}

const DetailsInfo = ({ product }: Props) => {
  const [count, setCount] = useState(1);

  return (
    <>
      <div className="grid lg:grid-cols-2 w-full">
        <div className="p-5 xl:p-10 w-full h-[350px] sm:h-[400px] lg:h-full border-r border-black">
          <div className="w-full relative h-full">
            {isLoading ? (
              <Skeleton className="h-[500px]" />
            ) : (
              <img
                src={product?.images?.[0]}
                alt="Product"
                loading="eager"
                className="object-contain"
              />
            )}
          </div>
        </div>

      <div className="flex lg:hidden w-full border-t border-[#14141499]">
        <DetailsImg images={product.images} />
      </div>

      <div className="w-full px-5 lg:py-10 xl:p-10 pb-0 flex flex-col gap-4">
        <p className="text-xl leading-[100%] text-[#333333] font-bold">
          {product.name}
        </p>

        <p className="text-2xl sm:text-3xl xl:text-[40px] text-[#333333] font-bold">
          ₦{product.price}
        </p>

        {product.colors.length >= 1 && (
          <div className="flex gap-5 items-center mb-6">
            {product.colors.map((color) => (
              <div
                className="w-[30px] h-[30px]"
                style={{ backgroundColor: color }}
                key={color}
              />
            ))}
          </div>
        )}

        <Quantity count={count} setCount={setCount} />

        <div className="mt-6 w-full grid grid-cols-2 gap-3.5">
          <Button
            text="Buy now"
            className="h-[46px] rounded-none !py-0 !text-base !bg-white !text-black border border-black"
          />

          <Button
            text="Add to Cart"
            className="h-[46px] rounded-none !py-0 !text-base"
          />
        </div>

        <div className="mt-[14px] py-[30px] border-y-[0.5px] border-[#00000066]">
          <p className="text-[#616161]">{product.description}</p>
        </div>

        <div>
          <details className="w-full pb-5 pr-3 group border-b-[0.5px] border-[#00000066]">
            <summary className="w-full flex items-center justify-between cursor-pointer">
              <h2 className="text-lg text-black">Dimensions</h2>

              <TriggerIcon
                size={20}
                open="group-open:hidden"
                close="group-open:block"
              />
            </summary>
          </details>

          <details className="w-full py-5 pr-3 group border-b-[0.5px] border-[#00000066]">
            <summary className="w-full flex items-center justify-between cursor-pointer">
              <h2 className="text-lg text-black">Gallery</h2>

              <TriggerIcon
                size={20}
                open="group-open:hidden"
                close="group-open:block"
              />
            </summary>
          </details>

          <details className="w-full py-5 pr-3 group border-b-[0.5px] border-[#00000066]">
            <summary className="w-full flex items-center justify-between cursor-pointer">
              <h2 className="text-lg text-black">Care</h2>

              <TriggerIcon
                size={20}
                open="group-open:hidden"
                close="group-open:block"
              />
            </summary>
          </details>

          <details className="w-full py-5 pr-3 group border-b-[0.5px] border-[#00000066]">
            <summary className="w-full flex items-center justify-between cursor-pointer">
              <h2 className="text-lg text-black">Sustainability</h2>

              <TriggerIcon
                size={20}
                open="group-open:hidden"
                close="group-open:block"
              />
            </summary>
          </details>
        </div>
      </div>
    </div>
  );
};

export default DetailsInfo;
