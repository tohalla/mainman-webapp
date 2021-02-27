import React from "react";
import { RenderLeafProps } from "slate-react";

export type LeafFormat = "italic" | "bold" | "underline";

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  let content = children;
  if (leaf.bold) {
    content = <strong>{content}</strong>;
  }

  if (leaf.italic) {
    content = <em>{content}</em>;
  }

  if (leaf.underline) {
    content = <u>{content}</u>;
  }

  return <span {...attributes}>{content}</span>;
};

export default Leaf;
