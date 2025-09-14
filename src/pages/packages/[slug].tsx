import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Package } from "@/types/package";
import { mockPackages } from "@/data/mockdata";
import { createSlug, findPackageBySlug } from "@/utils/slugify";
import PackageDetails from "@/components/packages/PackageDetails";

interface PackageDetailsPageProps {
  package: Package | null;
}

const PackageDetailsPage: React.FC<PackageDetailsPageProps> = ({ package: pkg }) => {
  const router = useRouter();

  // Handle loading state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Handle package not found
  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Package Not Found</h1>
          <button 
            onClick={() => router.push('/packages')}
            className="text-black-400 hover:underline"
          >
            ← Back to Packages
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    router.push('/packages');
  };

  const handleBuyAll = (pkg: Package) => {
    console.log('Buy all clicked for package:', pkg.id);
    // Add your buy all logic here
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    console.log('Add to cart clicked:', { productId, quantity });
    // Add your add to cart logic here
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

// Generate static paths for all packages at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = mockPackages.map((pkg) => ({
    params: { slug: createSlug(pkg.title) }
  }));

  return {
    paths,
    fallback: false
  };
};

// Get package data at build time
export const getStaticProps: GetStaticProps<PackageDetailsPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const pkg = findPackageBySlug(mockPackages, slug);

  return {
    props: {
      package: pkg || null,
    },
  };
};

export default PackageDetailsPage;