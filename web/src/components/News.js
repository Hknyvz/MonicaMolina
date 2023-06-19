import React from 'react'
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

function News() {
  return (
    <div width="100%">
        <Row justify="space-evenly" style={bodyStyle}>
            <Title level={1} style={titleStyle}>Feature News</Title>
        </Row>
        <Row justify="space-evenly" style={{paddingBottom: 35}}>
            <Paragraph style={textStyle}>Music can change lives. Whether you are having a good or bad day, the power of music can change one’s mood.</Paragraph>
        </Row>
        <Row justify="center" gutter={16}>
          <Col span={8}>
            <iframe width="100%" height="550" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/730164346&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
          </Col>
          <Col span={8}>
            <Row style={{paddingBottom: 5}}>
              <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/730378846&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate, Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: 100,}}><a href="https://soundcloud.com/monica-molina-official" title="Mónica Molina" target="_blank" style={{color: "#cccccc", textDecoration: "none" }}>Mónica Molina</a> · <a href="https://soundcloud.com/monica-molina-official/poco-por-decir-en-directo" title="Poco por Decir (En Directo)" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>Poco por Decir (En Directo)</a></div>
            </Row>
            <Row style={{paddingBottom: 5}}>
              <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/730363999&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate, Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: 100,}}><a href="https://soundcloud.com/monica-molina-official" title="Mónica Molina" target="_blank" style={{color: "#cccccc", textDecoration: "none" }}>Mónica Molina</a> · <a href="https://soundcloud.com/monica-molina-official/aqui-o-alla-en-directo" title="Poco por Decir (En Directo)" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>Aquí o Allá (En Directo)</a></div>
            </Row>
            <Row>
              <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/730342792&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate, Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: 100,}}><a href="https://soundcloud.com/monica-molina-official" title="Mónica Molina" target="_blank" style={{color: "#cccccc", textDecoration: "none" }}>Mónica Molina</a> · <a href="https://soundcloud.com/monica-molina-official/aqui-o-alla-en-directo" title="Poco por Decir (En Directo)" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>Destinos Distantes (En Directo)</a></div>
            </Row>
          </Col>
        </Row>
    </div>
  )
}

export default News