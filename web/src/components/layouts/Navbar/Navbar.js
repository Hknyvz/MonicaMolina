import { MenuOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import React from "react";

import NavbarMenu from "./NavbarMenu";

const { Header } = Layout;

const navBarStyle = {
  color: "#6c6c6c",
  height: 64,
  paddingInline: 10,
  lineHeight: "64px",
  backgroundColor: "#FFFFFF",
  display: "flex",
  justifyContent: "space-between",
};

export default function NavBar({ collapseAction }) {
  return (
    <Header style={navBarStyle}>
      <div>
        <Button
          type="text"
          className="trigger"
          icon={<MenuOutlined></MenuOutlined>}
          onClick={collapseAction}
        ></Button>
      </div>
      <NavbarMenu></NavbarMenu>
    </Header>
  );
}
