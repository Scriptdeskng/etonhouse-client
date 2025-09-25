import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeRequest from "@/config/axios";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";

// Get user profile
export const useGetUserProfile = () => {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["user-profile"],
    queryFn: () =>
      makeRequest({
        url: "auth/user/",
        requireToken: true,
        token,
      }),
    enabled: !!token,
    retry: 1,
  });
};

// Update user profile
export const useUpdateUserProfile = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        method: "PATCH",
        url: "auth/user/",
        data: data,
        requireToken: true,
        token,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: () => {
      toast.error("Error updating profile!");
    },
  });
};

// Get wishlist
export const useGetWishlist = () => {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["wishlist"],
    queryFn: () =>
      makeRequest({
        url: "products/wishlist/",
        requireToken: true,
        token,
      }),
    enabled: !!token,
    retry: 1,
  });
};

// Add to wishlist
export const useAddToWishlist = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-to-wishlist"],
    mutationFn: async (productId: number) => {
      const response = await makeRequest({
        method: "POST",
        url: "products/wishlist/",
        data: { product_id: productId },
        requireToken: true,
        token,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Added to favorites!");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: () => {
      toast.error("Error adding to favorites!");
    },
  });
};

// Remove from wishlist
export const useRemoveFromWishlist = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["remove-from-wishlist"],
    mutationFn: async (wishlistId: number) => {
      const response = await makeRequest({
        method: "DELETE",
        url: `products/wishlist/${wishlistId}/`,
        requireToken: true,
        token,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Removed from favorites!");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: () => {
      toast.error("Error removing from favorites!");
    },
  });
};

// Get user orders
export const useGetUserOrders = () => {
  const { token, user } = useAuthStore();

  return useQuery({
    queryKey: ["user-orders", user?.id],
    queryFn: async () => {
      const response = await makeRequest({
        url: "orders/",
        requireToken: true,
        token,
      });

      const userOrders = response.results?.filter((order: any) => {
        if (user?.id && order.user === user.id) {
          return true;
        }

        if (user?.email && order.guest_email === user.email) {
          return true;
        }
        return false;
      });
      
      return {
        ...response,
        results: userOrders || [],
        count: userOrders?.length || 0
      };
    },
    enabled: !!token && !!user,
    retry: 1,
  });
};