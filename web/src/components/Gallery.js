import React from 'react'
import { Col, Row } from 'antd';
import { Typography} from 'antd';
import { Tabs } from 'antd';
import ImageGallery from 'src/components/ImageGallery.js'
import VideoGallery from 'src/components/VideoGallery.js'

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



function Gallery({data,data2}) {
  return (
    <div>
        <Row justify="space-evenly" style={bodyStyle}>
            <Title level={1} style={titleStyle}>Gallery Wall</Title>
        </Row>
        <Row justify="space-evenly" style={{paddingBottom: 35}}>
            <Tabs defaultActiveKey="1" centered style={{width:"70%"}}>
                <Tabs.TabPane tab="Photos" key="1" style={{marginTop: 30}}>
                    <ImageGallery data={data} />
                </Tabs.TabPane>
                {/* <Tabs.TabPane tab="Videos" key="2" style={{marginTop: 30}}>
                    <VideoGallery data={data2}/>
                </Tabs.TabPane> */}
            </Tabs>
        </Row>

    </div>
  )
}

export default Gallery