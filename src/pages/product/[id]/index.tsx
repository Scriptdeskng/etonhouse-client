import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useSingleProduct } from "@/services/product.service";
import Details from "@/ui/product/details";
import RecentlyViewed from "@/ui/product/recently-viewed";
import Recommended from "@/ui/product/recommended";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface Product {
  id: number | string;
  slug: string;
  images: string[];
  name: string;
  price: string;
  colors: string[];
  description: string;
  variants: any[];
}

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSingleProduct(String(id));

  const [details, setDetails] = useState<any>({});

  useEffect(() => {
    if (data) {
      setDetails({
        id: data?.slug,
        images: data?.images?.map((item: any) => item?.image),
        name: data?.name,
        price: Number(data?.current_price).toLocaleString("en-GB"),
        colors: [],
        description: data?.description,
        variants: data?.variants
      });
    }
  }, [data]);

  return (
    <Entrance>
      <Navbar active={2} />
      <Details product={details} isLoading={isLoading} />
      <RecentlyViewed />
      <Recommended />
      <Footer />
    </Entrance>
  );
};

export default ProductDetails;
