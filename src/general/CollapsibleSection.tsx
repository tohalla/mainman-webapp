import React, { ReactFragment, ReactNode } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { Flex, FlexProps } from "theme-ui";

import Button from "./Button";
import Loadable from "./Loadadble";

import useToggle from "src/hooks/useToggle";

interface Props extends Omit<FlexProps, "title"> {
  children: ReactFragment;
  initialExpand: boolean;
  title: ReactNode;
}

const CollapsibleSection = ({
  children,
  title,
  initialExpand,
  sx,
  ...props
}: Props) => {
  const [expand, toggleExpand] = useToggle(initialExpand);
  return (
    <Flex
      {...props}
      sx={{
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: "stretch",
        ...sx,
      }}
    >
      <Button
        onClick={toggleExpand}
        sx={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          "h1,h2,h3,h4,h5,h6": { mr: 3 },
        }}
        variant="plain"
      >
        {title}
        {expand ? <FaAngleDown /> : <FaAngleRight />}
      </Button>
      <Loadable>{expand && children}</Loadable>
    </Flex>
  );
};

CollapsibleSection.defaultProps = {
  initialExpand: false,
};

export default CollapsibleSection;
