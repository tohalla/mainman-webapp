import React from "react";
import { Button, ButtonProps } from "theme-ui";

const PlainButton = (props: ButtonProps) => {
  return <Button variant="plain" {...props} />;
};

PlainButton.displayName = "PlainButton";

Button.defaultProps = {
  type: "button",
};

export default PlainButton;
