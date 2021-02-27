import React from "react";
import { Editor, Element } from "slate";
import { useSlate } from "slate-react";
import { ButtonProps } from "theme-ui";

import { ElementFormat } from "../Element";
import { LeafFormat } from "../Leaf";

import { toggleBlockStyle } from "./util";

import Button from "src/general/Button";

export const ToolbarButton = ({
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

export const InlineStyleButton: React.FC<{
  format: LeafFormat;
}> = ({ children, format }) => {
  const { marks, addMark, removeMark } = useSlate();
  const isActive = Boolean(marks?.[format] === true);
  return (
    <ToolbarButton
      isActive={isActive}
      onMouseDown={() =>
        isActive ? removeMark(format) : addMark(format, true)
      }
    >
      {children}
    </ToolbarButton>
  );
};

export const BlockStyleButton: React.FC<{
  format: ElementFormat;
}> = ({ children, format }) => {
  const editor = useSlate();
  const isActive = Boolean(
    Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
    }).next().value
  );
  return (
    <ToolbarButton
      isActive={isActive}
      onMouseDown={() => toggleBlockStyle(editor, { format, isActive })}
    >
      {children}
    </ToolbarButton>
  );
};
