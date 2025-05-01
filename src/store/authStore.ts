import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loginUser: (token: string, data: User) => void;
  logoutUser: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      loginUser: (token: string, data: User) =>
        set({ isAuthenticated: true, token, user: data }),
      logoutUser: () => set({ isAuthenticated: false, token: null, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
