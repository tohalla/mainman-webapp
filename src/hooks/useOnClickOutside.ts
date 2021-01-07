import { RefObject, useLayoutEffect } from "react";

import useRootNode from "./useRootNode";

const useOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  fn: (event: MouseEvent | TouchEvent) => void
) => {
  const rootNode = useRootNode();
  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      ref.current &&
      event.target instanceof Element &&
      !ref.current.contains(event.target)
    ) {
      fn(event);
    }
  };

  useLayoutEffect(() => {
    if (!rootNode) {
      return;
    }
    rootNode.addEventListener("mousedown", handleClickOutside);
    rootNode.addEventListener("touchstart", handleClickOutside);
    return () => {
      rootNode.removeEventListener("mousedown", handleClickOutside);
      rootNode.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, fn, rootNode]);
};

export default useOnClickOutside;
