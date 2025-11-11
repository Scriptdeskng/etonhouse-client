/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useAddToWishlist, useRemoveFromWishlist } from "@/services/profile.service";
import toast from "react-hot-toast";
import Link from "next/link";
import { Product } from "@/types/product";
import ProductVariantSelector from "@/components/product/ProductVariant";

interface Props {
  product: Product;
}

const ResponsiveProduct = ({ product }: Props) => {
  const [count, setCount] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const { favorites, addToFavorites, removeFromFavorites, isFavorite, getFavoriteByProductId } = useFavoritesStore();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const isProductFavorite = product.id ? isFavorite(product.id) : false;

  const handleToggleFavorite = async () => {
    if (!product.id) {
      toast.error("Product ID is required");
      return;
    }

    try {
      if (isProductFavorite) {
        const favoriteItem = getFavoriteByProductId(product.id);
        if (favoriteItem) {
          await removeFromWishlist.mutateAsync(favoriteItem.id);
          removeFromFavorites(favoriteItem.id);
        }
      } else {
        const response = await addToWishlist.mutateAsync(product.id);
        addToFavorites({
          id: response.id,
          product: {
            id: response.product.id,
            name: response.product.name,
            slug: response.product.slug,
            featured_image: response.product.featured_image,
          },
          created_at: response.created_at,
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Error updating favorites");
    }
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const featuredImage =
    product.images.find((img) => img.is_featured)?.image || product.images[0]?.image;

  return (
    <>
      <div className="w-full border border-[#61616166] relative space-y-2 md:space-y-4 px-2 py-3">
        <button
          onClick={handleToggleFavorite}
          disabled={addToWishlist.isPending || removeFromWishlist.isPending}
          className="absolute top-3 right-3 text-black cursor-pointer z-20 p-1 hover:scale-110 transition-transform disabled:opacity-50"
        >
          {isProductFavorite ? (
            <FaHeart size={16} className="text-red-500" />
          ) : (
            <FaRegHeart size={16} className="text-gray-600 hover:text-red-500" />
          )}
        </button>

        <Link
          href={`/product/${product.slug}`}
          className="w-full h-[180px] sm:h-[220px] lg:h-[330px] relative"
        >
          <img
            src={featuredImage}
            alt={product.name}
            className="object-contain h-[180px] sm:h-[220px] lg:h-[330px] mx-auto"
            loading="eager"
          />
        </Link>

        <Link
          href={`/product/${product.slug}`}
          className="text-sm lg:text-base font-medium capitalize"
        >
          {product.name}
        </Link>

        <p className="text-sm lg:text-base text-black-400">₦{product.price_range}</p>

        <div className="w-full flex items-end justify-between">
          {/* Quantity kept in case you still want users to set amount before opening modal */}
          <div className="text-xs text-gray-600">Qty: {count}</div>

          <button
            onClick={handleAddClick}
            className="border-b border-black text-black text-[10px] sm:text-xs whitespace-nowrap cursor-pointer"
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {showModal && (
        <ProductVariantSelector
          product={product}
          isModal={true}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ResponsiveProduct;
