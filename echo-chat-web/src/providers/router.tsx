"use client"

import { PrivateRoute } from "@/components/private-route";
import { checkIsPublicRoute } from "@/utils/check-is-public-route";
import { usePathname } from "next/navigation";

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isPublicPage = checkIsPublicRoute(pathname);

  return (
    <>
      {isPublicPage && children}

      {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
    </>
  );
};