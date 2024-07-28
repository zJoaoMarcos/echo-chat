"use client"

import { APP_ROUTES } from "@/constants/app-routes";
import { checkIsAuthenticated } from "@/utils/check-is-authenticated";
import { useRouter } from "next/navigation";
import React from "react";

type PrivateRouteProps = { 
  children: React.ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) { 
  const { push } = useRouter()

  const isAuthenticated = checkIsAuthenticated()

  React.useEffect(() => {
    if (!isAuthenticated) { 
      push(APP_ROUTES.public.sign_in) 
    }
  }, [isAuthenticated, push])

  return ( 
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  )
}