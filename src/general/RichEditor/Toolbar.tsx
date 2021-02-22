import {
  DraftBlockType,
  DraftInlineStyle,
  EditorProps,
  EditorState,
  RichUtils,
} from "draft-js";
import React from "react";
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaUnderline,
} from "react-icons/fa";
import { defineMessages, FormattedMessage } from "react-intl";
import { ButtonProps, Flex, FlexProps } from "theme-ui";

import Button from "../Button";

import useToggle from "src/hooks/useToggle";

interface Props extends Pick<EditorProps, "onChange"> {
  editorState: EditorState;
}

const messages = defineMessages({
  // rich editor heading button label
  headingsLabel: "Headings",
  // rich editor code block button label
  codeBlockLabel: "Code Block",
  // rich editor blockquote label
  blockquoteLabel: "Blockquote",
});

const ToolbarButton = ({
  sx,
  isActive,
  onMouseDown,
  ...props
}: Omit<ButtonProps, "onClick"> & { isActive: boolean }) => (
  <Button
    onMouseDown={(event) => {
      event.preventDefault();
      onMouseDown?.(event);
    }}
    sx={{
      p: 2,
      px: 3,
      color: isActive ? "greyscale.9" : "greyscale.6",
      textDecoration: "none",
      "&:hover": "accent",
      lineHeight: "1px",
      ...sx,
    }}
    variant="plain"
    {...props}
  />
);

const InlineStyleButton: React.FC<
  { format: string; inlineStyle: DraftInlineStyle } & Props
> = ({ format, inlineStyle, editorState, onChange, ...props }) => {
  const isActive = inlineStyle.has(format);
  return (
    <ToolbarButton
      isActive={isActive}
      onMouseDown={() =>
        onChange(RichUtils.toggleInlineStyle(editorState, format))
      }
      {...props}
    />
  );
};

const BlockStyleButton: React.FC<
  { format: string; blockType: DraftBlockType } & Props
> = ({ format, blockType, editorState, onChange, ...props }) => {
  const isActive = blockType === format;
  return (
    <ToolbarButton
      isActive={isActive}
      onMouseDown={() =>
        onChange(RichUtils.toggleBlockType(editorState, format))
      }
      {...props}
    />
  );
};

const Headings: React.FC<{ blockType: DraftBlockType } & Props> = (props) => {
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  return (
    <Group>
      <ToolbarButton
        isActive={props.blockType.startsWith("header")}
        onMouseDown={toggleIsExpanded}
      >
        <FormattedMessage {...messages.headingsLabel} />
      </ToolbarButton>
      {isExpanded && (
        <>
          <BlockStyleButton {...props} format="header-one">
            H1
          </BlockStyleButton>
          <BlockStyleButton {...props} format="header-two">
            H2
          </BlockStyleButton>
          <BlockStyleButton {...props} format="header-three">
            H3
          </BlockStyleButton>
          <BlockStyleButton {...props} format="header-four">
            H4
          </BlockStyleButton>
          <BlockStyleButton {...props} format="header-five">
            H5
          </BlockStyleButton>
          <BlockStyleButton {...props} format="header-six">
            H6
          </BlockStyleButton>
        </>
      )}
    </Group>
  );
};

const Group = ({ children, sx, ...props }: FlexProps) => (
  <Flex sx={{ alignItems: "center", "& + &": { ml: 5 }, ...sx }} {...props}>
    {children}
  </Flex>
);

const Toolbar = ({ editorState, onChange }: Props) => {
  const props = {
    editorState,
    onChange,
  };
  const inlineStyle = editorState.getCurrentInlineStyle();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(editorState.getSelection().getStartKey())
    .getType();

  return (
    <Flex sx={{ backgroundColor: "greyscale.0", p: 2, alignItems: "center" }}>
      <Group>
        <InlineStyleButton {...props} format="BOLD" inlineStyle={inlineStyle}>
          <FaBold />
        </InlineStyleButton>
        <InlineStyleButton {...props} format="ITALIC" inlineStyle={inlineStyle}>
          <FaItalic />
        </InlineStyleButton>
        <InlineStyleButton
          {...props}
          format="UNDERLINE"
          inlineStyle={inlineStyle}
        >
          <FaUnderline />
        </InlineStyleButton>
      </Group>
      <Group>
        <BlockStyleButton
          {...props}
          blockType={blockType}
          format="ordered-list-item"
        >
          <FaListOl />
        </BlockStyleButton>
        <BlockStyleButton
          {...props}
          blockType={blockType}
          format="unordered-list-item"
        >
          <FaListUl />
        </BlockStyleButton>
      </Group>
      <Group>
        <BlockStyleButton {...props} blockType={blockType} format="blockquote">
          <FormattedMessage {...messages.blockquoteLabel} />
        </BlockStyleButton>
        <BlockStyleButton {...props} blockType={blockType} format="code-block">
          <FormattedMessage {...messages.codeBlockLabel} />
        </BlockStyleButton>
      </Group>
      <Headings {...props} blockType={blockType} />
    </Flex>
  );
};

export default Toolbar;
