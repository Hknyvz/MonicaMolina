import React from 'react'
import { Menu } from 'antd';
import { Typography } from 'antd';
import { Col, Row } from 'antd';

const { Title } = Typography;

const headerBackground = 
{
  backgroundColor: "white",
  paddingTop: 20,
  paddingBottom: 20,
  width: "100%",
  boxShadow: "0px 25px 20px rgba(0, 0, 0, 0.50)",
  zIndex: 1,

}

const titleStyle = 
{
  fontFamily: 'Montserrat sans-serif',
  margin: 0,

}

function Header() {
  return (
    <>
      
      <div style={headerBackground}>
        <Row justify="space-evenly" align="middle" style={{width: "100%"}}>
          <Col >
            <Title style={titleStyle}>MÓNICA MOLINA</Title>
          </Col>
          <Col>
          <Menu mode="horizontal" >
            <Menu.Item key="home">
              Home
            </Menu.Item>    
            <Menu.Item key="biography">
              Biography
            </Menu.Item>
            <Menu.Item key="discography">
              Discography
            </Menu.Item>
            <Menu.Item key="news">
              News
            </Menu.Item>
            <Menu.Item key="gallery">
              Gallery
            </Menu.Item>
            <Menu.Item key="concerts">
              Concerts
            </Menu.Item>
            <Menu.Item key="Contact">
              Contact
            </Menu.Item>
            </Menu>
          </Col>
          <Col>
            <Title level={5} style={{margin: 0}}>EN-ES</Title>
          </Col>
        </Row>
      </div>

    </>
  )
}

export default Header