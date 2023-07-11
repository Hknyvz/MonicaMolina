import React, { useContext, useEffect, useState } from "react";
import {
  FullSpace,
  TableContainer,
  TableGeneralOperationContainer,
} from "../../shared/StyledComponent";
import { Button, Image, Space, Table } from "antd";
import GalleryPhotoCreateModal from "./GalleryPhotoCreateModal";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import { createClient } from "@/pages/api/client";
import GalleryPhotoUpdateModal from "./GalleryPhotoUpdateModal";
import { NotificationContext } from "../../shared/NotificationContext";

function GalleryPhotoTable({ data }) {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const client = createClient();
  const notification = useContext(NotificationContext);
  const apiUrl = "/gallery/photo";

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
      dataIndex: "ThumbnailUrl",
      key: "ThumbnailUrl",
      render: (image) => (
        <Image width={170} src={imageUrlBuilder(image)} alt="Gallery" />
      ),
    },
    {
      title: "Operation",
      width: 100,
      render: (renderData) => (
        <Space>
          <Button
            style={{ backgroundColor: "#ffa100", color: "white" }}
            onClick={() => updateModalOpenHandle(renderData)}
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

  const refreshData = async () => {
    const res = await client.get(apiUrl);
    setTableData(res.data);
  };

  const refreshPage = async () => {
    setTimeout(() => {
      window.location.reload();
    }, 700);
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
      {isOpenCreateModal ? (
        <GalleryPhotoCreateModal
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
      ) : null}
      {updateData && (
        <GalleryPhotoUpdateModal
          record={updateData}
          visible={isOpenUpdateModal}
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

export default GalleryPhotoTable;
