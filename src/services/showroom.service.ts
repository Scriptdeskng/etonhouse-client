import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";
import makeRequest from "@/config/axios";

interface Showroom {
  id: number;
  name: string;
  address: string;
  opening_time: string;
  closing_time: string;
  google_map_link: string;
  created_at: string;
}

interface ShowroomsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Showroom[];
}

export const useAllShowrooms = (
  params?: any,
  options?: Omit<UseQueryOptions<ShowroomsResponse, Error, ShowroomsResponse, QueryKey>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["all-showrooms", { params }],
    queryFn: () =>
      makeRequest({
        url: "products/showrooms/",
        method: "GET",
        requireToken: false,
        params,
      }),
    retry: 1,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

export const useSingleShowroom = (id: number) => {
  return useQuery({
    queryKey: ["single-showroom", { id }],
    queryFn: () =>
      makeRequest({
        url: `products/showrooms/${id}/`,
        method: "GET",
        requireToken: false,
      }),
    enabled: !!id,
    retry: 1,
  });
};