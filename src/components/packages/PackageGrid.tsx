import { Package } from "@/types/package";
import PackageCard from "./PackageCard";

interface PackageGridProps {
  packages: Package[];
  onBuyAll: (pkg: Package) => void;
}

const PackageGrid: React.FC<PackageGridProps> = ({ packages, onBuyAll }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <PackageCard
          key={pkg.id}
          package={pkg}
          onBuyAll={() => onBuyAll(pkg)}
        />
      ))}
    </div>
  );
};

export default PackageGrid;