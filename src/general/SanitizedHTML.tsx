import { sanitize } from "dompurify";
import React from "react";

const SanitizedHTML = ({ children }: { children?: string }) => {
  if (!children) {
    return null;
  }
  return (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{ __html: sanitize(children) }} />
  );
};

export default SanitizedHTML;
