import React from "react";
import Gallery from "src/components/Gallery.js";
import logger from "@/helpers/logger";
import { createClient } from "@/pages/api/client";

function index({ data, data2 }) {
  return (
    <div>
      <Gallery data={data} data2={data2} />
    </div>
  );
}

export default index;

index.layout = "web";

export const getServerSideProps = async () => {
  try {
    const client = createClient();
    const res = await fetch("http://www.monicamolina.com/api/gallery/photo");
    const data = await res.json();
    const res2 = await fetch("http://www.monicamolina.com/api/gallery/video");
    const data2 = await res2.json();
    return { props: { data, data2 } };
  } catch (error) {
    logger.error(`AdminHome:${error}`);
  }
};
