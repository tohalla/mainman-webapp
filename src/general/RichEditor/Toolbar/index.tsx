import React from "react";
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaUnderline,
} from "react-icons/fa";
import { defineMessages, FormattedMessage } from "react-intl";
import { Flex, FlexProps } from "theme-ui";

import { BlockStyleButton, InlineStyleButton } from "./buttons";
import Headings from "./Headings";

const messages = defineMessages({
  // rich editor blockquote label
  blockquoteLabel: "Blockquote",
});

const Group = ({ children, sx, ...props }: FlexProps) => (
  <Flex
    sx={{ alignItems: "center", "&:not(:first-child)": { ml: [0, 5] }, ...sx }}
    {...props}
  >
    {children}
  </Flex>
);

const Toolbar = () => (
  <Flex
    sx={{
      backgroundColor: "greyscale.0",
      p: 2,
      alignItems: ["stretch", "center"],
      flexDirection: ["column", "row"],
    }}
  >
    <Group sx={{ justifyContent: ["space-between", "inherit"] }}>
      <Group>
        <InlineStyleButton format="bold">
          <FaBold />
        </InlineStyleButton>
        <InlineStyleButton format="italic">
          <FaItalic />
        </InlineStyleButton>
        <InlineStyleButton format="underline">
          <FaUnderline />
        </InlineStyleButton>
      </Group>
      <Group>
        <BlockStyleButton format="ordered-list">
          <FaListOl />
        </BlockStyleButton>
        <BlockStyleButton format="unordered-list">
          <FaListUl />
        </BlockStyleButton>
      </Group>
    </Group>
    <Group>
      <BlockStyleButton format="blockquote">
        <FormattedMessage {...messages.blockquoteLabel} />
      </BlockStyleButton>
    </Group>
    <Group>
      <Headings />
    </Group>
  </Flex>
);

export default Toolbar;
