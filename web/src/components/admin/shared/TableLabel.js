import React from "react";
import { TableLabelContainer } from "./StyledComponent";

function TableLabel({ children }) {
  return (
    <TableLabelContainer>
      <label>{children}</label>
    </TableLabelContainer>
  );
}

export default TableLabel;
