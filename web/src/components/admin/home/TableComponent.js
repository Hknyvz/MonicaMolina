import { Button, Space, Table } from "antd";
import React from "react";
import {
  FullSpace,
  TableContainer,
  TableGeneralOperationContainer,
} from "./StyledComponents";
import CarouselModalButton from "./CarouselModalButton";

function TableComponent({ data }) {
  const handleDelete = (id) => {};

  const columns = [
    {
      title: "Order",
      dataIndex: "Order",
      key: "Order",
    },
    {
      title: "ImageText",
      dataIndex: "ImageText",
      key: "ImageText",
    },
    {
      title: "Image",
      dataIndex: "ImageUrl",
      key: "ImageUrl",
      width: 170,
      render: (image) => <img src={image} width={160} height={90}></img>,
    },
    {
      title: "Operation",
      width: 100,
      render: (data) => (
        <Space>
          <CarouselModalButton data={data} />
          <Button
            type="primary"
            style={{ backgroundColor: "#ff0000", color: "white" }}
            onClick={() => handleDelete(data.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <TableContainer>
        <FullSpace direction="vertical">
          <TableGeneralOperationContainer>
            <Space>
              <CarouselModalButton isCreate={true}></CarouselModalButton>
            </Space>
          </TableGeneralOperationContainer>
          <Table
            size="small"
            pagination={false}
            bordered
            columns={columns}
            dataSource={data}
            key={(p) => p.id}
          ></Table>
        </FullSpace>
      </TableContainer>
    </>
  );
}

export default TableComponent;
