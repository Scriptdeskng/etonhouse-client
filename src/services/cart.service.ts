import { useMutation } from "@tanstack/react-query";
import makeRequest from "@/config/axios";
import toast from "react-hot-toast";

export const useAddToCart = () => {
  const mutation = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        method: "POST",
        url: "cart/add/",
        data: data,
        requireToken: false,
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

  return { mutation };
};
