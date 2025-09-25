import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteItem {
  id: number;
  product: {
    id: number;
    name: string;
    slug: string;
    featured_image: string;
  };
  created_at: string;
}

interface FavoritesStore {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (wishlistId: number) => void;
  isFavorite: (productId: number) => boolean;
  getFavoriteByProductId: (productId: number) => FavoriteItem | null;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (item) =>
        set((state) => {
          const exists = state.favorites.find(
            (fav) => fav.product.id === item.product.id
          );
          
          if (exists) {
            return state;
          }

          return {
            favorites: [...state.favorites, item],
          };
        }),

      removeFromFavorites: (wishlistId: number) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== wishlistId),
        })),

      isFavorite: (productId: number) =>
        get().favorites.some((item) => item.product.id === productId),

      getFavoriteByProductId: (productId: number) =>
        get().favorites.find((item) => item.product.id === productId) || null,
    }),
    {
      name: "favorites-store",
    }
  )
);