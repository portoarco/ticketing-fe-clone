import { apiCall } from "@/helper/apiCall";
import { create } from "zustand";
import { useUserStore } from "./userStore";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  organizer: boolean | false;
  login: (token: string) => void;
  logout: () => void;
  fetchUserProfile: () => Promise<void>;
  initialize: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  token: null,
  organizer: false,

  login: (token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", "true");
    set({ isLoggedIn: true, token });
    console.log("Login token : ", get().token);
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
    console.log("Test_FetchUserProfile : First Phase");
    const { token } = get();
    console.log("Test_FetchUserProfile Token : ", token);

    if (!token) return;

    try {
      console.log("Test_FetchUserProfile : Second Phase");
      const res = await apiCall.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Test_FetchUserProfile : Third Phase");
      console.log("Fetched user data : ", res.data.result);

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
    const token = localStorage.getItem("token");
    console.log("Initialize - token :", token);
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    console.log("Initialize - loggedin :", localStorage.getItem("isLoggedIn"));

    if (token && loggedIn) {
      console.log("Zustand di reset ulang, ini halaman awal");
      await new Promise<void>((resolve) => {
        set({ token, isLoggedIn: true });
        resolve();
      });
      return true;
    } else {
      console.log("Token ada, posisi sedang login");
      return false;
    }
  },
}));
