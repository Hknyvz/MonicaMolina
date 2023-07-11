import React, { useContext, useEffect, useState } from "react";
import {
  FullSpace,
  TableContainer,
  TableGeneralOperationContainer,
} from "../shared/StyledComponent";
import { Button, Space, Table } from "antd";
import DiscographyCreateModal from "./DiscographyCreateModal";
import { createClient } from "@/pages/api/client";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import Image from "next/image";
import DiscographyUpdateModal from "./DiscographyUpdateModal";
import { NotificationContext } from "../shared/NotificationContext";

function DiscographyTable({ data }) {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [tableData, setTableData] = useState([]);
  const client = createClient();
  const notification = useContext(NotificationContext);

  const apiUrl = "/discography";

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
          alt="Albume Cover"
          unoptimized
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
    setIsOpenUpdateModal(true);
  };

  const handleDelete = async (id) => {
    await client.delete(`${apiUrl}?id=${id}`);
    await refreshData();
  };

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
                onClick={() => {
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
            rowKey={(record) => record._id}
          ></Table>
        </FullSpace>
      </TableContainer>
      {isOpenCreateModal && (
        <DiscographyCreateModal
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
              notification.success({ message: error.toString() });
            }
          }}
          onCancel={() => {
            setIsOpenCreateModal(false);
          }}
        />
      )}
      {updateData && (
        <DiscographyUpdateModal
          visible={isOpenUpdateModal}
          record={updateData}
          onCancel={() => {
            setIsOpenUpdateModal(false);
            setUpdateData(undefined);
          }}
          onOk={async (data) => {
            try {
              const res = await client.put(apiUrl, data);
              if (res.status === 200) {
                setIsOpenUpdateModal(false);
                setUpdateData(undefined);
                await refreshPage();
                notification.success({ message: "Successful" });
              }
            } catch (error) {
              notification.error({ message: error.toString() });
            }
          }}
        />
      )}
    </>
  );
}

export default DiscographyTable;
