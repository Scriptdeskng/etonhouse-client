/* eslint-disable @next/next/no-img-element */

const CheckoutCard = ({ product }: { product?: any }) => {
  return (
    <div className="w-full p-4 lg:p-0 lg:h-[105px] grid grid-cols-1 gap-5 lg:gap-0 lg:grid-cols-[400px_120px_120px_230px] items-center justify-between border-[0.4px] border-[#6161614D]">
      <div className="flex items-center gap-2.5 lg:gap-[30px] lg:pl-[30px]">
        <img
          src={product?.product_variant?.product?.featured_image}
          alt={product?.product_name}
          width={80}
          height={80}
          className="object-contain"
        />

        <div className="flex flex-col gap-2.5 lg:gap-5">
          <p className="md:text-xl leading-[100%] font-medium text-[#333333] capitalize">
            {product?.product_name}
          </p>

          <p className="text-xs md:text-base leading-[100%] font-medium text-gray-500 capitalize">
            Color: {product?.product_variant?.color?.name}
          </p>
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

        <p className="text-sm md:text-lg font-medium text-[#333333]">
          {product?.quantity}
        </p>
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

export default CheckoutCard;
