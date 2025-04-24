import { useQuery } from "@tanstack/react-query";
import makeRequest from "@/config/axios";

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: () =>
      makeRequest({
        url: "products/products/",
        requireToken: false,
      }),
    retry: 1,
  });
};

export const useSingleProduct = (slug: string) => {
  return useQuery({
    queryKey: ["single-product", { slug }],
    queryFn: () =>
      makeRequest({
        url: `products/products/${slug}`,
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

export const useProductByCategory = (slug: string) => {
  return useQuery({
    queryKey: ["product-by-category", { slug }],
    queryFn: () =>
      makeRequest({
        url: `products/categories/${slug}/products/`,
        requireToken: false,
      }),
    enabled: !!slug,
    retry: 1,
  });
};
