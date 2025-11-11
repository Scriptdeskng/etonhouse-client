/* eslint-disable @next/next/no-img-element */
import { Product } from "@/types/product";
import ProductVariantSelector from "@/components/product/ProductVariant";
import Skeleton from "react-loading-skeleton";

interface Props {
  product?: Product | null;
  isLoading: boolean;
}

const DetailsInfo = ({ product, isLoading }: Props) => {
  if (isLoading || !product) {
    return (
      <div className="w-full p-5 xl:p-10">
        <Skeleton height={600} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <ProductVariantSelector product={product} isLoading={isLoading} />
    </div>
  );
};

export default DetailsInfo;