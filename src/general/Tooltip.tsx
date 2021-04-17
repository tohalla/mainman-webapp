// eslint-disable-next-line import/no-extraneous-dependencies
import "tippy.js/dist/tippy.css";

import Tippy, { TippyProps } from "@tippyjs/react";
import React from "react";

const Tooltip = (props: TippyProps) => (
  <Tippy animation={false} hideOnClick={false} {...props} />
);

export default Tooltip;
