import { useRouter } from "next/router";
import React from "react";

function AdminLanding() {
  return <div>Admin</div>;
}
AdminLanding.layout = "admin";
export default AdminLanding;

export async function getServerSideProps(context) {
  const destination = "/admin/home";
  context.res.writeHead(302, {
    Location: destination,
  });
  context.res.end();

  return {
    props: {},
  };
}
