import React, { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { createPortal } from 'react-dom';
import { X, Plus, Minus } from 'lucide-react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

interface Color {
  id: number;
  name: string;
  hex_code: string;
}

interface Size {
  id: number;
  name: string;
}

interface ProductVariant {
  id: number;
  color: Color;
  size: Size;
  stock: number;
  allow_backorders: boolean;
  current_price: string;
  is_on_sale: boolean;
}

interface ProductImage {
  id: number;
  image: string;
  is_featured: boolean;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price_range: string;
  images: ProductImage[];
  variants: ProductVariant[];
}

interface RegistryProductCardProps {
  id: string;
  name: string;
  image: string;
  price_range: string;
  product: Product;
  onAddToRegistry: (productId: string, quantity: number, variantId: number, finalPrice: number) => Promise<void>;
}

const RegistryProductCard: React.FC<RegistryProductCardProps> = ({
  id,
  name,
  image,
  price_range,
  product,
  onAddToRegistry
}) => {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>(image);
  const [isAdding, setIsAdding] = useState(false);

  const availableColors = React.useMemo(() => {
    const colors = product?.variants?.map((v) => v.color) || [];
    return Array.from(new Map(colors.map((c) => [c.id, c])).values());
  }, [product?.variants]);

  const availableSizes = React.useMemo(() => {
    const sizes = product?.variants?.map((v) => v.size) || [];
    return Array.from(new Map(sizes.map((s) => [s.id, s])).values());
  }, [product?.variants]);

  const filteredVariants = React.useMemo(() => {
    if (!product?.variants) return [];
    return product.variants.filter((variant) => {
      const colorMatch = !selectedColor || variant.color.id === selectedColor.id;
      const sizeMatch = !selectedSize || variant.size.id === selectedSize.id;
      return colorMatch && sizeMatch;
    });
  }, [product?.variants, selectedColor, selectedSize]);

  const selectedVariant = React.useMemo(() => {
    if (!selectedColor || !selectedSize) return null;
    return (
      product?.variants?.find(
        (v) => v.color.id === selectedColor.id && v.size.id === selectedSize.id
      ) || null
    );
  }, [product?.variants, selectedColor, selectedSize]);

  const priceInfo = React.useMemo(() => {
    const variants = filteredVariants.length > 0 ? filteredVariants : product?.variants || [];
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
  }, [filteredVariants, product?.variants, selectedVariant]);

  const stockInfo = React.useMemo(() => {
    if (selectedVariant) {
      return {
        stock: selectedVariant.stock,
        isAvailable: selectedVariant.stock > 0 || selectedVariant.allow_backorders,
      };
    }
    const totalStock = filteredVariants.reduce((sum, v) => sum + v.stock, 0);
    return {
      stock: totalStock,
      isAvailable:
        totalStock > 0 || filteredVariants.some((v) => v.allow_backorders),
    };
  }, [selectedVariant, filteredVariants]);

  React.useEffect(() => {
    if (product?.variants && product.variants.length > 0 && !selectedColor) {
      setSelectedColor(product.variants[0].color);
      setSelectedSize(product.variants[0].size);
    }
  }, [product?.variants, selectedColor]);

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
    const validVariant = product.variants.find((v) => v.color.id === color.id);
    if (validVariant) setSelectedSize(validVariant.size);
  };

  const handleSizeSelect = (size: Size) => setSelectedSize(size);

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleAddToRegistry = async () => {
    if (!selectedVariant) {
      toast.error('Please select a color and size');
      return;
    }
    if (!stockInfo.isAvailable) {
      toast.error('This variant is out of stock');
      return;
    }

    setIsAdding(true);
    try {
      await onAddToRegistry(
        id,
        quantity,
        selectedVariant.id,
        parseFloat(selectedVariant.current_price)
      );
      setShowModal(false);
      setQuantity(1);
      setSelectedColor(null);
      setSelectedSize(null);
    } catch (error) {
    } finally {
      setIsAdding(false);
    }
  };

  const modalContent = showModal && (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4 pb-4 border-b">
          <h2 className="text-xl font-semibold">Select Product Options</h2>
          <button
            onClick={() => setShowModal(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-4">
            <div className="w-full h-[250px] lg:h-[400px] flex items-center justify-center">
              <img
                src={selectedImage}
                alt={product?.name}
                className="w-full h-full object-contain"
              />
            </div>

            {product?.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.image)}
                    className={`shrink-0 w-20 h-20 border-2 ${selectedImage === img.image ? 'border-black' : 'border-gray-200'
                      } hover:border-gray-400 transition-colors cursor-pointer`}
                  >
                    <img
                      src={img.image}
                      alt="Thumbnail"
                      className="w-full h-full object-contain p-1"
                    />
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
            {!selectedVariant && (
              <p className="text-sm text-gray-500 mt-1">Select options to see exact price</p>
            )}

            {stockInfo && (
              <div className="flex items-center gap-2">
                <div
                  className={`w-fit rounded-full border py-1 px-4 ${stockInfo.isAvailable
                      ? 'border-[#257B13] bg-[#F5FFF9] text-[#257B13]'
                      : 'border-red-500 bg-red-100 text-red-500'
                    }`}
                >
                  <span className="text-sm">
                    {stockInfo.isAvailable
                      ? `${stockInfo.stock} in stock`
                      : 'Out of stock'}
                  </span>
                </div>
              </div>
            )}

            {availableColors.length > 0 && (
              <div className="space-y-3 mt-5">
                <label className="text-sm font-medium text-gray-700">Color</label>
                <div className="flex gap-3 flex-wrap">
                  {availableColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorSelect(color)}
                      className={`w-6 h-6 border cursor-pointer ${selectedColor?.id === color.id ? "border-gray-300 hover:border-gray-400" : ""} transition-all`}
                      style={{ backgroundColor: color.hex_code }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {availableSizes.length > 0 && (
              <div className="space-y-3 mt-5">
                <label className="text-sm font-medium text-gray-700">Size</label>
                <div className="flex gap-3 flex-wrap">
                  {availableSizes.map((size) => {
                    const isAvailable = filteredVariants.some(
                      (v) => v.size.id === size.id && (v.stock > 0 || v.allow_backorders)
                    );
                    return (
                      <button
                        key={size.id}
                        onClick={() => handleSizeSelect(size)}
                        disabled={!isAvailable}
                        className={`h-10 w-28 sm:w-32 border-2 text-sm font-medium transition-all cursor-pointer ${selectedSize?.id === size.id
                            ? 'border-black bg-black text-white'
                            : isAvailable
                              ? 'border-gray-300 hover:border-black'
                              : 'border-gray-200 text-gray-400 cursor-not-allowed line-through'
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
              <label className="text-sm font-medium text-gray-700">Quantity</label>
              <div className="flex items-center gap-2 border border-[#A3A3A3] rounded-md p-1 w-fit">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-100 rounded transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <FaAngleLeft size={16} />
                </button>

                <span className="w-8 text-center font-medium text-black">{quantity}</span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-100 rounded transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <FaAngleRight size={16} />
                </button>
              </div>
            </div>

            {product?.description && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <button
              onClick={handleAddToRegistry}
              disabled={!selectedVariant || !stockInfo.isAvailable || isAdding}
              className="w-full mt-6 bg-black text-white py-3 rounded-md font-medium transition-colors hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isAdding ? 'Adding...' : 'Add to Registry'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full border border-[#e5e7eb] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="w-full h-[200px] sm:h-[240px] lg:h-[280px] relative overflow-hidden">
          <Image
            src={image}
            alt={name}
            className="w-full h-full object-contain mix-blend-multiply p-4"
            width={500}
            height={500}
            loading="lazy"
          />
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm lg:text-base font-medium text-black-400 line-clamp-2">
              {name}
            </h3>
            <p className="text-base lg:text-lg font-semibold text-black-400">
              ₦{price_range}
            </p>
          </div>

          <button
            onClick={handleAddClick}
            className="w-full text-black-400 py-2.5 rounded-full border border-black-400 font-medium text-sm hover:bg-black-400 hover:text-white transition-colors cursor-pointer"
          >
            Add to Registry
          </button>
        </div>
      </div>

      {typeof window !== 'undefined' && modalContent && createPortal(modalContent, document.body)}
    </>
  );
};

export default RegistryProductCard;