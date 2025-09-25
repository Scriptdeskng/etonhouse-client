import { Package } from "@/types/package";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../navbar";
import Entrance from "@/animated/Entrance";
import Footer from "../footer";
import { IoMdPricetag } from "react-icons/io";

const PackageDetails: React.FC<{
  package: Package;
  onBack: () => void;
  onBuyAll: (pkg: Package) => void;
  onAddToCart: (productId: string, quantity: number) => void;
}> = ({ package: pkg, onBack, onBuyAll, onAddToCart }) => {
  const [productQuantities, setProductQuantities] = useState<
    Record<string, number>
  >(
    pkg.items.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );
  const [cartItems, setCartItems] = useState<Set<string>>(new Set());

  const totalAmount = parseFloat(pkg.total_price);
  const discountedAmount = parseFloat(pkg.discounted_price);
  const savedAmount = totalAmount - discountedAmount;

  const handleQuantityChange = (itemId: string, change: number) => {
    setProductQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + change),
    }));
  };

  const handleAddToCart = (itemId: string) => {
    const quantity = productQuantities[itemId];
    onAddToCart(itemId, quantity);
    setCartItems((prev) => {
      const newCartItems = new Set(prev);
      if (newCartItems.has(itemId)) {
        newCartItems.delete(itemId);
      } else {
        newCartItems.add(itemId);
      }
      return newCartItems;
    });
  };

  return (
    <Entrance>
      <Navbar active={4} />
      <div className="max-w-[1536px] mx-auto px-5 sm:px-10 lg:px-20 pt-10 pb-32">
        <button
          onClick={onBack}
          className="mb-4 text-black-400 hover:underline transition-all duration-200 ease-linear"
        >
          ← Back to Packages
        </button>

        <div className="mb-8">
          <Image
            src={pkg.image}
            alt={pkg.name}
            width={800}
            height={400}
            className="w-full h-96 rounded-4xl object-cover mb-6 lg:h-[30rem]"
          />

          <h1 className="text-2xl text-black-400 font-medium mb-2">
            {pkg.name}
          </h1>
          <p className="text-black-100 mb-4">{pkg.description}</p>

          <div className="mb-4">
            <div className="text-black-400 flex items-center text-lg font-medium gap-1">
              <IoMdPricetag className="text-[#EBB371] text-2xl" />
              <span>₦{totalAmount.toFixed(2)} (Individually)</span>
            </div>

            <div className="text-black-400 flex items-center text-lg font-medium gap-1">
              <IoMdPricetag className="text-[#EBB371] text-2xl" />
              <span>₦{discountedAmount.toFixed(2)} (Bundle Price)</span>
            </div>

            <div className="text-sm mt-4 text-black-100">
              (Save ₦{savedAmount.toFixed(2)} when you buy the full set)
            </div>
          </div>

          <button
            onClick={() => onBuyAll(pkg)}
            className="rounded-full py-1.5 px-24 bg-black-400 text-white cursor-pointer transition-colors font-medium ease-in-out duration-200"
          >
            Buy All
          </button>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl text-black-400 mb-4">Items List</h2>

          <div className="space-y-4">
            {pkg.items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="flex flex-row items-center gap-2 w-full lg:w-[40%]">
                  <Image
                    src={item.product_image}
                    alt={item.product}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-black-400">
                      {item.product}
                    </h3>
                    <p className="text-black-100 text-sm">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-2 justify-between w-full lg:w-[30%] lg:justify-end lg:gap-20">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(String(item.id), -1)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">
                      {productQuantities[item.id]}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(String(item.id), 1)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleAddToCart(String(item.id))}
                    className="border border-gray-300 bg-white px-4 py-2 rounded hover:bg-gray-50 flex items-center cursor-pointer gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={cartItems.has(String(item.id))}
                      readOnly
                      className="w-4 h-4 pointer-events-none"
                    />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Entrance>
  );
};

export default PackageDetails;
