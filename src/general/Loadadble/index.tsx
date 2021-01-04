import React, { ReactNode, Suspense } from "react";

import styled from "../../theme/styled";

import Loader from "./Loader";

interface Props {
  children: ReactNode;
  isLoading?: boolean;
}

const Loadable = ({ isLoading, children }: Props) => {
  if (isLoading === false) {
    return <>{children}</>;
  }

  return (
    <Container>
      <Loader />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-self: stretch;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const WithSuspense = (props: Props) => {
  if (typeof window === "undefined") {
    return <Loadable {...props} />;
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

export default WithSuspense;
