import React, { useEffect, useState } from "react";
import {
  FullSpace,
  TableContainer,
  TableGeneralOperationContainer,
} from "../../shared/StyledComponent";
import { Button, Image, Space, Table } from "antd";
import GalleryPhotoModal from "./GalleryPhotoModal";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import { createClient } from "@/pages/api/client";

function GalleryPhotoTable({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [title, setTitle] = useState();
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(data);
  }, [data]);
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
      title: "Image",
      dataIndex: "ImageUrl",
      key: "ImageUrl",
      render: (image) => (
        <Image width={170} src={imageUrlBuilder(image)} alt="Gallery"></Image>
      ),
    },
    {
      title: "Operation",
      width: 100,
      render: (renderData) => (
        <Space>
          <Button
            style={{ backgroundColor: "#ffa100", color: "white" }}
            onClick={(e) => updateModalOpenHandle(renderData)}
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
  const updateModalOpenHandle = (renderData) => {
    setUpdateData(renderData);
    setIsOpen(true);
    setIsCreate(false);
    setTitle("Update Gallery Photo Modal");
  };

  const handleDelete = async (id) => {
    const client = createClient();
    await client.delete(`/gallery/photo?id=${id}`);
    await refreshTableData();
  };
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
                  setTitle("Create Gallery Photo Modal");
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
            rowKey={(record) => record._id}
          ></Table>
        </FullSpace>
      </TableContainer>
      <GalleryPhotoModal
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

export default GalleryPhotoTable;
