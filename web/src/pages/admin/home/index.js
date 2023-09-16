import CarouselContainer from "@/components/admin/home/carousel/CarouselContainer";
import logger from "@/helpers/logger";
import { createClient } from "@/pages/api/client";
import React from "react";
import "@/styles/admin/Home.module.css";

function AdminHome({ data }) {
  return (
    <>
      <CarouselContainer data={data} />
    </>
  );
}
AdminHome.layout = "admin";
export default AdminHome;

export const getServerSideProps = async () => {
  try {
    const client = createClient();
    const res = await client.get("/home/carousel?admin=true");
    const data = res.data;
    return { props: { data } };
  } catch (error) {
    logger.error(`AdminHome:${error}`);
  }
};
