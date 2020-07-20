import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import messages from "../messages";

import PlainButton from "./PlainButton";

interface Props {
  children: ReactNode;
}

const ReturnButton = ({ children }: Props) => {
  const { back } = useRouter();

  return <PlainButton onClick={back}>{children}</PlainButton>;
};

ReturnButton.defaultProps = {
  children: <FormattedMessage {...messages.return} />,
};

export default ReturnButton;
