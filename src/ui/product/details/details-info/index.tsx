import { TriggerIcon } from "@/components/category";
import { Product } from "@/pages/product/[id]";
import Button from "@/utils/button";
import Quantity from "@/utils/quantity";
import Image from "next/image";
import { useState } from "react";
import DetailsImg from "../details-img";
import Dimensions from "@/components/modal/dimensions";
import Galleria from "@/components/modal/galleria";
import Skeleton from "react-loading-skeleton";
import { useAddToCart } from "@/services/cart.service";

interface Props {
  product: Product;
  isLoading: boolean;
}

const DetailsInfo = ({ product, isLoading }: Props) => {
  const [count, setCount] = useState(1);
  const mutation = useAddToCart();

  function handleAdd() {
    mutation.mutate({
      variant_id: product?.variants?.[0]?.id,
      quantity: count,
    });
  }

  // modals
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  return (
    <>
      <div className="grid lg:grid-cols-2 w-full">
        <div className="p-5 xl:p-10 w-full h-[350px] sm:h-[400px] lg:h-full border-r border-black">
          <div className="w-full relative h-full">
            {isLoading ? (
              <Skeleton className="h-[500px]" />
            ) : (
              <Image
                src={product?.images?.[0]}
                alt="Product"
                fill
                quality={100}
                className="object-contain"
              />
            )}
          </div>
        </div>

        <div className="flex lg:hidden w-full border-t border-[#14141499]">
          {isLoading ? (
            <Skeleton className="h-[250px]" />
          ) : (
            <DetailsImg images={product?.images} />
          )}
        </div>

        <div className="w-full px-5 lg:py-10 xl:p-10 pb-0 flex flex-col gap-4">
          <p className="text-xl leading-[100%] text-[#333333] font-bold">
            {isLoading ? <Skeleton width={240} /> : product?.name}
          </p>

          <p className="text-2xl sm:text-3xl xl:text-[40px] text-[#333333] font-bold">
            {isLoading ? <Skeleton width={200} /> : `₦${product?.price}`}
          </p>

          {product?.colors?.length >= 1 && (
            <div className="flex gap-5 items-center mb-6">
              {product?.colors?.map((color) => (
                <div
                  className="w-[30px] h-[30px]"
                  style={{ backgroundColor: color }}
                  key={color}
                />
              ))}
            </div>
          )}

          {isLoading ? (
            <Skeleton height={56} width={180} />
          ) : (
            <Quantity count={count} setCount={setCount} />
          )}

          {isLoading ? (
            <Skeleton className="w-full h-[46px]" />
          ) : (
            <div className="mt-6 w-full grid grid-cols-2 gap-3.5">
              <Button
                text="Buy now"
                className="h-[46px] rounded-none !py-0 !text-base !bg-white !text-black border border-black"
              />

              <Button
                text="Add to Cart"
                className="h-[46px] rounded-none !py-0 !text-base"
                handleClick={handleAdd}
              />
            </div>
          )}

          <div className="mt-[14px] py-[30px] border-y-[0.5px] border-[#00000066]">
            <p className="text-[#616161]">
              {isLoading ? (
                <Skeleton className="w-full h-[40px]" />
              ) : (
                product?.description
              )}
            </p>
          </div>

          <div>
            <button
              className="w-full pb-5 pr-3 group border-b-[0.5px] border-[#00000066]"
              onClick={() => setOpen(true)}
            >
              <div className="w-full flex items-center justify-between cursor-pointer">
                <h2 className="text-lg text-black">Dimensions</h2>

                <TriggerIcon
                  size={20}
                  open="group-open:hidden"
                  close="group-open:block"
                />
              </div>
            </button>

            <button
              className="w-full py-5 pr-3 group border-b-[0.5px] border-[#00000066]"
              onClick={() => setView(true)}
            >
              <div className="w-full flex items-center justify-between cursor-pointer">
                <h2 className="text-lg text-black">Gallery</h2>

                <TriggerIcon
                  size={20}
                  open="group-open:hidden"
                  close="group-open:block"
                />
              </div>
            </button>

            <button className="w-full py-5 pr-3 group border-b-[0.5px] border-[#00000066]">
              <div className="w-full flex items-center justify-between cursor-pointer">
                <h2 className="text-lg text-black">Care</h2>

                <TriggerIcon
                  size={20}
                  open="group-open:hidden"
                  close="group-open:block"
                />
              </div>
            </button>

            <button className="w-full py-5 pr-3 group border-b-[0.5px] border-[#00000066]">
              <div className="w-full flex items-center justify-between cursor-pointer">
                <h2 className="text-lg text-black">Sustainability</h2>

                <TriggerIcon
                  size={20}
                  open="group-open:hidden"
                  close="group-open:block"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <Dimensions open={open} handleClose={() => setOpen(false)} />
      <Galleria open={view} handleClose={() => setView(false)} />
    </>
  );
};

export default DetailsInfo;
