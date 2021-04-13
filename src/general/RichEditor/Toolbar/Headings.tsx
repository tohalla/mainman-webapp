import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Editor, Element } from "slate";
import { useSlateStatic } from "slate-react";

import { BlockStyleButton, ToolbarButton } from "./buttons";

import useToggle from "src/hooks/useToggle";

const messages = defineMessages({
  // rich editor heading button label
  headingsLabel: "Headings",
});

const Headings = () => {
  const [isExpanded, toggleIsExpanded] = useToggle(false);
  const slate = useSlateStatic();
  const isActive = Boolean(
    Editor.nodes(slate, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        typeof n.type === "string" &&
        n.type.startsWith("heading"),
    }).next().value
  );

  return (
    <>
      <ToolbarButton isActive={isActive} onMouseDown={toggleIsExpanded}>
        <FormattedMessage {...messages.headingsLabel} />
      </ToolbarButton>
      {isExpanded && (
        <>
          <BlockStyleButton format="heading-one">H1</BlockStyleButton>
          <BlockStyleButton format="heading-two">H2</BlockStyleButton>
          <BlockStyleButton format="heading-three">H3</BlockStyleButton>
          <BlockStyleButton format="heading-four">H4</BlockStyleButton>
          <BlockStyleButton format="heading-five">H5</BlockStyleButton>
          <BlockStyleButton format="heading-six">H6</BlockStyleButton>
        </>
      )}
    </>
  );
};

export default Headings;
