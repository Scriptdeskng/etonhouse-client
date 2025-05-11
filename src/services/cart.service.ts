import { useMutation, useQuery } from "@tanstack/react-query";
import makeRequest from "@/config/axios";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";

export const useGetCartItems = () => {
  const { user, token } = useAuthStore();

  return useQuery({
    queryKey: ["cart-items"],
    queryFn: () =>
      makeRequest({
        url: `cart/${user?.id}/`,
        requireToken: true,
        token,
      }),
    enabled: !!user?.id,
    retry: 1,
  });
};

export const useAddToCart = () => {
  const { token } = useAuthStore();

  return useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        method: "POST",
        url: "cart/add/",
        data: data,
        requireToken: true,
        token,
      });

      return response;
    },
    onSuccess: () => {
      toast.success("Product added to cart!")!;
    },
    onError: () => {
      toast.error("Error adding product to cart!");
    },
  });
};

export const useUpdateCartItem = (refetch: () => void) => {
  const { token } = useAuthStore();

  return useMutation({
    mutationKey: ["update-cart"],
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await makeRequest({
        method: "PUT",
        url: `cart/update/${id}/`,
        data: data,
        requireToken: true,
        token,
      });

      return response;
    },
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      toast.error("Error updating cart item!");
    },
  });
};

export const useDeleteCartItem = (refetch: () => void) => {
  const { token } = useAuthStore();

  return useMutation({
    mutationKey: ["delete-cart-item"],
    mutationFn: async (id: any) => {
      const response = await makeRequest({
        method: "DELETE",
        url: `cart/remove/${id}/`,
        requireToken: true,
        token,
      });

      return response;
    },
    onSuccess: () => {
      toast.success("Product removed from cart!");
      refetch();
    },
    onError: () => {
      toast.error("Error removing product from cart!");
    },
  });
};
