import DiscographyContainer from "@/components/admin/discography/DiscographyContainer";
import logger from "@/helpers/logger";
import { createClient } from "@/pages/api/client";
import React from "react";

function AdminDiscography({ data }) {
  return <DiscographyContainer data={data} />;
}
AdminDiscography.layout = "admin";
export default AdminDiscography;

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
