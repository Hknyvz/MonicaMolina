import React, { useEffect } from "react";
import TableComponent from "./TableComponent";

const datas = [
  {
    id: "1",
    order: 1,
    text: "First Picture",
    image: "/home-photo/1af834df-25d5-482b-899a-2b5e95e401fa.jpg",
    operation: "1",
  },
];

function HomeContainer({ data }) {
  return (
    <>
      <TableComponent data={data}></TableComponent>
    </>
  );
}

export default HomeContainer;
