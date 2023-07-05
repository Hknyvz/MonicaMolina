import GalleryVideoContainer from "@/components/admin/gallery/video/GalleryVideoContainer";
import logger from "@/helpers/logger";
import { createClient } from "@/pages/api/client";
import React from "react";

function AdminGalleryVideo({ data }) {
  return <GalleryVideoContainer data={data} />;
}
AdminGalleryVideo.layout = "admin";
export default AdminGalleryVideo;

export const getServerSideProps = async () => {
  try {
    const client = createClient();
    const res = await client.get("/gallery/video");
    const data = res.data;
    return { props: { data } };
  } catch (error) {
    logger.error(`AdminGalleryVideo:${error}`);
  }
};
