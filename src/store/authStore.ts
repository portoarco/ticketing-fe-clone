import { apiCall } from "@/helper/apiCall";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  login: (token: string) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    set({ token: null });
  },

  initialize: () => {
    const token = localStorage.getItem("token");

    try {
    } catch (error) {
      console.log(error);
    }

    if (token) {
      set({ token });
    } else {
      set({ token: null });
    }

    console.log(token);
  },
}));
