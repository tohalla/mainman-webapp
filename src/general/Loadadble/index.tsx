import React, { ReactNode, useRef } from "react";

import styled from "../../theme/styled";

import Loader from "./Loader";

interface Props {
  children: ReactNode;
  isLoading: boolean;
}

const Loadable = ({ isLoading, children }: Props) => {
  const el = useRef<HTMLDivElement>(null);
  if (!isLoading) {
    return <div ref={el}>{children}</div>;
  }

  return (
    <Container>
      <Loader height={el.current ? el.current.clientHeight : undefined} />
    </Container>
  );
};

const Container = styled.div<{ height?: number }>`
  display: flex;
  align-self: stretch;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Loadable;
