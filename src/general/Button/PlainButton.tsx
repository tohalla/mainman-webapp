import React from "react";
import { Button, ButtonProps } from "rebass";

export const PlainButton = (props: Omit<ButtonProps, "css">) => {
  return <Button variant="plain" {...props} />;
};

export default PlainButton;
