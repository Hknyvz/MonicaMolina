import { Space } from "antd";
import styled from "styled-components";

const FullSpace = styled(Space)`
  width: 100%;
`;

const TableContainer = styled.div`
  padding: 15px;
`;

const TableGeneralOperationContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export { FullSpace, TableContainer, TableGeneralOperationContainer };
