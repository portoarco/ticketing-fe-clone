import { create } from "zustand";

interface UserState {
  first_name: string;
  last_name: string;
  organizer_name: string;
  email: string;
  country: string;
  phone_code: string;
  phone_number: string;
  referral_code: string;
  referral_user: [];
  isVerified: boolean | undefined;
  avatar: string;
  setUserProfile: (
    data: Partial<Omit<UserState, "setUserProfile" | "resetUserProfile">>
  ) => void;
  resetUserProfile: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  first_name: "",
  last_name: "",
  organizer_name: "",
  isVerified: false,
  email: "",
  country: "",
  referral_code: "",
  referral_user: [],
  avatar: "",
  phone_code: "",
  phone_number: "",

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
      avatar: "",
      isVerified: undefined,
      email: "",
      country: "",
      referral_code: "",
      referral_user: [],
      phone_code: "",
      phone_number: "",
    });
  },
}));
