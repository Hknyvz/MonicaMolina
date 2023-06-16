import HomeContainer from "@/components/admin/home/HomeContainer";
import { createClient } from "@/pages/api/client";
import React, { useState } from "react";

function AdminHome({ data }) {
  return (
    <>
      <HomeContainer data={data}></HomeContainer>
    </>
  );
}
AdminHome.layout = "admin";
export default AdminHome;

export const getServerSideProps = async () => {
  const client = createClient();
  const res = await client.get("/carousel");
  const data = res.data;
  return { props: { data } };
};
