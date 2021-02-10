import React, { MouseEvent, KeyboardEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const handleTokenSelect = (event: MouseEvent | KeyboardEvent) => {
  if (typeof window !== "undefined") {
    const selection = window.getSelection();
    const r = document.createRange();
    r.selectNodeContents(event.target as HTMLSpanElement);
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(r);
    }
  }
};

const SelectOnClick = ({ children }: Props) => {
  return (
    <span
      onClick={handleTokenSelect}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          handleTokenSelect(event);
        }
      }}
      role="button"
      tabIndex={0}
    >
      {children}
    </span>
  );
};

export default SelectOnClick;
