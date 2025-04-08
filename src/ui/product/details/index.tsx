import { Product } from "@/pages/product/[id]";
import DetailsImg from "./details-img";
import DetailsInfo from "./details-info";

interface Props {
  product: Product;
}

const Details = ({ product }: Props) => {
  return (
    <div className="w-full border-y border-black grid grid-cols-[140px_1fr] pb-28">
      <DetailsImg images={product.images} />

      <DetailsInfo product={product} />
    </div>
  );
};

export default Details;
