import axios from "axios";
import { ApiRequestParams } from "@/types/api";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

const Api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

// Request interceptor
Api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.status === 401) {
      toast.error("Unauthorized User");
      const authStore = useAuthStore.getState();
      authStore.logoutUser();
      window.location.href = `/account?redirect=shop`;
    }
    return Promise.reject(error);
  }
);

const makeRequest = async ({
  method = "GET",
  url,
  data = null,
  params = {},
  requireToken = false,
  content_type = "application/json",
  token,
}: ApiRequestParams): Promise<any> => {
  if (requireToken && token) {
    Api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  const response = await Api({
    method,
    url,
    data,
    params,
    headers: {
      "Content-Type": content_type,
    },
  });

  return response.data;
};

export default makeRequest;
