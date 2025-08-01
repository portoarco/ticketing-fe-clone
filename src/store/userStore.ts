import { create } from "zustand";

interface UserState {
  first_name: string;
  last_name: string;
  organizer_name: string;
  email: string;
  country: string;
  phone_code: number;
  phone_number: number;
  referral_code: string;
  setUserProfile: (
    data: Partial<Omit<UserState, "setUserProfile" | "resetUserProfile">>
  ) => void;
  resetUserProfile: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  first_name: "",
  last_name: "",
  organizer_name: "",
  email: "",
  country: "",
  referral_code: "",
  phone_code: 0,
  phone_number: 0,

  setUserProfile: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
  resetUserProfile: () => {
    set({
      first_name: "",
      last_name: "",
      organizer_name: "",
      email: "",
      country: "",
      referral_code: "",
      phone_code: 0,
      phone_number: 0,
    });
  },
}));
