import React from "react";
import Disco from "src/components/Disco.js";
import logger from "@/helpers/logger";
import { createClient } from "@/pages/api/client";

function index({ data }) {
  return (
    <>
      <Disco data={data} />
    </>
  );
}

export default index;

index.layout = "web";

export const getServerSideProps = async () => {
  try {
    const client = createClient();
    const res = await fetch("http://www.monicamolina.com/api/discography");
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    logger.error(`AdminHome:${error}`);
  }
};
