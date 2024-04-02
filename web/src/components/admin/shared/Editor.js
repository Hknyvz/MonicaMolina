import React from "react";
import QuillToolbar, { formats, modules } from "./EditorToolbar";
import dynamic from "next/dynamic";
import RichTextEditor from "./EditorTest";

// const Quill = dynamic(() => import("react-quill"), { ssr: false });

const Editor = ({ onChange, value }) => {
  return (
    // <div>
    //   <QuillToolbar />
    //   <div className="quillEditor">
    //     {document && (
    //       <Quill
    //         theme="snow"
    //         value={value}
    //         onChange={onChange}
    //         placeholder={"Write something awesome..."}
    //         modules={modules}
    //         formats={formats}
    //       />
    //     )}
    //   </div>
    // </div>
    <RichTextEditor
      placeholder={"Write something awesome..."}
      setValue={onChange}
      value={value}
    />
  );
};

export default Editor;
