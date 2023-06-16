import React from 'react'
import AlbumCard from 'src/components/AlbumCard.js'

import { Col, Row } from 'antd';
import { Typography} from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const titleStyle = {
    fontFamily: "Raleway",
    fontSize: 52,
    fontWeight: 300,  
};
const textStyle = {
    fontFamily: "Raleway",
    fontWeight: 300,
    fontSize: 18,
    color: "grey",
  };

const bodyStyle = {
    paddingTop: 110
}

function Disco() {
  return (
    <div width="100%">
        <Row justify="space-evenly" style={bodyStyle}>
            <Title level={1} style={titleStyle}>Music Albums</Title>
        </Row>
        <Row justify="space-evenly">
            <Paragraph style={textStyle}>Check out my newest albums.</Paragraph>
        </Row>
        <Row justify="space-evenly" style={bodyStyle}>
            <AlbumCard/>
        </Row>
    </div>
  )
}

export default Disco