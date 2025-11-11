/* eslint-disable @next/next/no-img-element */
import { useCartStore } from "@/store/cartStore";
import { FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useState } from "react";

const PackageCartCard = ({ package: pkg }: { package: any }) => {
    const { removePackageFromCart } = useCartStore();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border-[0.4px] mb-5 border-[#6161614D]">
            <div className="w-full p-4 lg:p-0 grid grid-cols-1 gap-5 lg:gap-0 lg:grid-cols-[400px_120px_120px_230px] items-center justify-between lg:py-10">
                <div className="flex items-center gap-2.5 lg:gap-[30px] lg:pl-[30px]">
                    <img
                        src={pkg?.image}
                        alt={pkg?.name}
                        width={120}
                        height={120}
                        className="object-contain"
                    />

                    <div className="flex flex-col gap-7 lg:gap-10">
                        <div className="flex items-center gap-2">
                            <p className="md:text-xl leading-[100%] font-medium text-[#333333] capitalize">
                                {pkg?.name}
                            </p>
                        </div>

                        <div
                            role="button"
                            onClick={() => removePackageFromCart(pkg?.id)}
                            className="flex items-center gap-2.5 cursor-pointer text-[#D24545]"
                        >
                            <FaTrash size={16} />
                            <p className="text-sm">REMOVE</p>
                        </div>
                    </div>
                </div>

                <div className="w-full flex items-center justify-between lg:justify-start">
                    <p className="text-sm md:text-lg text-[#141414] lg:hidden">Original Price:</p>
                    <p className="text-sm md:text-lg font-medium text-[#999999] line-through">
                        ₦{Number(pkg?.originalPrice).toLocaleString()}
                    </p>
                </div>

                <div className="w-full flex items-center justify-between lg:justify-start">
                    <p className="text-sm md:text-lg text-[#141414] lg:hidden">Package:</p>
                    <span className="px-2 py-1 bg-[#D6DDD6] text-xs rounded font-medium">
                        PACKAGE
                    </span>
                </div>

                <div className="w-full flex flex-col gap-1 lg:justify-start">
                    <div className="w-full flex items-center justify-between lg:justify-start">
                        <p className="text-sm md:text-lg text-[#141414] lg:hidden">Bundle Price:</p>
                        <p className="text-sm md:text-lg font-bold text-[#333333]">
                            ₦{Number(pkg?.discountedPrice).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <div
                role="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex border-t border-t-[#6161614D] p-5 items-center gap-2.5 cursor-pointer text-[#141414]"
            >
                <p className="text-sm">
                    {isExpanded ? 'Hide' : 'View full'} item list ({pkg?.items?.length})
                </p>
                {isExpanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </div>

            {isExpanded && (
                <div className="bg-white border-t border-[#6161614D]">
                    <div className="p-4 lg:pl-[60px]">
                        {pkg?.items?.map((item: any, index: number) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 p-3 border-b border-b-[#E0E0E0] last:border-b-0"
                            >
                                <img
                                    src={item.product_image}
                                    alt={item.product}
                                    width={60}
                                    height={60}
                                    className="object-contain"
                                />
                                <div className="flex-1">
                                    <p className="text-sm md:text-base font-medium text-[#333333] capitalize">
                                        {item.product}
                                    </p>
                                    <p className="text-xs text-[#616161] mt-1">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PackageCartCard;