import { useMutation } from "@tanstack/react-query";
import makeRequest from "@/config/axios";

export const useSubscribeToNewsletter = () =>
  useMutation({
    mutationKey: ["newsletter-subscribe"],
    mutationFn: (email: string) =>
      makeRequest({
        method: "POST",
        url: "products/newsletter/subscribe/",
        data: { email },
        requireToken: false,
      }),
  });
