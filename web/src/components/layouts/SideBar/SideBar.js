import { HomeOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import React from "react";

import Logo from "../Logo/Logo";

const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Home", "/admin/home", <HomeOutlined />),
  getItem("Biography", "/admin/biography", <HomeOutlined />),
  getItem("Discography", "/admin/discography", <HomeOutlined />),
  getItem("News", "/admin/news", <HomeOutlined />),
  getItem("Gallery", "/admin/gallery", <HomeOutlined />),
  getItem("Concert", "/admin/concert", <HomeOutlined />),
  getItem("Contact", "/admin/contact", <HomeOutlined />),
];

export default function SideBar({ collapsed }) {
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={280}
      style={{
        background: colorBgContainer,
        borderRight: "1px solid #f0f0f0",
      }}
      theme="light"
    >
      <Logo collapsed={collapsed} />
      <Menu
        onClick={(e) => {
          router.push(e.key);
        }}
        style={{
          height: "calc(100vh - 64px)",
          overflow: "auto",
          padding: "8px",
        }}
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
}
