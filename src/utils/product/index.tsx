/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductVariantSelector from "@/components/product/ProductVariant";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  if (!product) {
    return null;
  }

  const [showModal, setShowModal] = useState(false);


  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const featuredImage = product.images.find(img => img.is_featured)?.image || product.images[0]?.image;

  return (
    <>
      <div className="shrink-0 w-full max-w-[300px] xl:max-w-full max-h-[386px] rounded-[20px] grid grid-rows-2 mx-auto xl:mx-0 bg-white">
        <Link href={`/product/${product.slug}`} className="rounded-t-[20px] relative">
          <img
            src={featuredImage}
            alt={product.name}
            className="py-5 h-[250px] w-full object-cover rounded-t-[20px]"
            loading="eager"
          />
        </Link>

        <div className="max-h-[180px] px-2 pt-11 flex flex-col rounded-b-[20px]">
          <div className="flex flex-col gap-1.5 items-start">
            <p className="text-grey-200 capitalize">{product.category?.name}</p>

            <Link
              href={`/product/${product.slug}`}
              className="font-semibold text-xl text-black capitalize whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {product.name}
            </Link>

            <Image
              src="/assets/svg/star.svg"
              alt="stars"
              width={104}
              height={18}
              quality={100}
            />
          </div>

          <div className="w-full flex items-center justify-between mt-5">
            <p className="text-black font-semibold text-lg">₦{product.price_range}</p>

            <button className="cursor-pointer" onClick={handleAddClick}>
              <Image
                src="/assets/svg/cart-plus.svg"
                alt="add to cart"
                width={28}
                height={28}
                quality={100}
              />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <ProductVariantSelector
          product={product}
          isModal={true}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProductCard;