import React, { ReactFragment } from "react";

interface Props {
  children: ReactFragment;
}

const DefaultLayout: (props: Props) => ReactFragment = ({
  children,
}: Props) => <>{children}</>;

export default DefaultLayout;
