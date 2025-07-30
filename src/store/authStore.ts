import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  organizer: boolean | false;
  login: (token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
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
