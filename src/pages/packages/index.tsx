import PackageGrid from "@/components/packages/PackageGrid";
import { mockPackages } from "@/data/mockdata";
import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const PackagesIndexPage: React.FC = () => {
  const handleBuyAll = (pkgId: string) => {
    console.log('Buy all clicked for package:', pkgId);
    // Add your buy all logic here
  };

  return (
    <Entrance>
      <Navbar active={4} />
      <div className="container max-w-[1536px] mx-auto px-5 sm:px-10 lg:px-20 pt-10 pb-32">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-4">Packages</h1>
          <p className="text-black-100">
            Furnish entire rooms with ready-made sets. Buy the whole package and save, or pick <br className="hidden lg:block" /> items individually at regular price
          </p>
        </div>

        <PackageGrid
          packages={mockPackages}
          onBuyAll={handleBuyAll}
        />
      </div>
      <Footer />
    </Entrance>
  );
};

export default PackagesIndexPage;