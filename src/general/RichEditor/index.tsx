import React, { useRef, useState } from "react";
import { createEditor, Node } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import { Flex, Box } from "theme-ui";

import Element from "./Element";
import Leaf from "./Leaf";
import Toolbar from "./Toolbar";

const RichEditor = () => {
  const editor = useRef(withHistory(withReact(createEditor())));
  const [value, setValue] = useState<Node[]>([
    {
      type: "paragraph",
      children: [
        { text: "This is editable " },
        { text: "rich", bold: true },
        { text: " text, " },
        { text: "much", italic: true },
        { text: " better than a " },
        { text: "<textarea>", code: true },
        { text: "!" },
      ],
    },
  ]);

  return (
    <Slate editor={editor.current} onChange={setValue} value={value}>
      <Flex sx={{ flexDirection: "column", alignSelf: "stretch" }}>
        <Toolbar />
        <Box
          sx={{
            backgroundColor: "greyscale.9",
            p: 3,
            "p:last-of-type": { mb: 0 },
          }}
        >
          <Editable renderElement={Element} renderLeaf={Leaf} spellCheck />
        </Box>
      </Flex>
    </Slate>
  );
};

export default RichEditor;
