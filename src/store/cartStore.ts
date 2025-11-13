import { CartItem, PackageCartItem } from "@/types/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import makeRequest from '@/config/axios';
import toast from 'react-hot-toast';

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;

  packages: PackageCartItem[];
  addPackageToCart: (pkg: any) => Promise<void>;
  removePackageFromCart: (packageId: number) => void;
  clearPackages: () => void;
  isPackageInCart: (packageId: number) => boolean;
  getPackagesTotalPrice: () => number;
  getCombinedTotalPrice: () => number;
  getCombinedItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      packages: [],

      addToCart: (item) =>
        set((state) => {
          const quantityToAdd = item.quantity || 1;
          const existingItem = state.cart.find((i) => i.id === item.id);

          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + quantityToAdd }
                  : i
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                ...item,
                quantity: quantityToAdd,
              },
            ],
          };
        }),

      updateCartItem: (id: number, quantity: number) =>
        set((state) => ({
          cart: state.cart
            .map((item) => (item.id === id ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0),
        })),

      removeCartItem: (id: number) => {
        set((state) => ({
          cart: state.cart.filter((item) => !(item.id === id)),
        }));
      },

      clearCart: () => set({ cart: [] }),

      getTotalItems: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),

      addPackageToCart: async (pkg) => {
        const state = get();

        if (state.isPackageInCart(pkg.id)) {
          toast.error('This package is already in your cart');
          return;
        }

        try {
          const response = await makeRequest({
            url: `packages/${pkg.slug}/checkout/`,
            method: 'POST',
            requireToken: true,
          });

          const packageItem: PackageCartItem = {
            id: pkg.id,
            packageSlug: pkg.slug,
            name: pkg.name,
            image: pkg.image,
            description: pkg.description,
            originalPrice: parseFloat(pkg.total_price),
            discountedPrice: parseFloat(pkg.discounted_price),
            savedAmount: parseFloat(pkg.total_price) - parseFloat(pkg.discounted_price),
            items: response.cart.items.map((item: any) => ({
              id: item.product_variant.id,
              product: item.product_variant.product.name,
              product_image: item.product_variant.product.featured_image,
              quantity: item.quantity,
            })),
            addedAt: new Date().toISOString(),
          };

          set((state) => ({
            packages: [...state.packages, packageItem],
          }));

          toast.success(`${pkg.name} added to cart!`);
        } catch (error: any) {
          console.error('Error adding package to cart:', error);
          console.error('Error response:', error.response?.data);

          if (error.response?.data) {
            const errorData = error.response.data;
            const errorMessage = Object.values(errorData).join(', ') || 'Failed to add package to cart';
            toast.error(errorMessage);
          } else {
            toast.error('Failed to add package to cart');
          }

          throw error;
        }
      },

      removePackageFromCart: (packageId) => {
        set((state) => ({
          packages: state.packages.filter((pkg) => pkg.id !== packageId),
        }));
        toast.success('Package removed from cart');
      },

      clearPackages: () => {
        set({ packages: [] });
      },

      isPackageInCart: (packageId) => {
        return get().packages.some((pkg) => pkg.id === packageId);
      },

      getPackagesTotalPrice: () => {
        return get().packages.reduce(
          (total, pkg) => total + pkg.discountedPrice,
          0
        );
      },

      getCombinedTotalPrice: () => {
        const state = get();
        return state.getTotalPrice() + state.getPackagesTotalPrice();
      },

      getCombinedItemCount: () => {
        const state = get();
        return state.getTotalItems() + state.packages.length;
      },
    }),
    {
      name: "cart-store",
    }
  )
);