import { useQuery, useMutation } from "@tanstack/react-query";
import makeRequest from "@/config/axios";

export const useAllPackages = (params?: any) => {
  return useQuery({
    queryKey: ["all-packages", { params }],
    queryFn: () =>
      makeRequest({
        url: "packages/",
        requireToken: false,
        params,
      }),
    retry: 1,
  });
};

export const useSinglePackage = (slug: string) => {
  const id = slug === "undefined" ? "" : slug;

  return useQuery({
    queryKey: ["single-package", { id }],
    queryFn: () =>
      makeRequest({
        url: `packages/${id}/`,
        requireToken: false,
      }),
    enabled: !!slug,
    retry: 1,
  });
};

export const useCheckoutPackage = () => {
  return useMutation({
    mutationFn: (slug: string) =>
      makeRequest({
        url: `packages/${slug}/checkout/`,
        method: "POST",
        requireToken: false,
      }),
  });
};