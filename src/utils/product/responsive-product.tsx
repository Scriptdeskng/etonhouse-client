/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Quantity from "../quantity";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useAddToWishlist, useRemoveFromWishlist } from "@/services/profile.service";
import toast from "react-hot-toast";
import Link from "next/link";

interface Props {
  id?: string;
  name: string;
  image: string;
  price: string;
  variants: any[];
  productId?: number;
}

const ResponsiveProduct = ({ id, name, image, price, variants, productId }: Props) => {
  const [count, setCount] = useState(1);

  const { addToCart } = useCartStore();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite, getFavoriteByProductId } = useFavoritesStore();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const isProductFavorite = productId ? isFavorite(productId) : false;

  function handleAdd() {
    addToCart({
      id: variants?.[0]?.id,
      name,
      image,
      price: Number(price.replace(/,/g, "")),
      quantity: count,
    });

    toast.success("Successfully added to cart");
  }

  const handleToggleFavorite = async () => {
    if (!productId) {
      toast.error("Product ID is required");
      return;
    }

    try {
      if (isProductFavorite) {
        const favoriteItem = getFavoriteByProductId(productId);
        if (favoriteItem) {
          await removeFromWishlist.mutateAsync(favoriteItem.id);
          removeFromFavorites(favoriteItem.id);
        }
      } else {
        const response = await addToWishlist.mutateAsync(productId);
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

  return (
    <div className="w-full border border-[#61616166] relative space-y-2 md:space-y-4 px-2 py-3">
      <button
        onClick={handleToggleFavorite}
        disabled={addToWishlist.isPending || removeFromWishlist.isPending}
        className="absolute top-3 right-3 text-black cursor-pointer z-50 p-1 hover:scale-110 transition-transform disabled:opacity-50"
      >
        {isProductFavorite ? (
          <FaHeart size={16} className="text-red-500" />
        ) : (
          <FaRegHeart size={16} className="text-gray-600 hover:text-red-500" />
        )}
      </button>

      <Link
        href={`/product/${id}`}
        className="w-full h-[180px] sm:h-[220px] lg:h-[330px] relative"
      >
        <img
          src={image}
          alt={name}
          className="object-contain h-[180px] sm:h-[220px] lg:h-[330px] mx-auto"
          loading="eager"
        />
      </Link>

      <Link
        href={`/product/${id}`}
        className="text-sm lg:text-base font-medium"
      >
        {name}
      </Link>

      <p className="text-sm lg:text-base text-black-400">₦{price}</p>

      <div className="w-full flex items-end justify-between">
        <Quantity count={count} setCount={setCount} size="sm" />

        <button
          onClick={handleAdd}
          className="border-b border-black text-black text-[10px] sm:text-xs whitespace-nowrap cursor-pointer"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ResponsiveProduct;