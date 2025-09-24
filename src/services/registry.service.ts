import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeRequest from "@/config/axios";
import useAuthStore from "@/store/authStore";
import { 
  CreateRegistryInput, 
  UpdateRegistryInput, 
  RegistryItemInput,
  RegistryPurchaseInput 
} from "@/types/registry";

export const useAllRegistries = (params?: any) => {
  return useQuery({
    queryKey: ["all-registries", { params }],
    queryFn: () =>
      makeRequest({
        url: "registries/",
        requireToken: false,
        params,
      }),
    retry: 1,
  });
};

export const useMyRegistries = () => {
  const { token } = useAuthStore();
  
  return useQuery({
    queryKey: ["my-registries"],
    queryFn: () =>
      makeRequest({
        url: "registries/",
        requireToken: true,
        token,
        params: { owner: 'me' }
      }),
    retry: 1,
  });
};

export const useSingleRegistry = (registryId: string | number) => {
  return useQuery({
    queryKey: ["registry", registryId],
    queryFn: () =>
      makeRequest({
        url: `registries/${registryId}/`,
        requireToken: false,
      }),
    enabled: !!registryId,
    retry: 1,
  });
};

export const useCreateRegistry = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();
  
  return useMutation({
    mutationFn: (data: CreateRegistryInput) => {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'cover_image' && value instanceof File) {
            formData.append(key, value);
          } else if (key === 'is_public') {
            formData.append(key, String(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });
      
      return makeRequest({
        url: "registries/",
        method: "POST",
        data: formData,
        requireToken: true,
        token,
        content_type: 'multipart/form-data',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-registries"] });
      queryClient.invalidateQueries({ queryKey: ["all-registries"] });
    },
  });
};

export const useUpdateRegistry = (registryId: string | number) => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();
  
  return useMutation({
    mutationFn: (data: UpdateRegistryInput) => {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'cover_image' && value instanceof File) {
            formData.append(key, value);
          } else if (key === 'is_public') {
            formData.append(key, String(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });
      
      return makeRequest({
        url: `registries/${registryId}/`,
        method: "PATCH",
        data: formData,
        requireToken: true,
        token,
        content_type: 'multipart/form-data',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registry", registryId] });
      queryClient.invalidateQueries({ queryKey: ["my-registries"] });
    },
  });
};

export const useAddItemToRegistry = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();
  
  return useMutation({
    mutationFn: ({ registryId, data }: { registryId: string | number; data: RegistryItemInput }) => {
      return makeRequest({
        url: `registries/${registryId}/add_item/`,
        method: "POST",
        data,
        requireToken: true,
        token,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["registry", variables.registryId] });
    },
  });
};

export const useRemoveItemFromRegistry = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();
  
  return useMutation({
    mutationFn: ({ registryId, itemId }: { registryId: string | number; itemId: number }) => {
      return makeRequest({
        url: `registries/${registryId}/remove_item/`,
        method: "POST",
        data: { item_id: itemId },
        requireToken: true,
        token,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["registry", variables.registryId] });
    },
  });
};

export const useAddGiftsToCart = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();
  
  return useMutation({
    mutationFn: ({ registryId, itemIds }: { registryId: string | number; itemIds: number[] }) => {
      return makeRequest({
        url: `registries/${registryId}/add_gifts_to_cart/`,
        method: "POST",
        data: { item_ids: itemIds },
        requireToken: true,
        token,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useDeleteRegistry = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();
  
  return useMutation({
    mutationFn: (registryId: string | number) => {
      return makeRequest({
        url: `registries/${registryId}/`,
        method: "DELETE",
        requireToken: true,
        token,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-registries"] });
      queryClient.invalidateQueries({ queryKey: ["all-registries"] });
    },
  });
};

// Purchase service hooks
export const useRegistryPurchases = (params?: any) => {
  const { token } = useAuthStore();
  
  return useQuery({
    queryKey: ["registry-purchases", { params }],
    queryFn: () =>
      makeRequest({
        url: "purchases/",
        requireToken: true,
        token,
        params,
      }),
    retry: 1,
  });
};

export const useCreatePurchase = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: RegistryPurchaseInput) => {
      return makeRequest({
        url: "purchases/",
        method: "POST",
        data,
        requireToken: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registry-purchases"] });
      queryClient.invalidateQueries({ queryKey: ["registry"] });
    },
  });
};

export const useFulfillPurchase = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();
  
  return useMutation({
    mutationFn: (purchaseId: number) => {
      return makeRequest({
        url: `purchases/${purchaseId}/fulfill/`,
        method: "POST",
        requireToken: true,
        token,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registry-purchases"] });
      queryClient.invalidateQueries({ queryKey: ["registry"] });
    },
  });
};