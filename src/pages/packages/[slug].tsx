import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import PackageDetails from "@/components/packages/PackageDetails";
import { Package } from "@/types/package";
import makeRequest from "@/config/axios";
import { useSinglePackage } from "@/services/package.service";
import { useCartStore } from "@/store/cartStore";

interface PackageDetailsPageProps {
  slug: string;
}

function PackageDetailsPage({ slug }: PackageDetailsPageProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { data: pkg, isLoading, isError } = useSinglePackage(slug);

  if (isLoading) return <div className="w-full h-screen flex items-center justify-center lg:text-lg">Loading package...</div>;

  if (isError || !pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Package Not Found</h1>
          <button
            onClick={() => router.push("/packages")}
            className="text-black-400 hover:underline"
          >
            ← Back to Packages
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    router.push("/packages");
  };

  const handleBuyAll = (pkg: Package) => {
    pkg.items.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.product,
        image: item.product_image,
        price: parseFloat(pkg.discounted_price) / pkg.items.length,
        quantity: item.quantity,
      });
    });
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    const item = pkg.items.find((i: any) => String(i.id) === productId);
    if (!item) return;

    addToCart({
      id: item.id,
      name: item.product,
      image: item.product_image,
      price: parseFloat(pkg.total_price) / pkg.items.length,
      quantity,
    });
  };

  return (
    <PackageDetails
      package={pkg}
      onBack={handleBack}
      onBuyAll={handleBuyAll}
      onAddToCart={handleAddToCart}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await makeRequest({
      url: "packages/",
      requireToken: false,
    });

    const packages: Package[] = res.results || [];

    const paths = packages.map((pkg) => ({
      params: { slug: pkg.slug },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error("Error fetching packages:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps<PackageDetailsPageProps> = async ({ params }) => {
  const slug = params?.slug as string;

  return {
    props: {
      slug,
    },
    revalidate: 60,
  };
};

export default PackageDetailsPage;
