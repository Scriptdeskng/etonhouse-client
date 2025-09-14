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
    const [productQuantities, setProductQuantities] = useState<Record<string, number>>(
        pkg.products.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
    );
    const [cartItems, setCartItems] = useState<Set<string>>(new Set());

    const discountedAmount = pkg.amount * (1 - pkg.discount / 100);
    const savedAmount = pkg.amount - discountedAmount;

    const handleQuantityChange = (productId: string, change: number) => {
        setProductQuantities(prev => ({
            ...prev,
            [productId]: Math.max(1, prev[productId] + change)
        }));
    };

    const handleAddToCart = (productId: string) => {
        const quantity = productQuantities[productId];
        onAddToCart(productId, quantity);
        setCartItems(prev => {
            const newCartItems = new Set(prev);
            if (newCartItems.has(productId)) {
                newCartItems.delete(productId);
            } else {
                newCartItems.add(productId);
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
                        alt={pkg.title}
                        className="w-full h-96 rounded-4xl object-cover mb-6 lg:h-[30rem]"
                    />

                    <h1 className="text-2xl text-black-400 font-medium mb-2">{pkg.title}</h1>
                    <p className="text-black-100 mb-4">{pkg.description}</p>

                    <div className="mb-4">
                        <div className="text-black-400 flex items-center text-lg font-medium gap-1">
                            <span><IoMdPricetag className="text-[#EBB371] text-2xl" /></span>
                            <span>₦{pkg.amount.toFixed(2)} (Individually)</span>
                        </div>

                        <div className="text-black-400 flex items-center text-lg font-medium gap-1">
                            <span><IoMdPricetag className="text-[#EBB371] text-2xl" /></span>
                            <span>₦{discountedAmount.toFixed(2)} (Bundle Price)</span>
                        </div>

                        <div className="text-sm mt-4 text-black-100">(Save ₦{savedAmount.toFixed(2)} when you buy the full set)</div>
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
                        {pkg.products.map((product) => (
                            <div key={product.id} className="border border-gray-200 rounded-lg p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                                <div className="flex flex-row items-center gap-2 w-full lg:w-[40%]">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    className="w-20 h-20 object-cover"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-black-400">{product.name}</h3>
                                    <p className="text-black-100 text-sm">{product.description}</p>
                                </div>
                                </div>

                                <div className="flex flex-row-reverse lg:flex-row items-center gap-2 justify-between w-full lg:w-[30%] lg:justify-center lg:gap-20">
                                <div><p className="font-medium text-black-400">₦{product.amount.toFixed(2)}</p></div>

                                <div className="bg-[#FAFFF4] border border-[#105921]/10 text-[#105921] rounded-full py-1 px-6">{product.status}</div>
                                </div>

                                <div className="flex flex-row items-center gap-2 justify-between w-full lg:w-[30%] lg:justify-end lg:gap-20">
                                <div className="flex items-center gap-2 ">
                                    <button
                                        onClick={() => handleQuantityChange(product.id, -1)}
                                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-50"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center">{productQuantities[product.id]}</span>
                                    <button
                                        onClick={() => handleQuantityChange(product.id, 1)}
                                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-50"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleAddToCart(product.id)}
                                    className="border border-gray-300 bg-white px-4 py-2 rounded hover:bg-gray-50 flex items-center cursor-pointer gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        checked={cartItems.has(product.id)}
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