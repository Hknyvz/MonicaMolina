import React from "react";
import GalleryPhotoTable from "./GalleryPhotoTable";

function GalleryPhotoContainer({ data }) {
  return (
    <>
      <GalleryPhotoTable data={data}></GalleryPhotoTable>
    </>
  );
}

export default GalleryPhotoContainer;
