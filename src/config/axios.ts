import axios from "axios";
import { getCookie } from "./cookies";
import { ApiRequestParams } from "@/types/api";

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
}: ApiRequestParams): Promise<any> => {
  if (requireToken) {
    const token = getCookie("accessToken");
    if (token) {
      Api.defaults.headers.Authorization = `Bearer ${token}`;
    }
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
