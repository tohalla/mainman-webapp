import React, { ReactNode, Suspense } from "react";
import { Flex } from "theme-ui";

import Loader from "./Loader";

interface Props {
  children: ReactNode;
}

const Loadable = (props: Props) => {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <Suspense
      fallback={
        <Flex
          sx={{
            flex: 1,
            alignSelf: "stretch",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </Flex>
      }
    >
      {props.children}
    </Suspense>
  );
};

export default Loadable;
