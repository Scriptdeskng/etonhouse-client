import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";
import makeRequest from "@/config/axios";

interface Testimonial {
  id: number;
  name: string;
  buyer_image: string;
  product_image: string;
  message: string;
  created_at: string;
  is_approved: boolean;
}

interface TestimonialsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Testimonial[];
}

export const useAllTestimonials = (
  params?: any,
  options?: Omit<UseQueryOptions<TestimonialsResponse, Error, TestimonialsResponse, QueryKey>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["all-testimonials", { params }],
    queryFn: () =>
      makeRequest({
        url: "products/testimonials/",
        method: "GET",
        requireToken: false,
        params: {
          is_approved: true,
          ...params,
        },
      }),
    retry: 1,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useSingleTestimonial = (id: number) => {
  return useQuery({
    queryKey: ["single-testimonial", { id }],
    queryFn: () =>
      makeRequest({
        url: `products/testimonials/${id}/`,
        method: "GET",
        requireToken: false,
      }),
    enabled: !!id,
    retry: 1,
  });
};