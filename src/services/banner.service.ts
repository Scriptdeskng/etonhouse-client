import { useQuery } from "@tanstack/react-query";
import makeRequest from "@/config/axios";
import { Banner } from "@/types/banner";

export const useActiveBanners = () => {
  return useQuery<Banner[]>({
    queryKey: ["active-banners"],
    queryFn: () =>
      makeRequest({
        url: "products/banners/active/",
        method: "GET",
        requireToken: false,
      }),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};
