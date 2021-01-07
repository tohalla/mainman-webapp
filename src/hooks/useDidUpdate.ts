import { DependencyList, useEffect, useRef } from "react";

const useDidUpdate = <T extends DependencyList>(
  cb: (prev: T) => void | (() => void | undefined),
  deps: T
) => {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    if (ref.current) {
      return cb(ref.current);
    }
  }, deps);

  useEffect(() => {
    ref.current = deps;
  }, [deps]);
};

export default useDidUpdate;
