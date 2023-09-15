import React from "react";
import News from "@/components/News.js";
import logger from "@/helpers/logger";
import { createClient } from "@/pages/api/client";

function index({ data }) {
  return (
    <div>
      <News data={data} />
    </div>
  );
}

export default index;

index.layout = "web";

export const getServerSideProps = async () => {
  try {
    const client = createClient();
    const res = await fetch("http://www.monicamolina.com/api/news");
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    logger.error(`AdminHome:${error}`);
  }
};
