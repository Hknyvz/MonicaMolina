import { Popover, Typography } from "antd";
import parse from "html-react-parser";
import React from "react";
import styled from "styled-components";
import EditorRead from "./EditorRead";

const QuillContainer = styled.div`
  border: none !important;
`;

function EditorParagraph({ text, rowCount }) {
  const { Paragraph } = Typography;

  return (
    <div className="quill">
      <QuillContainer className="ql-container ql-snow">
        <div className="ql-editor ql-blank">
          <Popover content={<EditorRead text={text} />}>
            <Paragraph ellipsis={{ rows: rowCount }}>{parse(text)}</Paragraph>
          </Popover>
        </div>
      </QuillContainer>
    </div>
  );
}

export default EditorParagraph;
