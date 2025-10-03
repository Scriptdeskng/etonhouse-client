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
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["user-orders"],
    queryFn: () =>
      makeRequest({
        url: "my_orders/",
        requireToken: true,
        token,
      }),
    enabled: !!token,
    retry: 1,
  });
};

// Get all user addresses
export const useGetAddresses = () => {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["user-addresses"],
    queryFn: () =>
      makeRequest({
        url: "auth/addresses/",
        requireToken: true,
        token,
      }),
    enabled: !!token,
    retry: 1,
  });
};

// Get default address
export const useGetDefaultAddress = () => {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["default-address"],
    queryFn: () =>
      makeRequest({
        url: "auth/addresses/default/",
        requireToken: true,
        token,
      }),
    enabled: !!token,
    retry: 1,
  });
};

// Delete address
export const useDeleteAddress = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-address"],
    mutationFn: async (id: number) => {
      const response = await makeRequest({
        method: "DELETE",
        url: `auth/addresses/${id}/`,
        requireToken: true,
        token,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Address deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
      queryClient.invalidateQueries({ queryKey: ["default-address"] });
    },
    onError: () => {
      toast.error("Error deleting address!");
    },
  });
};

// Set default address
export const useSetDefaultAddress = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["set-default-address"],
    mutationFn: async (id: number) => {
      const response = await makeRequest({
        method: "POST",
        url: `auth/addresses/${id}/set_default/`,
        requireToken: true,
        token,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Default address updated!");
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
      queryClient.invalidateQueries({ queryKey: ["default-address"] });
    },
    onError: () => {
      toast.error("Error setting default address!");
    },
  });
};

// Create new address
export const useCreateAddress = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-address"],
    mutationFn: async (data: any) => {
      const cleanedData = {
        label: data.label || "",
        address_type: data.address_type || "home",
        first_name: data.first_name?.trim() || "",
        last_name: data.last_name?.trim() || "",
        address_line1: data.address_line1?.trim() || "",
        address_line2: data.address_line2?.trim() || "",
        city: data.city?.trim() || "",
        state: data.state?.trim() || "",
        postal_code: data.postal_code?.trim() || "",
        country: data.country?.trim() || "Nigeria",
        phone: data.phone?.trim() || "",
        is_default: Boolean(data.is_default),
      };

      try {
        const response = await makeRequest({
          method: "POST",
          url: "auth/addresses/",
          data: cleanedData,
          requireToken: true,
          token,
        });
        return response;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Address added successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
      queryClient.invalidateQueries({ queryKey: ["default-address"] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          JSON.stringify(error.response?.data) ||
                          "Error adding address!";
      
      console.error("Full error object:", error.response?.data);
      toast.error(errorMessage);
    },
  });
};

// Update address
export const useUpdateAddress = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-address"],
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const cleanedData = {
        label: data.label || "",
        address_type: data.address_type || "home",
        first_name: data.first_name?.trim() || "",
        last_name: data.last_name?.trim() || "",
        address_line1: data.address_line1?.trim() || "",
        address_line2: data.address_line2?.trim() || "",
        city: data.city?.trim() || "",
        state: data.state?.trim() || "",
        postal_code: data.postal_code?.trim() || "",
        country: data.country?.trim() || "Nigeria",
        phone: data.phone?.trim() || "",
        is_default: Boolean(data.is_default),
      };

      try {
        const response = await makeRequest({
          method: "PATCH",
          url: `auth/addresses/${id}/`,
          data: cleanedData,
          requireToken: true,
          token,
        });
        return response;
      } catch (error: any) {
        console.error("Address update error:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Address updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
      queryClient.invalidateQueries({ queryKey: ["default-address"] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          JSON.stringify(error.response?.data) ||
                          "Error updating address!";
      
      console.error("Full error object:", error.response?.data);
      toast.error(errorMessage);
    },
  });
};