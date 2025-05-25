import makeRequest from "@/config/axios";
import useAuthStore from "@/store/authStore";
import { OrderSchema, Payment } from "@/types/order";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateOrder = () => {
  const { token } = useAuthStore();
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
  });
};

export const usePayment = () => {
  const { token } = useAuthStore();
  return useMutation({
    mutationKey: ["initiate-payment"],
    mutationFn: async (data: Payment) => {
      const response = await makeRequest({
        method: "POST",
        url: "payments/initialize/",
        data: data,
        requireToken: true,
        token,
      });

      return response;
    },
  });
};

export const useGetOrderById = (id: string | null) => {
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
