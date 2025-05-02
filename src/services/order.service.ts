import makeRequest from "@/config/axios";
import useAuthStore from "@/store/authStore";
import { OrderSchema } from "@/types/order";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export const useCreateOrder = () => {
  const { token } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationKey: ["create-order"],
    mutationFn: async (data: OrderSchema) => {
      const response = await makeRequest({
        method: "POST",
        url: "orders/",
        data: data,
        requireToken: true,
        token,
      });

      return response;
    },
    onSuccess: (res) => {
      toast.success("Order Placed Successfully!")!;
      router.push(`/confirmation?orderId=${res?.order_number}`);
    },
    onError: () => {
      toast.error("Error while placing order, Try again!");
    },
  });
};

export const useGetOrderById = (id: string) => {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["get-order", { id }],
    queryFn: () =>
      makeRequest({
        url: `orders/${id}`,
        requireToken: true,
        token,
      }),
    enabled: !!id,
    retry: 1,
  });
};
