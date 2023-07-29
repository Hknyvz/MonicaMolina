import React from "react";
import NewsTable from "./NewsTable";

function NewsContainer({ data }) {
  return (
    <>
      <NewsTable data={data} />
    </>
  );
}

export default NewsContainer;
