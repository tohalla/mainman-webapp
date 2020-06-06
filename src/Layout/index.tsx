import React, { ReactFragment } from "react";

interface Props {
  children: ReactFragment;
}

const DefaultLayout: (props: Props) => JSX.Element = ({ children }: Props) => (
  <>{children}</>
);

export default DefaultLayout;
