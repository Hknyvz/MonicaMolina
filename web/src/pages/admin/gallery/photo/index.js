import GalleryPhotoContainer from "@/components/admin/gallery/photo/GalleryPhotoContainer";
import logger from "@/helpers/logger";
import { createClient } from "@/pages/api/client";
import React from "react";

function AdminGalleryPhoto({ data }) {
  return <GalleryPhotoContainer data={data} />;
}
AdminGalleryPhoto.layout = "admin";
export default AdminGalleryPhoto;

export const getServerSideProps = async () => {
  try {
    const client = createClient();
    const res = await client.get("/gallery/photo");
    const data = res.data;
    return { props: { data } };
  } catch (error) {
    logger.error(`AdminGalleryPhoto:${error}`);
  }
};
