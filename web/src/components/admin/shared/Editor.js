import React from "react";
import QuillToolbar, { formats, modules } from "./EditorToolbar";
import dynamic from "next/dynamic";

const Quill = typeof window === "object" ? require("react-quill") : () => false;
function Editor({ onChange, value }) {
  return (
    <div>
      <QuillToolbar />
      <div className="quillEditor">
        <Quill
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
        />
      </div>
    </div>
  );
}

export default Editor;
