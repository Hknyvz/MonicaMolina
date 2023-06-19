import React from 'react'
import { Menu } from 'antd';
import { Typography } from 'antd';
import { Col, Row } from 'antd';
import Link from 'next/link'

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
  fontFamily: 'Montserrat',
  fontWeight: 400,
  margin: 0,

}

const textStyle = 
{
  fontFamily: 'Montserrat',
  fontWeight: 300,
  color: "black",
  fontSize: 16,
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
          <Col span={9}>
          <Menu mode="horizontal" style={textStyle}>
            <Menu.Item key="home">
              <Link href="/home">
                Home
              </Link>
            </Menu.Item>    
            <Menu.Item key="biography">
              <Link href="/biography">
                Biography
              </Link>             
            </Menu.Item>
            <Menu.Item key="discography">
              <Link href="/discography">
                Discography
              </Link>  
            </Menu.Item>
            <Menu.Item key="news">
              <Link href="/news">
                News
              </Link>  
            </Menu.Item>
            <Menu.Item key="gallery">
              <Link href="/gallery">
                Gallery
              </Link>  
            </Menu.Item>
            <Menu.Item key="concerts">
              <Link href="/concerts">
                Concerts
              </Link>  
            </Menu.Item>
            <Menu.Item key="Contact">
              <Link href="/Contact">
                Contact
                </Link>  
            </Menu.Item>
            </Menu>
          </Col>
          <Col>
            <Title style={textStyle}>EN-ES</Title>
          </Col>
        </Row>
      </div>

    </>
  )
}

export default Header