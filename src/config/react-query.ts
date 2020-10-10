import { ReactQueryConfig } from "react-query";

export const queryConfig: ReactQueryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    onError: console.error,
  },
  // shared: {
  //   suspense: typeof window !== "undefined",
  // },
};
