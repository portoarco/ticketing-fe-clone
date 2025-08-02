"use client";

import { useAuthStore } from "@/store/authStore";
import { ReactNode, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { initialize, fetchUserProfile } = useAuthStore();
  useEffect(() => {
    const initializeAuth = async () => {
      const tokenExist = await initialize();

      if (tokenExist) {
        await fetchUserProfile();
      }
    };
    initializeAuth();
  }, [initialize, fetchUserProfile]);

  return <>{children}</>;
}
