import { Package } from "@/types/package";
import Image from "next/image";
import Link from "next/link";
import { IoMdPricetag } from "react-icons/io";

const PackageCard: React.FC<{ 
  package: Package; 
  onBuyAll: () => void;
}> = ({ package: pkg, onBuyAll }) => {
  const discountedAmount = parseFloat(pkg.discounted_price);
  const totalAmount = parseFloat(pkg.total_price);

  return (
    <div className="border border-gray-200 rounded-2xl p-4">
      <Image 
        src={pkg.image} 
        alt={pkg.name} 
        width={500}
        height={300}
        className="w-full h-48 object-cover mb-4 rounded-2xl sm:h-64 lg:h-80"
      />
      <h3 className="text-lg text-black-400 font-medium mb-2">{pkg.name}</h3>
      <p className="text-black-100 mb-4 font-light">{pkg.description}</p>

      <div className="mb-4">
        <div className="text-black-400 flex items-center text-lg font-medium gap-1">
          <IoMdPricetag className="text-[#EBB371] text-2xl" />
          <span>₦{totalAmount.toFixed(2)} (Individually)</span>
        </div>

        <div className="text-black-400 flex items-center text-lg font-medium gap-1">
          <IoMdPricetag className="text-[#EBB371] text-2xl" />
          <span>₦{discountedAmount.toFixed(2)} (Bundle Price)</span>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <button 
          onClick={onBuyAll}
          className="rounded-full py-1.5 px-16 border border-black-400 cursor-pointer transition-colors hover:bg-black-400 hover:text-white font-medium ease-in-out duration-200"
        >
          Buy All
        </button>

        <Link 
          href={`/packages/${pkg.slug}`}
          className="underline text-black-400 font-medium cursor-pointer hover:text-black-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;
