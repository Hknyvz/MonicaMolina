import React, { useContext, useEffect, useState } from "react";
import {
  FullSpace,
  TableContainer,
  TableGeneralOperationContainer,
} from "../../shared/StyledComponent";
import { Button, Space, Table } from "antd";
import GalleryVideoCreateModal from "./GalleryVideoCreateModal";
import { createClient } from "@/pages/api/client";
import GalleryVideoUpdateModal from "./GalleryVideoUpdateModal";
import { NotificationContext } from "../../shared/NotificationContext";

function GalleryVideoTable({ data }) {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [tableData, setTableData] = useState([]);
  const notification = useContext(NotificationContext);
  const client = createClient();
  const apiUrl = "http://www.monicamolina.com/api/gallery/video";

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
      title: "VideoUrl",
      dataIndex: "VideoUrl",
      key: "VideoUrl",
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
    notification.success({ message: "Successful" });
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
            rowKey={(record) => record._id}
          ></Table>
        </FullSpace>
      </TableContainer>
      {isOpenCreateModal && (
        <GalleryVideoCreateModal
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
        <GalleryVideoUpdateModal
          visible={isOpenUpdateModal}
          record={updateData}
          onOk={async (data) => {
            try {
              debugger;
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
          onCancel={() => {
            setIsOpenUpdateModal(false);
            setUpdateData(undefined);
          }}
        ></GalleryVideoUpdateModal>
      )}
    </>
  );
}

export default GalleryVideoTable;
