import "react-quill/dist/quill.snow.css";
import NewsContainer from "@/components/admin/news/NewsContainer";
import logger from "@/helpers/logger";
import { createClient } from "@/pages/api/client";
import React from "react";

function AdminNews({ data }) {
  return <NewsContainer data={data} />;
}

AdminNews.layout = "admin";
export default AdminNews;

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
