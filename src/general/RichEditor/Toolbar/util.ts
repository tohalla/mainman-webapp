import { Editor, Element, Transforms } from "slate";
import { ReactEditor } from "slate-react";

import { ElementFormat } from "../Element";

const LIST_TYPES = ["ordered-list", "unordered-list"];

export const toggleBlockStyle = (
  editor: ReactEditor,
  { format, isActive }: { format: ElementFormat; isActive: boolean }
) => {
  // need to unwrap all active list items before doing anything
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      typeof n.type === "string" &&
      LIST_TYPES.includes(n.type),
    split: true,
  });

  if (isActive) {
    return Transforms.setNodes(editor, { type: "paragraph" });
  }

  if (LIST_TYPES.includes(format)) {
    Transforms.setNodes(editor, { type: "list-item" });
    return Transforms.wrapNodes(editor, { type: format, children: [] });
  }

  Transforms.setNodes(editor, { type: format });
};
