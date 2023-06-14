import styled from "styled-components";
import { Modal, Space } from "antd";

const TableContainer = styled.div`
  margin-top: 16px;
`;

const TableGeneralOperationContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const FullSpace = styled(Space)`
  width: 100%;
`;

export { TableContainer, TableGeneralOperationContainer, FullSpace };
