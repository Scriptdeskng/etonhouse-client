/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import Button from "@/utils/button";
import Quantity from "@/utils/quantity";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { Product, Color, Size } from "@/types/product";
import { createPortal } from "react-dom";

interface Props {
  product: Product;
  isLoading?: boolean;
  isModal?: boolean;
  onClose?: () => void;
}

const ProductVariantSelector = ({
  product,
  isLoading = false,
  isModal = false,
  onClose,
}: Props) => {
  const [count, setCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const router = useRouter();
  const { addToCart } = useCartStore();

  const availableSizes = useMemo(() => {
    const sizes = product?.variants?.map((v) => v.size) || [];
    return Array.from(new Map(sizes.map((s) => [s.id, s])).values());
  }, [product?.variants]);

  const availableColors = useMemo(() => {
    if (!selectedSize || !product?.variants) return [];
    
    const colorsForSize = product.variants
      .filter((v) => v.size.id === selectedSize.id)
      .map((v) => v.color);
    
    return Array.from(new Map(colorsForSize.map((c) => [c.id, c])).values());
  }, [product?.variants, selectedSize]);

  const selectedVariant = useMemo(() => {
    if (!selectedColor || !selectedSize) return null;
    return (
      product?.variants?.find(
        (v) => v.color.id === selectedColor.id && v.size.id === selectedSize.id
      ) || null
    );
  }, [product?.variants, selectedColor, selectedSize]);

  const priceInfo = useMemo(() => {
    const variants = product?.variants || [];
    if (variants.length === 0) return null;
    const prices = variants.map((v) => parseFloat(v.current_price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return {
      min: minPrice.toLocaleString(),
      max: maxPrice.toLocaleString(),
      range:
        minPrice === maxPrice
          ? `₦${minPrice.toLocaleString()}`
          : `₦${minPrice.toLocaleString()} - ₦${maxPrice.toLocaleString()}`,
      current: selectedVariant
        ? parseFloat(selectedVariant.current_price).toLocaleString()
        : null,
    };
  }, [product?.variants, selectedVariant]);

  const stockInfo = useMemo(() => {
    if (selectedVariant) {
      return {
        stock: selectedVariant.stock,
        isAvailable: selectedVariant.stock > 0 || selectedVariant.allow_backorders,
      };
    }
    return {
      stock: 0,
      isAvailable: false,
    };
  }, [selectedVariant]);

  useEffect(() => {
    if (product?.variants && product.variants.length > 0 && !selectedSize) {
      const firstVariant = product.variants[0];
      setSelectedSize(firstVariant.size);
      setSelectedColor(firstVariant.color);
    }
  }, [product?.variants, selectedSize]);

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      const featured = product.images.find((img) => img.is_featured);
      setSelectedImage(featured?.image || product.images[0].image);
    }
  }, [product?.images]);

  const handleSizeSelect = (size: Size) => {
    setSelectedSize(size);
    
    const variantForSize = product.variants.find((v) => v.size.id === size.id);
    if (variantForSize) {
      setSelectedColor(variantForSize.color);
    }
  };

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
  };

  const handleAdd = () => {
    if (!selectedVariant) {
      toast.error("Please select a color and size");
      return;
    }
    if (!stockInfo.isAvailable) {
      toast.error("This variant is out of stock");
      return;
    }
    addToCart({
      id: selectedVariant.id,
      image: selectedImage,
      name: `${product.name} - ${selectedColor?.name} / ${selectedSize?.name}`,
      price: parseFloat(selectedVariant.current_price),
      quantity: count,
    });
    toast.success("Successfully added to cart!");
    if (isModal && onClose) onClose();
  };

  const handleBuy = () => {
    handleAdd();
    router.push("/checkout");
  };

  if (isLoading) {
    return (
      <div className={isModal ? "bg-white p-6" : "w-full"}>
        <Skeleton height={400} />
      </div>
    );
  }

  const sections = [
    { key: "dimensions", title: "Dimensions", content: product?.dimensions },
    { key: "gallery", title: "Gallery", content: product?.images },
    { key: "care", title: "Care Instructions", content: product?.care_description },
    { key: "sustainability", title: "Sustainability", content: product?.sustainability_description },
  ];

  const content = (
    <div className={`${isModal ? "bg-white" : "w-full p-6 lg:py-10 lg:px-20"}`}>
      {isModal && (
        <div className="flex items-center justify-end mb-2 pb-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
      )}

      <div className={`grid ${isModal ? "lg:grid-cols-2" : "lg:grid-cols-2"} gap-6 lg:gap-8`}>
        <div className="space-y-4">
          <div className="w-full h-[250px] lg:h-[500px] flex items-center justify-center">
            <img
              src={selectedImage}
              alt={product?.name}
              className="w-full h-full object-contain lg:p-4"
              loading="eager"
            />
          </div>

          {product?.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.image)}
                  className={`shrink-0 w-20 h-20 border-2 ${selectedImage === img.image ? "border-black" : "border-gray-200"
                    } hover:border-gray-400 transition-colors`}
                >
                  <img src={img.image} alt="Thumbnail" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-xl lg:text-2xl font-bold text-black-400">{product?.name}</h1>

          <p className="text-2xl lg:text-3xl font-bold text-black-400">
            {priceInfo?.current ? `₦${priceInfo.current}` : priceInfo?.range}
          </p>
          {!selectedVariant && <p className="text-sm text-gray-500 mt-1">Select options to see exact price</p>}

          {stockInfo && selectedVariant && (
            <div className="flex items-center gap-2">
              <div className={`w-fit rounded-full border py-1 px-4 ${stockInfo.isAvailable ? "border-[#257B13] bg-[#F5FFF9] text-[#257B13]" : "border-red-500 bg-red-100 text-red-500"}`}>
                <span className="text-sm">{stockInfo.isAvailable ? `${stockInfo.stock} in stock` : "Out of stock"}</span>
              </div>
            </div>
          )}

                    {availableColors.length > 0 && (
            <div className="space-y-3 mt-5">
              <label className="block text-sm font-medium text-black-400">Select Color</label>
              <div className="flex gap-3 flex-wrap">
                {availableColors.map((color) => {
                  const variant = product.variants.find(
                    (v) => v.color.id === color.id && v.size.id === selectedSize?.id
                  );
                  const isAvailable = variant && (variant.stock > 0 || variant.allow_backorders);
                  
                  return (
                    <button
                      key={color.id}
                      onClick={() => handleColorSelect(color)}
                      disabled={!isAvailable}
                      className={`w-6 h-6 border cursor-pointer transition-all ${
                        selectedColor?.id === color.id 
                          ? "border-black-400" 
                          : isAvailable
                          ? "border-gray-300 hover:border-gray-400"
                          : "opacity-40 cursor-not-allowed"
                      }`}
                      style={{ backgroundColor: color.hex_code }}
                      title={color.name}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {availableSizes.length > 0 && (
            <div className="space-y-3 mt-5">
              <label className="block text-sm font-medium text-black-400">Select Size</label>
              <div className="flex gap-3 flex-wrap">
                {availableSizes.map((size) => {
                  const isAvailable = product.variants.some(
                    (v) => v.size.id === size.id && (v.stock > 0 || v.allow_backorders)
                  );
                  return (
                    <button
                      key={size.id}
                      onClick={() => handleSizeSelect(size)}
                      disabled={!isAvailable}
                      className={`h-10 w-28 sm:w-32 border-2 text-sm font-medium transition-all ${
                        selectedSize?.id === size.id
                          ? "border-black-200 bg-black-200 text-white"
                          : isAvailable
                            ? "border-black-200"
                            : "border-gray-200 text-gray-400 cursor-not-allowed line-through"
                      }`}
                    >
                      {size.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-3 mt-5">
            <Quantity count={count} setCount={setCount} />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button
              text="Buy now"
              className="h-12 rounded-none !py-0 !text-base !bg-white !text-black-200 border border-black-200"
              handleClick={handleBuy}
              disabled={!selectedVariant || !stockInfo.isAvailable}
            />
            <Button
              text="Add to Cart"
              className="h-12 bg-black-200 border border-black-200 text-white rounded-none bg- !py-0 !text-base"
              handleClick={handleAdd}
              disabled={!selectedVariant || !stockInfo.isAvailable}
            />
          </div>

          {product?.description && (
            <div className="pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          <div className="space-y-4 pt-4">
            {sections.map((section) => (
              <div key={section.key}>
                <button
                  className="w-full py-5 pr-3 group border-b-[0.5px] border-[#00000066] flex items-center justify-between"
                  onClick={() =>
                    setOpenSections((prev) => ({
                      ...prev,
                      [section.key]: !prev[section.key],
                    }))
                  }
                >
                  <h2 className="text-lg text-black">{section.title}</h2>
                  <span className="ml-2">
                    {openSections[section.key] ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>

                {openSections[section.key] && (
                  <div className="mt-2 text-sm text-gray-600">
                    {section.key === "gallery" && Array.isArray(section.content) ? (
                      <div className="flex gap-2 overflow-x-auto">
                        {section.content.map((img: any) => (
                          <img
                            key={img.id}
                            src={img.image}
                            alt={product.name}
                            className="w-20 h-20 object-contain rounded border"
                          />
                        ))}
                      </div>
                    ) : (
                      <p>{section.content as string}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return createPortal(
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6">
          {content}
        </div>
      </div>,
      document.body
    );
  }

  return content;
};

export default ProductVariantSelector;