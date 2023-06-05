import { GlobalOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Popover, Space } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const NavbarMenu = React.memo(function NavBarMenu() {
  const [state, setState] = useState({
    flag: "en",
  });

  const onFlagChangeHandle = (value, e) => {
    e.preventDefault();
    setState({
      ...state,
      flag: value,
    });
  };

  const items = [
    {
      key: 1,
      label: (
        <Link onClick={(e) => onFlagChangeHandle("en", e)} href="#">
          <span>English</span>
        </Link>
      ),
    },
  ];

  return (
    <div
      className="navbar-menu"
      style={{
        display: "flex",
        WebkitBoxPack: "end",
        WebkitBoxAlign: "center",
        justifyContent: "flex-end",
        alignItems: "center",
        flex: "1 1 auto",
        paddingRight: "12px",
      }}
    >
      <Space>
        <div>
          <Dropdown placement="bottomRight" menu={{ items }}>
            <Link href="#">
              <GlobalOutlined />
            </Link>
          </Dropdown>
        </div>
        <div>
          {/* {user && (
            <Popover placement="bottomRight" content={userContent}>
              <Link href="#">
                <Avatar src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" />
                <span>{user?.fullName}</span>
              </Link>
            </Popover>
          )}
          {!user && (
            <Button
              onClick={() => {
                window.location.href = "/auth/login";
              }}
            >
              Login
            </Button>
          )} */}
        </div>
      </Space>
    </div>
  );
});

export default NavbarMenu;
