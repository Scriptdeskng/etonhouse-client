import { useQuery } from "@tanstack/react-query";
import makeRequest from "@/config/axios";

export const useAllProducts = (params?: any) => {
  return useQuery({
    queryKey: ["all-products", { params }],
    queryFn: () =>
      makeRequest({
        url: "products/products/",
        requireToken: false,
        params,
      }),
    retry: 1,
  });
};

export const useSingleProduct = (slug: string) => {
  const id = slug === "undefined" ? "" : slug;

  return useQuery({
    queryKey: ["single-product", { id }],
    queryFn: () =>
      makeRequest({
        url: `products/products/${id}`,
        requireToken: false,
      }),
    enabled: !!slug,
    retry: 1,
  });
};

export const useBestSellerProducts = () => {
  return useQuery({
    queryKey: ["best-seller"],
    queryFn: () =>
      makeRequest({
        url: "products/products/bestsellers/",
        requireToken: false,
      }),
    retry: 1,
  });
};

export const useRecommendedProducts = () => {
  return useQuery({
    queryKey: ["recommended"],
    queryFn: () =>
      makeRequest({
        url: "products/products/recommended/",
        requireToken: false,
      }),
    retry: 1,
  });
};

export const useProductByCategory = (slug: string, params?: any) => {
  return useQuery({
    queryKey: ["product-by-category", { slug, params }],
    queryFn: () =>
      makeRequest({
        url: `products/categories/${slug}/products/`,
        requireToken: false,
        params,
      }),
    enabled: !!slug,
    retry: 1,
  });
};
