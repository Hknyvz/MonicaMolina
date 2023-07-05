import React from "react";
import GalleryVideoTable from "./GalleryVideoTable";

function GalleryVideoContainer({ data }) {
  return (
    <>
      <GalleryVideoTable data={data}></GalleryVideoTable>
    </>
  );
}

export default GalleryVideoContainer;
