import React from "react";

function TableLabel({ children }) {
  return (
    <div className="tableLabelContainer">
      <label>{children}</label>
    </div>
  );
}

export default TableLabel;
