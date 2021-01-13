import React from "react";

import { Button, ButtonProps } from "rebass";

const PlainButton = (props: Omit<ButtonProps, "css">) => {
  return <Button variant="plain" {...props} />;
};

PlainButton.displayName = "PlainButton";

Button.defaultProps = {
  type: "button",
};

export default PlainButton;
