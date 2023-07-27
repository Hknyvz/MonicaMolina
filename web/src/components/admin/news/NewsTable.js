import React, { useContext, useState } from "react";
import {
  FullSpace,
  TableContainer,
  TableGeneralOperationContainer,
} from "../shared/StyledComponent";
import { Button, Image, Popconfirm, Space, Table } from "antd";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import TableRowAction from "../shared/TableRowAction";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import NewsCreateModal from "./NewsCreateModal";
import EditorParagraph from "@/components/shared/EditorParagraph";
import NewsUpdateModal from "./NewsUpdateModal";
import { NotificationContext } from "@/components/admin/shared/NotificationContext";
import { createClient } from "@/pages/api/client";

function NewsTable({ data }) {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [tableData, setTableData] = useState(data);
  const [updateData, setUpdateData] = useState();
  const notification = useContext(NotificationContext);
  const apiUrl = "/news";
  const client = createClient();

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
          alt="News Image"
        ></Image>
      ),
    },
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
      width: 100,
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
      title: "Text",
      dataIndex: "Text",
      key: "Text",
      render: (item) => <EditorParagraph text={item} rowCount={3} />,
    },
    {
      title: "Action",
      width: 20,
      render: (record) => (
        <TableRowAction
          record={record}
          actions={[
            {
              title: "Edit",
              icon: <EditOutlined />,
              action: () => {
                setUpdateData(record);
                setIsOpenUpdateModal(true);
              },
            },
            {
              icon: <DeleteOutlined />,
              title: (
                <Popconfirm
                  title={`Delete`}
                  description={`Are you sure to delete this Carousel?`}
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  placement="left"
                  showArrow={false}
                  onConfirm={() => {
                    handleDelete(record._id);
                  }}
                >
                  Delete
                </Popconfirm>
              ),
            },
          ]}
        />
      ),
    },
  ];

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
      <NewsCreateModal
        visible={isOpenCreateModal}
        onOk={async (data) => {
          try {
            console.log(data);
            const res = await client.post(apiUrl, data);
            console.log(res);
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
      <NewsUpdateModal
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
    </>
  );
}

export default NewsTable;
