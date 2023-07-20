import { Button, Popconfirm, Space, Table, Image, Switch, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import CarouselCreateModal from "./CarouselCreateModal";
import { createClient } from "@/pages/api/client";
import {
  FullSpace,
  TableCell,
  TableContainer,
  TableGeneralOperationContainer,
} from "@/components/admin/shared/StyledComponent";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import CarouselUpdateModal from "./CarouselUpdateModal";
import { NotificationContext } from "../../shared/NotificationContext";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import TableRowAction from "../../shared/TableRowAction";
import CarouselDetailEditModal from "./CarouselDetailUpdateModal";

function CarouselTable({ data }) {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenUpdateDetailModal, setIsOpenUpdateDetailModal] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [tableData, setTableData] = useState(data);
  const client = createClient();
  const apiUrl = "/home/carousel";
  const detailApiUrl = "/home/carousel-detail";
  const notification = useContext(NotificationContext);

  const handleDelete = async (id) => {
    await client.delete(`${apiUrl}?id=${id}`);
    notification.success({ message: "Successful" });
    await refreshData();
  };

  const handleStatusChange = (checked, item) => {
    if (!item.DetailImageUrl || !item.DetailTitle) {
      return;
    }
    const updatedTableData = tableData.map((dataItem) =>
      dataItem === item ? { ...dataItem, HaveDetail: checked } : dataItem
    );
    setTableData(updatedTableData);
  };

  const columns = [
    {
      title: "Carousel",
      children: [
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
          width: 170,
          render: (image) => (
            <Image
              src={imageUrlBuilder(image)}
              width={160}
              alt="Carousel Image"
            ></Image>
          ),
        },
      ],
    },
    {
      title: "Carousel Detail",
      children: [
        {
          title: "Status",
          dataIndex: "HaveDetail",
          key: "HaveDetail",
          width: 50,
          render: (data, item) => (
            <Switch
              checked={item.HaveDetail}
              onChange={(checked) => handleStatusChange(checked, item)}
            ></Switch>
          ),
        },
        {
          title: "Dateail Title",
          dataIndex: "DetailTitle",
          key: "DetailTitle",
          className: "custom-column-width",
        },
        {
          title: "Detail Image",
          dataIndex: "DetailImageUrl",
          key: "DetailImageUrl",
          width: 170,
          render: (image) =>
            image && (
              <Image
                src={imageUrlBuilder(image)}
                width={160}
                alt="Carousel Detail Image"
              ></Image>
            ),
        },
      ],
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
              title: "Edit Detail",
              icon: <EditOutlined />,
              action: () => {
                setUpdateData(record);
                setIsOpenUpdateDetailModal(true);
              },
            },
            {
              icon: <DeleteOutlined />,
              title: (
                <Popconfirm
                  title={`Delete "${record.name}"`}
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
      {updateData && (
        <CarouselDetailEditModal
          record={updateData}
          visible={isOpenUpdateDetailModal}
          onOk={async (data) => {
            try {
              const res = await client.put(detailApiUrl, data);
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
            setIsOpenUpdateDetailModal(false);
            setUpdateData(undefined);
          }}
        />
      )}
    </>
  );
}

export default CarouselTable;
