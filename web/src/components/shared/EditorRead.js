import parse from "html-react-parser";
import React from "react";

function EditorRead({ text }) {
  return (
    <div className="quill">
      <div className="ql-container ql-snow">
        <div className="ql-editor ql-blank">{parse(text)}</div>
      </div>
    </div>
  );
}

export default EditorRead;
