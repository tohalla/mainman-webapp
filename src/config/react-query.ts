import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: console.error,
      suspense: typeof window !== "undefined",
    },
    mutations: {},
  },
});
