import React, { ReactFragment } from "react";

import { Flex } from "rebass";

interface Props {
  children: ReactFragment;
}

const Section = ({ children }: Props) => {
  return (
    <Flex
      backgroundColor="greyscale.9"
      flexDirection="column"
      px={[2, 4]}
      py={3}
      sx={{ boxShadow: 0 }}
    >
      {children}
    </Flex>
  );
};

export default Section;
