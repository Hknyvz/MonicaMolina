import React, { useState } from "react";
import { Card, Typography, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { FullSpace } from "../shared/StyledComponent";
import BiographyEditModal from "./BiographyEditModal";
import { createClient } from "@/pages/api/client";

const { Title } = Typography;

const BiographyContainer = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [containerData, setContainerData] = useState(data);

  const refresh = async () => {
    setContainerData((prev) => ({ ...prev, ImageUrl: "" }));
    const client = createClient();
    const res = await client("/biography");
    setContainerData(res.data);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: 800 }}>
        <FullSpace size={[10, 30]} direction="vertical">
          <div>
            <Title level={4}>Title</Title>
            <p>{containerData.Title}</p>
          </div>
          <Title level={4}>Photo</Title>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={containerData.ImageUrl}
              alt="Biography photo"
              width={"70%"}
            />
          </div>
          <div>
            <Title level={4}>Biography Text</Title>
            <p>{containerData.Text}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              icon={<EditOutlined />}
              style={{ backgroundColor: "#ffa100", color: "white" }}
              onClick={() => setIsOpen(true)}
            >
              Edit
            </Button>
          </div>
        </FullSpace>
      </Card>
      <BiographyEditModal
        data={data}
        title="Biography Edit"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refresh={refresh}
      ></BiographyEditModal>
    </div>
  );
};

export default BiographyContainer;
