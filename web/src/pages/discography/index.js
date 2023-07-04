import React from 'react'
import Disco from 'src/components/Disco.js'
import logger from "@/helpers/logger";
import { createClient } from "@/pages/api/client";

function index({data}) {
  return (
    <>
      <Disco data={data}/>
    </>
  )
}

export default index

index.layout = "web";

export const getServerSideProps = async () => {
  try {
    const client = createClient();
    const res = await client.get("/discography");
    const data = res.data;
    return { props: { data } };
  } catch (error) {
    logger.error(`AdminHome:${error}`);
  }
};