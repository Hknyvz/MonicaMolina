import React from 'react'
import { Col, Row } from 'antd';
import { Typography} from 'antd';
import { Tabs } from 'antd';
import ImageGallery from 'src/components/ImageGallery.js'
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

function Gallery() {
  return (
    <div>
        <Row justify="space-evenly" style={bodyStyle}>
            <Title level={1} style={titleStyle}>Gallery Wall</Title>
        </Row>
        <Row justify="space-evenly" style={{paddingBottom: 35}}>
            <Tabs defaultActiveKey="1" centered>
                <Tabs.TabPane tab="Photos" key="1">
                    <Row justify="center" gutter={16}>
                        <ImageGallery/>
                    </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Videos" key="2">
                    <Row justify="center" gutter={16}>

                    </Row>
                </Tabs.TabPane>
            </Tabs>
        </Row>

    </div>
  )
}

export default Gallery