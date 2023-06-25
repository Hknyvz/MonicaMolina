import { Layout } from "antd";
import React, { useState } from "react";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { FullLayout } from "./styledComponents/StyledAdminLayout";

function WebLayout({ children }) {
  const ContentWrapper = dynamic(() =>
    import("./ContentWrapper/ContentWrapper")
  );
  return (
    <FullLayout>
      <Header />

      <ContentWrapper>{children}</ContentWrapper>
    </FullLayout>
  );
}

export default WebLayout;
