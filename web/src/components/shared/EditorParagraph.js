import { Popover, Typography } from "antd";
import parse from "html-react-parser";
import React from "react";
import EditorRead from "./EditorRead";

function EditorParagraph({ text, rowCount }) {
  const { Paragraph } = Typography;

  return (
    <div className="quill">
      <div style={{ border: "none" }} className="ql-container ql-snow">
        <div className="ql-editor ql-blank">
          <Popover content={<EditorRead text={text} />}>
            <Paragraph ellipsis={{ rows: rowCount }}>{parse(text)}</Paragraph>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default EditorParagraph;
