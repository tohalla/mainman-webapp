import { ReactNode, useContext } from "react";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

import LayoutContext from "src/Layout/LayoutContext";

const useTitle = (title: ReactNode) => {
  const { setTitle } = useContext(LayoutContext);

  useIsomorphicLayoutEffect(() => {
    setTitle(title);
  }, [title]);
};

export default useTitle;
