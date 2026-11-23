import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useSingleProduct } from "@/services/product.service";
import Details from "@/ui/product/details";
import RecentlyViewed from "@/ui/product/recently-viewed";
import Recommended from "@/ui/product/recommended";
import { useRouter } from "next/router";
import SEO from "@/components/seo";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSingleProduct(String(id));

  return (
    <Entrance>
      <SEO
        title={data?.name || "Furniture Product"}
        description={data?.description || "Explore furniture from Eton House Nigeria."}
        canonicalPath={`/product/${id || ""}`}
        image={data?.images?.[0]?.image}
      />
      <Navbar active={2} />
      <Details product={data} isLoading={isLoading} />
      <RecentlyViewed />
      <Recommended />
      <Footer />
    </Entrance>
  );
};

export default ProductDetails;
