import { Layout } from "antd";
import React, { useState } from "react";
import Header from 'src/components/Header.js'
import dynamic from "next/dynamic";


function WebLayout({ children }) {
  const ContentWrapper = dynamic(() => import("./ContentWrapper/ContentWrapper"));
  return (
    
    <div>
        <Header/>
        
        <ContentWrapper>{children}</ContentWrapper>

    </div>
  );
}

export default WebLayout;
