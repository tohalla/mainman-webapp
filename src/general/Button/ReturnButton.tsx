import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import messages from "../messages";

import Button from ".";

interface Props {
  children: ReactNode;
}

const ReturnButton = ({ children }: Props) => {
  const { back } = useRouter();

  return (
    <Button onClick={back} variant="plain">
      {children}
    </Button>
  );
};

ReturnButton.defaultProps = {
  children: <FormattedMessage {...messages.return} />,
};

export default ReturnButton;
