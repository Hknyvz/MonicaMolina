import { LogoutOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const NavbarMenu = React.memo(function NavBarMenu() {
  const { status } = useSession();
  console.log(status);

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
          {status ? (
            <Button
              type="primary"
              style={{ background: "red" }}
              onClick={() => signOut()}
            >
              <LogoutOutlined />
              Logout
            </Button>
          ) : null}
        </div>
      </Space>
    </div>
  );
});

export default NavbarMenu;
