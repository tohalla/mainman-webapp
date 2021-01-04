import { useMemo } from "react";

const useRootNode = () => {
  return useMemo(
    () => typeof document !== "undefined" && document.getElementById("__next"),
    [typeof document === "undefined"]
  );
};

export default useRootNode;
