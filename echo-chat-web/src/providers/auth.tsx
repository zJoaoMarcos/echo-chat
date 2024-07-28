"use client"

import { AuthProvider as AuthenticateProvider } from "@/contexts/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthenticateProvider>{children}</AuthenticateProvider>;
};