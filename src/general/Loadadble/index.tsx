import React, { ReactNode, Suspense } from "react";

import styled from "../../theme/styled";

import Loader from "./Loader";

interface Props {
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
  align-self: stretch;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Loadable = (props: Props) => {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <Suspense
      fallback={
        <Container>
          <Loader />
        </Container>
      }
    >
      {props.children}
    </Suspense>
  );
};

export default Loadable;
