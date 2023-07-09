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

const FormLabel = styled.label`
  ::after {
    content: ":";
    margin-inline-end: 8px;
    margin-inline-start: 2px;
    margin-block: 0;
    position: relative;
  }
`;

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

export {
  FullSpace,
  TableContainer,
  TableGeneralOperationContainer,
  RequiredFormLabel,
  FormLabel,
};
