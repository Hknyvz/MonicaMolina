import Quill from "react-quill";
import styled from "styled-components";

const QuillEditor = styled(Quill)`
  width: 100%;
  max-width: 950px;
  img {
    max-width: 600px;
    display: flex;
    justify-content: center;
  }
  .ql-align-center {
    display: flex;
    justify-content: center;
  }
  .ql-editor {
    font-family: "Poppins";
    min-height: 100px;
  }
`;

const ToolbarContainer = styled.div`
  top: 0;
  z-index: 100;
`;

export { QuillEditor, ToolbarContainer };
