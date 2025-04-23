import { useQuery } from "@tanstack/react-query";
import makeRequest from "@/config/axios";

export const useAllCategories = () => {
  return useQuery({
    queryKey: ["all-categories"],
    queryFn: () =>
      makeRequest({
        url: "products/categories/",
        requireToken: false,
      }),
    retry: 1,
  });
};
