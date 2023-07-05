import HomeContainer from "@/components/admin/home/HomeContainer";
import logger from "@/helpers/logger";
import { createClient } from "@/pages/api/client";
import React, { useState } from "react";

function AdminHome({ data }) {
  return (
    <>
      <HomeContainer data={data} />
    </>
  );
}
AdminHome.layout = "admin";
export default AdminHome;

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
