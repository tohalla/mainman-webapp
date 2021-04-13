import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

declare module "slate" {
  type ElementFormat =
    | "blockquote"
    | "heading-one"
    | "heading-two"
    | "heading-three"
    | "heading-four"
    | "heading-five"
    | "heading-six"
    | "unordered-list"
    | "ordered-list"
    | "list-item"
    | "paragraph";

  type LeafFormat = Exclude<keyof CustomText, "text">;

  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
  type Descendant = CustomEditor | CustomElement | CustomText;
}

interface CustomEditor extends BaseEditor, ReactEditor, HistoryEditor {}
interface CustomText {
  text: string;
  italic?: boolean;
  bold?: boolean;
  underline?: boolean;
}
interface CustomElement {
  type: ElementFormat;
  children: CustomText[];
}
