import React from "react";
import { Spin } from "antd";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparan koyu gri renk
        zIndex: 9999, // Bileşenin diğer bileşenlerin üzerinde olması için bir z-index değeri belirtin
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default LoadingSpinner;
