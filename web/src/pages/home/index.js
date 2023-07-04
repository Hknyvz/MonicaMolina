import React from 'react'
import Header from 'src/components/Header.js'
import MainCarousel from 'src/components/MainCarousel.js'
import logger from "@/helpers/logger";
import { createClient } from "@/pages/api/client";

const contentStyle = {
  width: "100%",
  height: "100%",
};

function index({data}) {

  return (
      <div style={contentStyle}>
          <MainCarousel data={data}/>
      </div>
  )
}

export default index

index.layout = "web"


export const getServerSideProps = async () => {
  try {
    const client = createClient();
    const res = await client.get("/carousel");
    const data = res.data;
    return { props: { data } };
  } catch (error) {
    logger.error(`AdminHome:${error}`);
  }
};