import { Button, Space, Table } from "antd";
import React from "react";
import {
  TableContainer,
  TableGeneralOperationContainer,
} from "./StyledComponents";
import CarouselModalButton from "./CarouselModalButton";

function TableComponent({ data }) {
  const handleDelete = (id) => {};

  const columns = [
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
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
        <TableGeneralOperationContainer>
          <Space>
            <CarouselModalButton></CarouselModalButton>
          </Space>
        </TableGeneralOperationContainer>
        <Table
          size="small"
          pagination={false}
          bordered
          columns={columns}
          dataSource={data}
        ></Table>
      </TableContainer>
    </>
  );
}

export default TableComponent;
