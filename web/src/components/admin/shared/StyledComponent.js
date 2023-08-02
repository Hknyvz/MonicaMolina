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

const FormLabel = styled.label``;

const RequiredFormLabel = styled(FormLabel)`
  ::before {
    content: "*";
    font-size: 1em;
    color: #ff4d4f;
    font-family: SimSun, sans-serif;
    line-height: 1;
    margin-inline-end: 4px;
    display: inline-block;
  }
`;

const TableCell = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px;
`;

const TableLabelContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-weight: 600;
`;

export {
  FullSpace,
  TableContainer,
  TableGeneralOperationContainer,
  RequiredFormLabel,
  FormLabel,
  TableCell,
  TableLabelContainer,
};
