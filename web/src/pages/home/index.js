import React from "react";
import MainCarousel from "@/components/MainCarousel";
import logger from "@/helpers/logger";
import { createClient } from "@/pages/api/client";

const contentStyle = {
  width: "100%",
  height: "100%",
};

function index({ data }) {
  return (
    <div style={contentStyle}>
      <MainCarousel data={data} />
    </div>
  );
}

export default index;

index.layout = "web";

export const getServerSideProps = async () => {
  try {
    const client = createClient();
    const res = await fetch("http://www.monicamolina.com/api/home/carousel");
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    logger.error(`AdminHome:${error}`);
  }
};
