import { ReactNode, useContext, useEffect } from "react";

import LayoutContext from "src/Layout/LayoutContext";

const useTitle = (title: ReactNode) => {
  const { setTitle } = useContext(LayoutContext);

  useEffect(() => {
    setTitle(title);
  }, [title]);
};

export default useTitle;
