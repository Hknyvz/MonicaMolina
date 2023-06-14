import HomeContainer from "@/components/admin/home/HomeContainer";
import React, { useState } from "react";

function AdminHome() {
  const [crop, setCrop] = useState();
  return (
    <div>
      {/* <CropContainer></CropContainer> */}
      <HomeContainer></HomeContainer>
    </div>
  );
}
AdminHome.layout = "admin";
export default AdminHome;
