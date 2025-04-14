import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Details from "@/ui/product/details";
import RecentlyViewed from "@/ui/product/recently-viewed";
import Recommended from "@/ui/product/recommended";
import { useRouter } from "next/router";

export interface Product {
  id: number;
  images: string[];
  name: string;
  price: string;
  colors: string[];
  description: string;
}

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const details: Product = {
    id: Number(id) ?? 0,
    images: ["details1", "details2", "details3", "details4"],
    name: "Modern Oak Reading Chair",
    price: "200,000",
    colors: ["#691317", "#F6B76F", "#90B8FA"],
    description:
      "Lorem ipsum dolor sit amet consectetur. Dolor sapien praesent lectus dui etiam in parturient eget. Leo tellus vitae ultrices venenatis aliquet. Pretium tincidunt sed morbi gravida nisl mauris. Eget libero mauris id sagittis etiam sit cras aliquam. Porta facilisis.",
  };

  return (
    <Entrance>
      <Navbar active={2} />
      <Details product={details} />
      <RecentlyViewed />
      <Recommended />
      <Footer />
    </Entrance>
  );
};

export default ProductDetails;
