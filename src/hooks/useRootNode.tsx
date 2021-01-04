import { useMemo } from "react";

const useRootNode = () => {
  return useMemo(() => document.getElementById("__next"), []);
};

export default useRootNode;
