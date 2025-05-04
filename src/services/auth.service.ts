import { useMutation } from "@tanstack/react-query";
import makeRequest from "@/config/axios";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/router";

export const useLogin = (redirect?: string | null) => {
  const { loginUser } = useAuthStore();
  const route = useRouter();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: any) => {
      const response = makeRequest({
        method: "POST",
        url: "auth/login/",
        data: data,
      });

      return response;
    },
    onSuccess: (response) => {
      loginUser(response?.access, response?.user);
      toast.success("Login successful!");
      route.push(`/${redirect ?? "dashboard"}`);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.non_field_errors[0] || "An error occured!"
      );
    },
  });
};

export const useRegister = () => {
  const { loginUser } = useAuthStore();
  const route = useRouter();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: any) => {
      const response = makeRequest({
        method: "POST",
        url: "auth/registration/",
        data: data,
      });

      return response;
    },
    onSuccess: (response) => {
      loginUser(response?.access, response?.user);
      toast.success("Registration successful!");
      route.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.email[0] ??
          error?.response?.data?.password[0] ??
          "An error occured!"
      );
    },
  });
};
