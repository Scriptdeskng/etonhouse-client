/* eslint-disable @next/next/no-img-element */
import { useGetWishlist, useRemoveFromWishlist } from "@/services/profile.service";
import { useFavoritesStore } from "@/store/favoritesStore";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

const Favorites = () => {
  const { data: wishlist, isLoading, refetch } = useGetWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const { favorites, removeFromFavorites } = useFavoritesStore();
  const { addToCart } = useCartStore();

  const handleRemoveFromFavorites = async (wishlistId: number) => {
    try {
      await removeFromWishlist.mutateAsync(wishlistId);
      removeFromFavorites(wishlistId);
      refetch();
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const handleMoveToCart = async (item: any) => {
    try {
      addToCart({
        id: item.product.id,
        name: item.product.name,
        image: item.product.featured_image,
        price: item.base_price,
        quantity: 1,
      });

      // await handleRemoveFromFavorites(item.id);

      toast.success(`${item.product.name} moved to cart!`);
    } catch (error) {
      console.error("Error moving to cart:", error);
      toast.error("Failed to move item to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#333333]">Favorites</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse">Loading your favorites...</div>
        </div>
      </div>
    );
  }

  const favoriteItems = wishlist?.results || [];

  if (favoriteItems.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#333333]">Favorites</h2>
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No favorites yet
          </h3>
          <p className="text-gray-500 mb-6">
            Save products you love to your favorites list for easy access later.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2 bg-black-400 text-white rounded-full"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-black-400">
        Favorites ({favoriteItems.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteItems.map((item: any) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg p-2 relative group hover:shadow-md transition-shadow"
          >
            <Link
              href={`/product/${item.product.slug}`}
              className="block mb-4"
            >
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <img
                  src={item.product.featured_image}
                  alt={item.product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Link>

            <div className="space-y-2">
              <Link
                href={`/product/${item.product.slug}`}
                className="block"
              >
                <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-[#414205] transition-colors">
                  {item.product.name}
                </h3>
              </Link>

              <p className="text-sm text-black-400">
                ₦{item.price_range}
              </p>

              <div className="flex items-center justify-between pt-5 gap-2">
                <button onClick={() => handleRemoveFromFavorites(item.id)} className="w-full border py-1.5 flex items-center justify-center border-black-400 text-sm cursor-pointer">
                  Remove
                </button>

                <button className="w-full bg-black-400 border border-black-400 text-white py-1.5 flex items-center justify-center px-2 text-sm cursor-pointer" onClick={() => handleMoveToCart(item)}>
                  Move to cart
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;