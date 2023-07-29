import React from 'react'
import { Col, Row } from 'antd';
import { Typography} from 'antd';
import { Image } from 'antd';
import Link from "next/link";


const { Title, Paragraph, Text } = Typography;

const bodyStyle = {
    paddingTop: 110
}

const titleStyle = {
  paddingTop: 20,
  fontFamily: "Raleway",
  fontSize: 20,
  fontWeight: 600,  
};

const newsCard = {
background: "white",

}

const MainRow = {
  marginLeft:"5%",
  marginRight: "%5"
}

function MusicGallery({title,text,ImageUrl}) {
  return (
    <div>
        <Row justify="space-between" style={MainRow}>
          
            
            <Col span={10}>
              <Link href="www.google.com">
                  <Row style={{paddingBottom: 5}}>
                    <div style={newsCard} >
                      <Row>
                        <Col span={8}>                  
                          <Image src={"test"} height="190px" width="190px" />
                        </Col>
                        <Col span={16}>
                          <Row>
                            <Title style={titleStyle} >News Title</Title>
                          </Row>
                          <Row>
                            <Paragraph ellipsis={{rows: 4,}} height="100px">Music can change lives. Whether you are having a good or bad day, the power of music can change one’s mood.Music can change lives. Whether you are having a good or bad day, the power of music can change one’s mood.Music can change lives. Whether you are having a good or bad day, the power of music can change one’s mood.Music can change lives. Whether you are having a good or bad day, the power of music can change one’s mood.</Paragraph>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Row>
                </Link>
            </Col>
            </Row>
        
    </div>
  )
}

export default MusicGallery