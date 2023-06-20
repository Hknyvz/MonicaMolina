import React from 'react'
import { Col, Row } from 'antd';
import { Typography} from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';

const { TextArea } = Input;

const { Title, Paragraph, Text, Link } = Typography;

const titleStyle = {
    fontFamily: "Raleway",
    fontSize: 36,
    fontWeight: 500,  
};
const SubTitleStyle = {
    fontFamily: "Raleway",
    fontSize: 16,
    fontWeight: 600,  
};
const textStyle = {
    fontFamily: "Raleway",
    fontSize: 16,
    fontWeight: 400,  
};
const rowStyle = {
    paddingTop: 10,
};
const inputStyle = {
    width:"100%",
    borderRadius: 0,
    borderBottom: "1px solid rgba(0, 0, 0, .6)",
    height: 60,
    fontFamily: "Raleway",
    fontSize: 16,
    fontWeight: 600,
};
const textAreaStyle = {
    width:"100%",
    borderRadius: 0,
    borderBottom: "1px solid rgba(0, 0, 0, .6)",
    resize: 'none',
    height: 150,
    fontFamily: "Raleway",
    fontSize: 16,
    fontWeight: 600,
};
const buttonStyle = {
    borderRadius: 5,
    border: "1px solid rgba(0, 0, 0)",
};


function Contact() {
  return (
    <div style={{paddingTop: 300, paddingRight: "15%", paddingLeft: "15%"}}>
        <Row gutter={24} justify="center">
            <Col span={10}>
                <Row>
                    <Title level={1} style={titleStyle}>Contact Us</Title>
                </Row>
                <Row>
                    <Title level={1} style={SubTitleStyle}>Booking</Title>
                </Row>
                <Row>
                    <Text style={textStyle}>Musicarium Entertainment</Text>
                </Row>
                <Row justify="start" align="middle" style={rowStyle}> <Title level={1} style={SubTitleStyle}>E-mail</Title> </Row> 
                <Row>
                    <Text style={textStyle}>ipek@musicarium.live</Text><Text style={textStyle}>&nbsp;|&nbsp;</Text><Text style={textStyle}>muge@musicarium.live</Text><Text style={textStyle}>&nbsp;|&nbsp;</Text><Text style={textStyle}>info@musicarium.live</Text>
                </Row>
                <Row justify="start" align="middle" style={rowStyle}> <Title level={1} style={SubTitleStyle}>Phone</Title> </Row> 
                <Row>
                    <Text style={textStyle}>+90 216 422 48 01</Text><Text style={textStyle}>&nbsp;|&nbsp;</Text><Text style={textStyle}>+49 01523 1323266</Text><Text style={textStyle}>&nbsp;|&nbsp;</Text><Text style={textStyle}>+90 (535) 652 1707 </Text>
                </Row>          
            </Col>
            <Col span={14} >
                <Row gutter={8}>
                    <Col style={{width:"50%"}}> 
                        <Input placeholder="Name" bordered={false} style={inputStyle}/>
                    </Col> 
                    <Col style={{width:"50%"}}> 
                        <Input placeholder="E-mail" bordered={false} style={inputStyle}/> 
                    </Col>
                </Row>
                <Row>
                    <Col style={{width:"100%"}}> 
                        <Input placeholder="Title" bordered={false} style={inputStyle}/>
                    </Col>
                </Row>
                <Row style={{paddingTop:20}}>
                    <Col style={{width:"100%"}}>
                        <TextArea showCount maxLength={200} style={textAreaStyle} bordered={false} placeholder="Message"/>
                    </Col>
                </Row>
                <Row justify="center" style={{paddingTop:20}}>
                    <Button style={buttonStyle} size="large">Send Message</Button>
                </Row>
            </Col>
        </Row>
    </div>
  )
}

export default Contact