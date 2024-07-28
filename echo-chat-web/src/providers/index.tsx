"use client";

import React from "react";

import { ThemeProvider } from "./theme";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./auth";
import { RouterProvider } from "./router";
import { QueryClientProvider } from "./query-client";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient)
    return (
      <AuthProvider>
        <RouterProvider>
          <ThemeProvider attribute="class">
            <QueryClientProvider>{children}</QueryClientProvider>
            <ProgressBar
              height="4px"
              color="#3fc98f"
              options={{ showSpinner: false }}
            />
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </RouterProvider>
      </AuthProvider>
    );
}
