import styled from "styled-components";
import { Modal, Space } from "antd";

const TableContainer = styled.div`
  margin-top: 10px;
`;

const TableGeneralOperationContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const FullSpace = styled(Space)`
  width: 100%;
`;

const FontDiv = styled.div`
  font-family: "Allison";
  color: red;
  font-size: 100px;
`;

export { TableContainer, TableGeneralOperationContainer, FullSpace, FontDiv };
