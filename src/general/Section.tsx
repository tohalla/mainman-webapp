import React, { ReactFragment } from "react";
import { Flex } from "rebass";

interface Props {
  children: ReactFragment;
}

const Section = ({ children }: Props) => {
  return (
    <Flex
      px={[2, 4]}
      py={3}
      sx={{
        backgroundColor: "greyscale.9",
        boxShadow: 0,
      }}
    >
      {children}
    </Flex>
  );
};

export default Section;
