"use client";

import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useAllProducts } from "@/services/product.service";
import Link from "next/link";

interface Props {
    onClose: () => void;
}

const SearchOverlay = ({ onClose }: Props) => {
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 400);

    const { data, isLoading } = useAllProducts(
        { search: debouncedQuery },
        { enabled: !!debouncedQuery }
    );

    return (
        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full h-[85vh] bg-white fixed bottom-0 left-0 z-[100] shadow-[0_-4px_12px_rgba(0,0,0,0.15)]"
        >
            <div className=" p-5 flex flex-col max-w-[1536px] mx-auto sm:px-10 lg:px-20">
                <button onClick={onClose} className="flex justify-end cursor-pointer text-black-100">
                    <IoClose size={26} />
                </button>

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full border-b-2 border-gray-300 px-4 py-2 focus:outline-none text-2xl"
                    autoFocus
                />

                <div className="mt-4 flex-1 overflow-y-auto">
                    {isLoading && <p className="text-sm text-gray-500">Searching...</p>}

                    {!isLoading && debouncedQuery && data?.results?.length === 0 && (
                        <p className="text-sm text-gray-500">No products found.</p>
                    )}

                    {!isLoading &&
                        data?.results?.slice(0, 6).map((product: any) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.slug}`}
                                onClick={onClose}
                                className="flex items-center gap-3 py-2 cursor-pointer"
                            >
                                <img
                                    src={product?.images?.[0]?.image}
                                    alt={product.name}
                                    className="w-14 h-14 object-cover rounded"
                                />
                                <div>
                                    <p className="text-sm font-medium">{product.name}</p>
                                </div>
                            </Link>
                        ))}
                </div>

                {debouncedQuery && data?.results?.length > 0 && (
                    <Link
                        href={`/shop?search=${debouncedQuery}`}
                        onClick={onClose}
                        className="mt-5 underline"
                    >
                        View all results
                    </Link>
                )}
            </div>
        </motion.div>
    );
};

export default SearchOverlay;
