"use client";

import { useAuthStore } from "@/store/authStore";
import { ReactNode, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { initialize, fetchUserProfile } = useAuthStore();
  useEffect(() => {
    initialize();
    fetchUserProfile();
  }, [initialize, fetchUserProfile]);

  return <>{children}</>;
}
