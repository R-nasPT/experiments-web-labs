"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

type providerProps = {
  children: ReactNode;
};

export default function ReactQueryProvider({ children }: providerProps) {
  const queryClient = new QueryClient();
  //   const [queryClient] = useState(() => new QueryClient()) // <---แบบนี้ก็ได้
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
