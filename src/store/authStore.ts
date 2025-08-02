import { apiCall } from "@/helper/apiCall";
import { create } from "zustand";
import { useUserStore } from "./userStore";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  organizer: boolean | false;
  login: (token: string) => void;
  logout: () => void;
  fetchUserProfile: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  token: null,
  organizer: false,

  login: (token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", "true");
    set({ isLoggedIn: true, token });
  },

  logout: () => {
    // console.log("Logout terpanggil");
    localStorage.removeItem("token");
    localStorage.removeItem("organizer");
    localStorage.removeItem("isLoggedIn");
    set({ isLoggedIn: false, token: null });
  },

  // Eky - start
  fetchUserProfile: async () => {
    const { token } = get();

    if (!token) return;

    try {
      const res = await apiCall.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const {
        first_name,
        last_name,
        email,
        organizer_name,
        phone_number,
        referral_code,
      } = res.data.result;

      useUserStore.getState().setUserProfile({
        first_name,
        last_name,
        email,
        organizer_name,
        phone_number,
        referral_code,
      });

      const newToken = res.data.token;
      get().login(newToken);
    } catch (error) {
      console.log("Failed to fetch user data, the token is invalid");
      get().logout();
    }
  },

  // Eky - end

  initialize: async () => {
    const token = await localStorage.getItem("token");
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (token && loggedIn) {
      console.log("Zustand di reset ulang, ini halaman awal");
      set({ token, isLoggedIn: true });
    } else {
      console.log("Token ada, posisi sedang login");
    }
  },
}));
