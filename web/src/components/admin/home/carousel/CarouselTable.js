import { Button, Space, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import CarouselCreateModal from "./CarouselCreateModal";
import { createClient } from "@/pages/api/client";
import {
  FullSpace,
  TableContainer,
  TableGeneralOperationContainer,
} from "@/components/admin/shared/StyledComponent";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import Image from "next/image";
import CarouselUpdateModal from "./CarouselUpdateModal";
import { NotificationContext } from "../../shared/NotificationContext";

function CarouselTable({ data }) {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [tableData, setTableData] = useState();
  const client = createClient();
  const apiUrl = "/home/carousel";
  const notification = useContext(NotificationContext);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleDelete = async (id) => {
    await client.delete(`${apiUrl}?id=${id}`);
    notification.success({ message: "Successful" });
    await refreshData();
  };

  const columns = [
    {
      title: "Order",
      dataIndex: "Order",
      key: "Order",
      width: 50,
      render: (item) => (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            fontWeight: "600",
          }}
        >
          <label>{item}</label>
        </div>
      ),
    },
    {
      title: "Link",
      dataIndex: "Link",
      key: "Link",
    },
    {
      title: "Image",
      dataIndex: "ImageUrl",
      key: "ImageUrl",
      width: 170,
      render: (image) => (
        <Image
          src={imageUrlBuilder(image)}
          width={160}
          height={90}
          alt="Carousel Image"
          unoptimized
          priority
        ></Image>
      ),
    },
    {
      title: "Operation",
      width: 100,
      render: (renderData) => (
        <Space>
          <Button
            style={{ backgroundColor: "#ffa100", color: "white" }}
            onClick={(e) => {
              setUpdateData(renderData);
              setIsOpenUpdateModal(true);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#ff0000", color: "white" }}
            onClick={() => handleDelete(renderData._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const refreshPage = async () => {
    setTimeout(() => {
      window.location.reload();
    }, 700);
  };

  const refreshData = async () => {
    const res = await client.get(apiUrl);
    setTableData(res.data);
  };

  return (
    <>
      <TableContainer>
        <FullSpace direction="vertical">
          <TableGeneralOperationContainer>
            <Space>
              <Button
                type="primary"
                onClick={(e) => {
                  setIsOpenCreateModal(true);
                }}
              >
                Add a Row
              </Button>
            </Space>
          </TableGeneralOperationContainer>
          <Table
            size="small"
            pagination={false}
            bordered
            columns={columns}
            dataSource={tableData}
            rowKey="_id"
          ></Table>
        </FullSpace>
      </TableContainer>
      {isOpenCreateModal && (
        <CarouselCreateModal
          visible={isOpenCreateModal}
          onOk={async (data) => {
            try {
              const res = await client.post(apiUrl, data);
              if (res.status === 201) {
                setIsOpenCreateModal(false);
                notification.success({ message: "Successful" });
                refreshData();
              }
            } catch (error) {
              notification.error({ message: error.toString() });
            }
          }}
          onCancel={() => {
            setIsOpenCreateModal(false);
          }}
        />
      )}
      {updateData && (
        <CarouselUpdateModal
          record={updateData}
          visible={isOpenUpdateModal}
          onOk={async (data) => {
            try {
              const res = await client.put(apiUrl, data);
              if (res.status === 200) {
                setIsOpenUpdateModal(false);
                setUpdateData(undefined);
                notification.success({ message: "Successful" });
                await refreshPage();
              }
            } catch (error) {
              notification.error({ message: error.toString() });
            }
          }}
          onCancel={() => {
            setIsOpenUpdateModal(false);
            setUpdateData(undefined);
          }}
        />
      )}
    </>
  );
}

export default CarouselTable;
