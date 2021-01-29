import React, { ReactFragment } from "react";

import { Flex } from "theme-ui";

interface Props {
  children: ReactFragment;
}

const Section = ({ children }: Props) => {
  return (
    <Flex
      backgroundColor="greyscale.9"
      px={[2, 4]}
      py={3}
      sx={{ boxShadow: 0, flexDirection: "column" }}
    >
      {children}
    </Flex>
  );
};

export default Section;
