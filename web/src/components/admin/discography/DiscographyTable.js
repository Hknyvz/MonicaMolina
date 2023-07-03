import React, { useEffect, useState } from "react";
import {
  FullSpace,
  TableContainer,
  TableGeneralOperationContainer,
} from "../shared/StyledComponent";
import { Button, Space, Table } from "antd";
import DiscographyModal from "./DiscographyModal";
import { createClient } from "@/pages/api/client";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import Image from "next/image";

function DiscographyTable({ data }) {
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
      title: "Image",
      dataIndex: "ImageUrl",
      key: "ImageUrl",
      width: 170,
      render: (image) => (
        <Image
          src={imageUrlBuilder(image)}
          width={160}
          height={170}
          loading="lazy"
        ></Image>
      ),
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Year",
      dataIndex: "Year",
      key: "Year",
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
    setTitle("Update Album Modal");
  };

  const handleDelete = async (id) => {
    const client = createClient();
    await client.delete(`/discography?id=${id}`);
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
                  setTitle("Create Album Modal");
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
      <DiscographyModal
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

export default DiscographyTable;
