import React, { useEffect } from "react";
import CarouselTable from "./CarouselTable";

function HomeContainer({ data }) {
  return (
    <>
      <CarouselTable data={data}></CarouselTable>
    </>
  );
}

export default HomeContainer;
