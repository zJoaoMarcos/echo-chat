"use client";

import { QueryClientProvider as TanstackClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/services/query-client";

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TanstackClientProvider client={queryClient}>
      {children}
    </TanstackClientProvider>
  );
};
