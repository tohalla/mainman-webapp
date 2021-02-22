import { sanitize } from "dompurify";
import marked from "marked";
import React from "react";

const Markdown = ({ children }: { children: string }) => {
  return (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{ __html: sanitize(marked(children)) }} />
  );
};

export default Markdown;
