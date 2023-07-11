import React, { useEffect } from "react";
import CarouselTable from "./CarouselTable";

function CarouselContainer({ data }) {
  return (
    <>
      <CarouselTable data={data}></CarouselTable>
    </>
  );
}

export default CarouselContainer;
