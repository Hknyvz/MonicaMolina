import { Layout } from "antd";
import React, { useContext, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { LoadingContext } from "@/components/contexts/LoadingContext";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import { FullLayout } from "./styledComponents/StyledAdminLayout";
import { useSession } from "next-auth/react";

const SideBar = dynamic(() => import("./SideBar/SideBar"));
const NavBar = dynamic(() => import("./Navbar/Navbar"));
const ContentWrapper = dynamic(() => import("./ContentWrapper/ContentWrapper"));
function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { isLoading } = useContext(LoadingContext);

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <SideBar collapsed={collapsed}></SideBar>
        <FullLayout>
          <NavBar collapseAction={() => setCollapsed(!collapsed)} />
          <ContentWrapper>
            {isLoading && <LoadingSpinner />}
            {children}
          </ContentWrapper>
        </FullLayout>
      </Layout>
    </>
  );
}
export default AdminLayout;
