import { Editor, EditorState } from "draft-js";
import React, { useRef, useState } from "react";
import { Box, Flex } from "theme-ui";

import Toolbar from "./Toolbar";

const RichEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorEl = useRef<Editor>(null);

  return (
    <Flex sx={{ flexDirection: "column", alignSelf: "stretch" }}>
      <Toolbar editorState={editorState} onChange={setEditorState} />
      <Box
        onClick={() => editorEl.current?.focus()}
        sx={{ backgroundColor: "greyscale.9", p: 3 }}
      >
        <Editor
          ref={editorEl}
          editorState={editorState}
          onChange={setEditorState}
        />
      </Box>
    </Flex>
  );
};

export default RichEditor;
