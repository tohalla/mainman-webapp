import React, { ReactFragment } from "react";

import MainNavigation from "../general/Navigation/MainNavigation";

interface Props {
  children: ReactFragment;
}

const DefaultLayout: (props: Props) => JSX.Element = ({ children }: Props) => (
  <>
    <MainNavigation />
    <main>{children}</main>
  </>
);

export default DefaultLayout;
