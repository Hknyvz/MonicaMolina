import React, { useContext, useState } from "react";
import { Card, Typography, Button, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import BiographyEditModal from "./BiographyEditModal";
import { createClient } from "@/pages/api/client";
import Image from "next/image";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import { NotificationContext } from "../shared/NotificationContext";
import EditorRead from "@/components/shared/EditorRead";

const { Title } = Typography;

const BiographyContainer = ({ data }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const notification = useContext(NotificationContext);
  const client = createClient();
  const apiUrl = "/biography";

  const refreshPage = async () => {
    setTimeout(() => {
      window.location.reload();
    }, 700);
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
        <Space className="fullSpace" size={[10, 30]} direction="vertical">
          <div>
            <Title level={5}>Title</Title>
            <p>{data.Title}</p>
          </div>
          <Title level={5}>Photo</Title>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              src={imageUrlBuilder(data.ImageUrl)}
              alt="Biography photo"
              width={"400"}
              height={"500"}
              priority={5}
              unoptimized
            />
          </div>
          <div>
            <Title level={5}>Biography Text</Title>
            <EditorRead text={data.Text ?? ""} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              icon={<EditOutlined />}
              style={{ backgroundColor: "#ffa100", color: "white" }}
              onClick={() => setIsOpenUpdateModal(true)}
            >
              Edit
            </Button>
          </div>
        </Space>
      </Card>
      <BiographyEditModal
        record={data}
        visible={isOpenUpdateModal}
        onOk={async (data) => {
          try {
            const res = await client.put(apiUrl, data);
            if (res.status === 200) {
              setIsOpenUpdateModal(false);
              notification.success({ message: "Successful" });
              await refreshPage();
            }
          } catch (error) {
            notification.error({ message: error.toString() });
          }
        }}
        onCancel={() => {
          setIsOpenUpdateModal(false);
        }}
      ></BiographyEditModal>
    </div>
  );
};

export default BiographyContainer;
