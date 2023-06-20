import React from 'react'
import { Col, Row } from 'antd';
import { Typography} from 'antd';
import MusicGallery from 'src/components/MusicGallery.js'
import { List } from 'antd';

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


const VideoList = [
    {Embed:"https://www.youtube.com/embed/kJxuPL0EEPA"},
    {Embed:"https://www.youtube.com/embed/N9U-vFMNPvw"},
    {Embed:"https://www.youtube.com/embed/5b6bxMyiXyw"},
    {Embed:"https://www.youtube.com/embed/_4gmrs_5ncU"},
    {Embed:"https://www.youtube.com/embed/nY4wtUayQJ0"},
    {Embed:"https://www.youtube.com/embed/ksFlSvO9yS8"},
    {Embed:"https://www.youtube.com/embed/yl5tSno_hWI"},
    {Embed:"https://www.youtube.com/embed/I9LxKbIXoBQ"},
    {Embed:"https://www.youtube.com/embed/7U0vGos0Mds"},
  
  ]
function News() {
  return (
    <div width="100%">
        <Row justify="space-evenly" style={bodyStyle}>
            <Title level={1} style={titleStyle}>Feature News</Title>
        </Row>
        <Row justify="space-evenly" style={{paddingBottom: 35}}>
            <Paragraph style={textStyle}>Music can change lives. Whether you are having a good or bad day, the power of music can change one’s mood.</Paragraph>
        </Row>
        <List itemLayout="vertical" size="large" pagination={{ positin:"bottom", align: "center", pageSize: 1}} grid={{ gutter: 18 ,column: 1 }}  dataSource={VideoList} renderItem={(item) => (
            <List.Item>                
                <MusicGallery/>         
            </List.Item>           
          )}/>  
        
    </div>
  )
}

export default News