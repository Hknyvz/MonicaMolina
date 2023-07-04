import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import CarouselModal from "./CarouselModal";
import { createClient } from "@/pages/api/client";
import {
  FullSpace,
  TableContainer,
  TableGeneralOperationContainer,
} from "../shared/StyledComponent";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import Image from "next/image";

function CarouselTable({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [title, setTitle] = useState();
  const [tableData, setTableData] = useState();

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    // Sayfa yüklendiğinde resim önizlemesini ve önbelleğini temizle
    const clearImageCache = () => {
      if (typeof window !== "undefined" && "caches" in window) {
        caches.keys().then((cacheNames) => {
          cacheNames.forEach((cacheName) => {
            if (cacheName.startsWith("next/image")) {
              caches.delete(cacheName);
            }
          });
        });
      }
    };

    clearImageCache();
  }, []);

  const handleDelete = async (id) => {
    const client = createClient();
    await client.delete(`/carousel?id=${id}`);
    await refreshTableData();
  };

  const columns = [
    {
      title: "Order",
      dataIndex: "Order",
      key: "Order",
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
          loading="lazy"
          alt="Carousel Image"
          unoptimized
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
              setIsOpen(true);
              setIsCreate(false);
              setTitle("Update Carousel Modal");
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

  const refreshTableData = async () => {
    window.location.reload();
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
                  setIsOpen(true);
                  setIsCreate(true);
                  setUpdateData(null);
                  setTitle("Create Carousel Modal");
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
      <CarouselModal
        data={updateData}
        setData={setUpdateData}
        isCreate={isCreate}
        isOpen={isOpen}
        setIsCreate={setIsCreate}
        setIsOpen={setIsOpen}
        title={title}
        refresh={refreshTableData}
      />
    </>
  );
}

export default CarouselTable;
