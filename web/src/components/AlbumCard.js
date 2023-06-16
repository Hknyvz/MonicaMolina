import React from 'react'
import { Col, Row } from 'antd';
import { Typography} from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const cover = 
{
    height: 200,
    width: 200,
    backgroundColor: "rgba(204, 204, 204)",
    zIndex: 1,
    position: "absolute",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.30)",
}
const disc = 
{
    height: 200,
    width: 200,
}

const titleStyle = {

    fontFamily: "Raleway",
    fontSize: 24,
    fontWeight: 700,
    paddingTop: 20,
    marginBottom: 0
  
};

const textStyle = {

    fontFamily: "Raleway",
    fontSize: 18,
    fontWeight: 500,
    paddingTop: 0,
    color: "grey",
  
};

function AlbumCard() {
  return (

    <>
    <Col>
        <Row justify="space-evenly">
            <div style={cover}>
                <img src={"images/albumCover1.jpg"} width="100%" height="100%" />
            </div>
            <div style={disc}>
                <img src={"images/disc.png"} width="100%" height="100%"/> 
            </div>
        </Row>
        <Row justify="space-evenly">
            <Title style={titleStyle}>A Vida</Title>
        </Row>
        <Row justify="space-evenly">
            <Text style={textStyle}>(2006)</Text>
        </Row>
    </Col>
    
    </>
  )
}

export default AlbumCard