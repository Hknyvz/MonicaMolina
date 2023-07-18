import React from "react";

import { QuillEditor } from "./Editor.styled";
import EditorToolbar, { formats, modules } from "./EditorToolbar";

function Editor({ onChange, value }) {
  return (
    <div>
      <EditorToolbar />
      <QuillEditor
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export default Editor;
