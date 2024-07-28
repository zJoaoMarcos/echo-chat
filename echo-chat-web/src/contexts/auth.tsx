"use client"

import React, { createContext, useContext, useEffect } from "react";
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { IUser } from "@/@types/User";
import { cookieValues } from "@/constants/cookie-values";
import { api } from "@/services/api";
import { SignIn, getUserProfile } from "@/services/requests/user";
import { APP_ROUTES } from "@/constants/app-routes";

interface AuthContextData {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextData);

export const logout = () => {
  // clean cookies and local/session storage
  // redirect to signIn page

    destroyCookie(undefined, cookieValues.accessToken, {
      path: '/'
    })
    destroyCookie(undefined, cookieValues.refreshToken, {
      path: '/'
    })

    window.location.replace('/sign-in')
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<IUser | null>(
    null
  );
  const isAuthenticated = !!user;

  const router = useRouter()

  const login = async (identifier: string, password: string) => {
    try {
      const { user, accessToken } = await SignIn({ identifier, password });

      setCookie(undefined, cookieValues.accessToken, accessToken, {
        maxAge: 60 * 60 * 1 * 24, // 24 hours
        path: '/',
      })

      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      setUser(user);
      
      toast.success('Login realizado com sucesso', { 
        position: 'top-right'
      })
      
      router.push(APP_ROUTES.private.chat)

    } catch (error: any) {
      toast.error(error?.message, {
        position: 'top-right',
        duration: 2000
      })
    }
  };

  useEffect(() => {
    const { [cookieValues.accessToken]: accessToken } = parseCookies();

    if (accessToken) { 
      getUserProfile().then(res => setUser(res.user))
    }
  }, [isAuthenticated])

   return (
    <AuthContext.Provider 
      value={{ user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider >
   )
}

export const useAuth = () => useContext(AuthContext);