import styled from "styled-components";
import { Menu as AntMenu } from "antd";

const AdminLayoutContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: #001529;
`;

const LeftMenuContainer = styled.div`
  width: 256px;
  position: absolute;
  z-index: 100;
  top: 13px;
`;

const Menu = styled(AntMenu)``;

export { LeftMenuContainer, AdminLayoutContainer, Menu };
