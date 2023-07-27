import parse from "html-react-parser";
import React from "react";
import styled from "styled-components";

const QuillContainer = styled.div`
  border: none !important;
`;

function EditorRead({ text }) {
  return (
    <div className="quill">
      <QuillContainer className="ql-container ql-snow">
        <div className="ql-editor ql-blank">{parse(text)}</div>
      </QuillContainer>
    </div>
  );
}

export default EditorRead;
