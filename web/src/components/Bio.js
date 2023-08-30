import React from "react";
import { Col, Row } from "antd";
import { Typography } from "antd";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import EditorRead from "./shared/EditorRead";
import { useMediaQuery, useTheme, } from "@mui/material";

const { Title, Paragraph, Text, Link } = Typography;

const textStyle = {
  fontFamily: "Raleway",
  fontWeight: 500,
  height: 400,
  paddingLeft: "20%",
  paddingRight: "15px",
  overflow: "auto"
};
const textStyleSmall = {
  fontFamily: "Raleway",
  fontWeight: 500,
  height: 400,
  paddingRight: "15px",
  overflow: "auto",
  paddingTop: 20
};

const titleStyle = {
  fontFamily: "Bacalisties",
  fontSize: 60,
  fontWeight: 100,
  paddingLeft: "10%",
};
const titleStyleSmall = {
  fontFamily: "Bacalisties",
  fontSize: 40,
  fontWeight: 100,
  paddingTop: 20
};

const mainDivStyle = {
  paddingTop: "110px",
  paddingRight: "10%",
  paddingLeft: "10%",
};

const rightColStyle = {
  paddingTop: "5px",
  width: "60%",
  position: "relative"
};
function Bio({ data }) {

  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div style={mainDivStyle}>
      {isDownMD ? (       
        <Row justify="center" style={{marginTop:"-60px"}} >
          <Row>
            <Col>
              <Row>
                <div style={{width:"100%",maxWidth:"400px"}}>
                  <img
                  height="auto"
                  width="100%"
                  style={{ objectFit: "cover" }}
                  src={imageUrlBuilder(data.ImageUrl)}
                />
                </div>
              </Row>
              <Row>
                <Title level={1} style={titleStyleSmall}>
                  {data.Title}
                </Title>
              </Row>
            </Col>
          </Row>
          <Row>      
            <Paragraph style={textStyleSmall}>
              <EditorRead text={data.Text} />
            </Paragraph>     
          </Row>

        </Row>
        ):(  
        <Row>
          <Col flex="40%" style={{ paddingTop:"50%"}}>
            <div style={{position: "absolute", bottom: "0px", width:"100%",}}>
              <img
              height="auto"
              width="100%"
              style={{ objectFit: "cover" }}
              src={imageUrlBuilder(data.ImageUrl)}
            />
            </div>
            
          </Col>
          <Col flex="auto" style={rightColStyle}>
            <Row>
              <Title level={1} style={titleStyle}>
                {data.Title}
              </Title>
            </Row>
            <Row>
              <Paragraph style={textStyle}>
                <EditorRead text={data.Text} />
              </Paragraph>
            </Row>
          </Col>
        </Row>
      )}
      
    </div>
  );
}

export default Bio;
