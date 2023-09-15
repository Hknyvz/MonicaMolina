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
    const res = await fetch("http://www.monicamolina.com/api/gallery/video");
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    logger.error(`AdminGalleryVideo:${error}`);
  }
};
