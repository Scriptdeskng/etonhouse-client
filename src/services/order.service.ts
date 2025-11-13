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

export const useVerifyPayment = () => {
  const { token } = useAuthStore();

  return useMutation({
    mutationKey: ["verify-payment"],
    mutationFn: async (reference: string) => {
      return await makeRequest({
        method: "GET",
        url: `payments/verify/?reference=${reference}`,
        requireToken: true,
        token,
      });
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

// For registry purchases
export const useInitializePayment = () => {
  const { token } = useAuthStore();

  return useMutation({
    mutationFn: (data: {
      email: string;
      order_id: number;
      reference: string;
      payment_method: string;
      amount: number;
      metadata?: any;
    }) => {

      return makeRequest({
        url: "payments/initialize/",
        method: "POST",
        data,
        requireToken: true,
        token,
      });
    },
    onError: (error: any) => {
      console.error('Payment initialization failed:', error);
      console.error('Error response:', error?.response?.data);
      console.error('Error status:', error?.response?.status);
    },
  });
};
