import React, { useRef } from 'react';
import { Col, Row } from 'antd';
import { Typography} from 'antd';
import { Input } from 'antd';
import { Button, message } from 'antd';
import emailjs from '@emailjs/browser';
import { useMediaQuery, useTheme } from "@mui/material";

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
const rowStyleSmall = {
    paddingTop: 10,
};
const inputStyle = {
    width:"100%",
    borderRadius: 0,
    borderStyle: "none",
    borderBottom: "1px solid rgba(0, 0, 0, .6)",
    height: 60,
    fontFamily: "Raleway",
    fontSize: 14,
    fontWeight: 400,
    backgroundColor: "rgb(245,245,245)",
    textColor: "rgb(245,245,245)",
    padding: 10,
};
const textAreaStyle = {
    width:"100%",
    borderRadius: 0,
    borderStyle: "none",
    borderBottom: "1px solid rgba(0, 0, 0, .6)",
    resize: 'none',
    height: 150,
    fontFamily: "Raleway",
    fontSize: 14,
    fontWeight: 400,
    backgroundColor: "rgb(245,245,245)",
    padding: 10,
};
const buttonStyle = {
    borderRadius: 5,
    border: "1px solid rgba(0, 0, 0)",
};



function Contact() {

    const theme = useTheme();
    const isDownMD = useMediaQuery(theme.breakpoints.down("md"));

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('musicarium.entertainment', 'template_1ylmhhq', form.current, 'xb4YdklVLADZv3Epn')
        .then((result) => {
            console.log(result.text);
            mail_success();
        }, (error) => {
            console.log(error.text);
            mail_error();
            });
        };

    const [messageApi, contextHolder] = message.useMessage();
    const mail_success = () => {
        messageApi.open({
        type: 'success',
        content: 'Mail Sent',
        });
    };
    const mail_error = () => {
        messageApi.open({
        type: 'error',
        content: 'There was an error. Mail sending is failed',
        });
    };

  return (

    <div >
        {contextHolder}
        {isDownMD ? ( 
        <div style={{marginTop: 50,paddingRight: "5%", paddingLeft: "5%"}}>
            
                <Row justify="center" >
                    <Title level={1} style={titleStyle}>Contact Us</Title>
                </Row>
                <Row>
                    <Title level={1} style={SubTitleStyle}>Booking</Title>
                </Row>
                <Row>
                    <Text style={textStyle}>Musicarium Entertainment</Text>
                    <Text style={textStyle}>Isabel Capllonch</Text>
                </Row>
                <Row style={{paddingTop: 10}}> 
                    <Title level={1} style={SubTitleStyle}>E-mail</Title> 
                </Row> 
                <Row>
                    <Text style={textStyle}>ipek@musicarium.live</Text><Text style={textStyle}>&nbsp;|&nbsp;</Text><Text style={textStyle}>efe@musicarium.live</Text><Text style={textStyle}>&nbsp;|&nbsp;</Text><Text style={textStyle}>info@musicarium.live</Text>
                    <Text style={textStyle}>eisaca@telefonica.net</Text>                    
                </Row>
                <Row justify="start" align="middle" style={rowStyle}> 
                    <Title level={1} style={SubTitleStyle}>Phone</Title> 
                </Row> 
                <Row>
                    <Text style={textStyle}>+90 216 422 48 01</Text><Text style={textStyle}>&nbsp;|&nbsp;</Text><Text style={textStyle}>+49 01523 1323266</Text><Text style={textStyle}>&nbsp;|&nbsp;</Text><Text style={textStyle}>+34636533826</Text>
                </Row>          
           
            <Row justify="center" style={{width:"100%", paddingTop: 20}}>
                <form ref={form} onSubmit={sendEmail} style={{width:"100%"}}>
                        <Row style={{width:"100%"}}> 
                            <input type="text" className="form__input" id="name" placeholder="Name" required="" name="from_name"  style={inputStyle}/>
                        </Row> 
                        <Row style={{width:"100%"}}> 
                            <input type="text" className="form__input" id="e-posta" placeholder="E-mail" required="" name="from_email" style={inputStyle} /> 
                        </Row>
                    <Row style={{paddingTop:20}}>
                        <Col style={{width:"100%"}}>
                            <textarea name="message" placeholder="Message" className="form__input" style={textAreaStyle}/>
                        </Col>
                    </Row>
                    <Row justify="center" style={{paddingTop:20}}>
                        <Button style={buttonStyle} size="large" value="Send" onClick={sendEmail}>Send Message</Button>
                    </Row>
                </form>
            </Row>
            
        </div>
        ):(  
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
                        <Text style={textStyle}>&nbsp;|&nbsp;</Text>
                        <Text style={textStyle}>Isabel Capllonch</Text>

                    </Row>
                    <Row justify="start" align="middle" style={rowStyle}> <Title level={1} style={SubTitleStyle}>E-mail</Title> </Row> 
                    <Row>
                        <Text style={textStyle}>ipek@musicarium.live</Text><Text style={textStyle}>&nbsp;|&nbsp;</Text><Text style={textStyle}>muge@musicarium.live</Text><Text style={textStyle}>&nbsp;|&nbsp;</Text><Text style={textStyle}>info@musicarium.live</Text> <Text style={textStyle}>&nbsp;|&nbsp;</Text> <Text style={textStyle}>eisaca@telefonica.net</Text>   
                    </Row>
                    <Row justify="start" align="middle" style={rowStyle}> <Title level={1} style={SubTitleStyle}>Phone</Title> </Row> 
                    <Row>
                        <Text style={textStyle}>+90 216 422 48 01</Text><Text style={textStyle}>&nbsp;|&nbsp;</Text><Text style={textStyle}>+49 01523 1323266</Text><Text style={textStyle}>&nbsp;|&nbsp;</Text><Text style={textStyle}>+90 (535) 652 1707 </Text> <Text style={textStyle}>&nbsp;|&nbsp;</Text><Text style={textStyle}>+34636533826</Text>
                    </Row>          
                </Col>
                <Col span={14} >
                    <form ref={form} onSubmit={sendEmail}>
                        <Row gutter={8}>
                            <Col style={{width:"50%"}}> 
                                <input type="text" className="form__input" id="name" placeholder="Name" required="" name="from_name"  style={inputStyle}/>
                            </Col> 
                            <Col style={{width:"50%"}}> 
                                <input type="text" className="form__input" id="e-posta" placeholder="E-mail" required="" name="from_email" style={inputStyle} /> 
                            </Col>
                        </Row>
                        <Row style={{paddingTop:20}}>
                            <Col style={{width:"100%"}}>
                                <textarea name="message" placeholder="Message" className="form__input" style={textAreaStyle}/>
                            </Col>
                        </Row>
                        <Row justify="center" style={{paddingTop:20}}>
                            <Button style={buttonStyle} size="large" value="Send" onClick={sendEmail}>Send Message</Button>
                        </Row>
                    </form>
                </Col>
                
            </Row>
            </div>
            )}
        
    </div>
  )
}

export default Contact