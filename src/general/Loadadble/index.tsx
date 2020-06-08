import React from "react";

import styled from "../../theme/styled";

import Loader from "./Loader";

interface Props {
  children: JSX.Element;
  isLoading: boolean;
}

const Loadable = ({ isLoading, children }: Props) => {
  if (!isLoading) {
    return children;
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

export default Loadable;
