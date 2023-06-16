import React from 'react'
import { Col, Row } from 'antd';
import { Typography} from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const textStyle = {
  hegiht: "100%",
  paddingLeft: "20%",
};



const titleStyle = {
  fontFamily: "Allison",
  fontSize: 50,
  paddingLeft: "10%",

};

const mainDivStyle = {
  paddingTop: "110px",
  paddingRight: "10%",
  paddingLeft: "10%",

}

const rightColStyle = {
  paddingTop: "110px",
}

function index() {
  return (
    <div style={mainDivStyle}>
      <Row gutter={{ xs: 8,sm: 16,md: 24,lg: 32,}}> 
        <Col className="gutter-row">
          <img src="images/bio_pic.png"/>
        </Col>
        <Col className="gutter-row" span={12} style={rightColStyle}>
          <Row>
            <Title level={1} style={titleStyle}>Lorem ipsum
            </Title>
          </Row>
          <Row>
            <Paragraph style={textStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit turpis at magna convallis tristique. Integer mollis scelerisque neque, quis porttitor felis luctus at. Nam non faucibus elit. Pellentesque venenatis suscipit enim, tempor bibendum libero auctor nec. Integer a velit porttitor, dignissim urna eu, imperdiet urna. Nullam sed tincidunt elit. In molestie, neque molestie aliquam volutpat, neque quam pharetra purus, non dignissim nulla nisl interdum elit. Sed dictum tristique ante, in convallis risus posuere at. Vestibulum lobortis porta enim, et molestie tortor. Pellentesque non erat ut erat egestas lacinia vestibulum sit amet orci. Cras sollicitudin libero in malesuada finibus.
            </Paragraph>
          </Row>
        </Col>
      </Row>
    </div>
    )
}

export default index

index.layout = "web";
