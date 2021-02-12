import React, { ReactFragment, ReactNode } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { Flex } from "theme-ui";

import Button from "./Button";
import Loadable from "./Loadadble";

import useToggle from "src/hooks/useToggle";

interface Props {
  children: ReactFragment;
  title: ReactNode;
  initialExpand: boolean;
}

const CollapsibleSection = ({ children, title, initialExpand }: Props) => {
  const [expand, toggleExpand] = useToggle(initialExpand);
  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: "stretch",
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
