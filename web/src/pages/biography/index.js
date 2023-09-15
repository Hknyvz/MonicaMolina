import React from "react";
import Bio from "@/components/Bio";
import logger from "@/helpers/logger";
import { createClient } from "@/pages/api/client";

function index({ data }) {
  return (
    <>
      <Bio data={data} />
    </>
  );
}

export default index;

index.layout = "web";

export const getServerSideProps = async () => {
  try {
    const client = createClient();
    const res = await fetch("http://www.monicamolina.com/api/biography");
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    logger.error(`AdminHome:${error}`);
  }
};
