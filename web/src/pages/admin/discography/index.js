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
    const res = await fetch("http://www.monicamolina.com/api/discography");
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    logger.error(`AdminHome:${error}`);
  }
};
