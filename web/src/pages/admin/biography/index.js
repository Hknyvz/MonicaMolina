import "react-quill/dist/quill.snow.css";
import BiographyContainer from "@/components/admin/biography/BiographyContainer";
import logger from "@/helpers/logger";
import { createClient } from "@/pages/api/client";
import React from "react";

function AdminBiography({ data }) {
  return <BiographyContainer data={data} />;
}
AdminBiography.layout = "admin";
export default AdminBiography;

export const getServerSideProps = async () => {
  try {
    const client = createClient();
    const res = await fetch("http://www.monicamolina.com/api/biography");
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    logger.error(`Admin Biography:${error}`);
  }
};
