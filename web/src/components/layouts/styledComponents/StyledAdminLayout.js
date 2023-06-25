import styled from "styled-components";
import { Menu as AntMenu, Layout } from "antd";

const FullLayout = styled(Layout)`
  width: 100%;
`;

const LeftMenuContainer = styled.div`
  width: 256px;
  position: absolute;
  z-index: 100;
  top: 13px;
`;

const Menu = styled(AntMenu)``;

export { LeftMenuContainer, FullLayout, Menu };
