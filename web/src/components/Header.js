import React from "react";
import { Menu } from "antd";
import { Typography } from "antd";
import { Col, Row } from "antd";
import Link from "next/link";

const { Title } = Typography;

const headerBackground = {
  backgroundColor: "white",
  paddingTop: 20,
  paddingBottom: 20,
  width: "100%",
  boxShadow: "0px 25px 20px rgba(0, 0, 0, 0.50)",
  zIndex: 1,
  paddingLeft:"5%",
  paddingRight:"5%",
  position:"relative"

};

const titleStyle = {
  fontFamily: "Montserrat",
  fontWeight: 400,
  margin: 0,
};

const textStyle = {
  fontFamily: "Montserrat",
  fontWeight: 400,
  color: "black",
  fontSize: 16,
  margin: 0,
  padding:0
};

const itemStyle = {
  //paddingInline: 12
}

function Header() {
  return (
    <>
      <div style={headerBackground}>
        <Row justify="space-evenly" align="middle" style={{ width: "100%" }}>
          <Col>
            <Title style={titleStyle}>
              <Link href="/home" style={{color:"black"}}>MONICA MOLINA</Link>
            </Title>
          </Col>
          <Col flex="auto" style={{paddingRight:"5%",paddingLeft:"15%"}}>
            <Menu mode="horizontal" style={textStyle}>
              <Menu.Item key="home" style={itemStyle}>
                <Link href="/home">Home</Link>
              </Menu.Item>
              <Menu.Item key="biography" style={itemStyle}>
                <Link href="/biography">Biography</Link>
              </Menu.Item>
              <Menu.Item key="discography" style={itemStyle}>
                <Link href="/discography">Discography</Link>
              </Menu.Item>
              <Menu.Item key="news" style={itemStyle}>
                <Link href="/news">News</Link>
              </Menu.Item>
              <Menu.Item key="gallery" style={itemStyle}>
                <Link href="/gallery">Gallery</Link>
              </Menu.Item>
              {/* <Menu.Item key="concerts" style={itemStyle}>
                <Link href="/concerts">Concerts</Link>
              </Menu.Item> */}
              <Menu.Item key="contact" style={itemStyle}>
                <Link href="/contact">Contact</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col flex="auto">
            {/* <Title style={textStyle}>EN-ES</Title> */}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Header;
