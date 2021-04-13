import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // TODO: sentry errors
      // eslint-disable-next-line  no-console
      onError: console.error,
      suspense: typeof window !== "undefined",
    },
    mutations: {},
  },
});
