import React from "react";
import { RenderElementProps } from "slate-react";

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case "blockquote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>;
    case "heading-four":
      return <h4 {...attributes}>{children}</h4>;
    case "heading-five":
      return <h5 {...attributes}>{children}</h5>;
    case "heading-six":
      return <h6 {...attributes}>{children}</h6>;
    case "unordered-list":
      return <ul {...attributes}>{children}</ul>;
    case "ordered-list":
      return <ol {...attributes}>{children}</ol>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default Element;
