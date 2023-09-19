import { Layout } from "antd";
import React, { useState } from "react";
import Header from "@/components/Header";
import dynamic from "next/dynamic";

function WebLayout({ children }) {
  const ContentWrapper = dynamic(() =>
    import("./ContentWrapper/ContentWrapper")
  );
  return (
    <Layout className="fullSpace">
      <Header />

      <ContentWrapper>{children}</ContentWrapper>
    </Layout>
  );
}

export default WebLayout;
