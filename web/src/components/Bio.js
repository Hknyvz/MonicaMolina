import React from "react";
import { Col, Row } from "antd";
import { Typography } from "antd";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import EditorRead from "./shared/EditorRead";

const { Title, Paragraph, Text, Link } = Typography;

const textStyle = {
  fontFamily: "Raleway",
  fontWeight: 500,
  height: "100%",
  paddingLeft: "20%",
};

const titleStyle = {
  fontFamily: "Bacalisties",
  fontSize: 90,
  fontWeight: 100,
  paddingLeft: "10%",
};

const mainDivStyle = {
  paddingTop: "110px",
  paddingRight: "10%",
  paddingLeft: "10%",
};

const rightColStyle = {
  paddingTop: "5px",
  width: "60%",
};
function Bio({ data }) {
  return (
    <div style={mainDivStyle}>
      <Row>
        <Col flex="40%">
          <img
            height="auto"
            width="100%"
            style={{ objectFit: "cover" }}
            src={imageUrlBuilder(data.ImageUrl)}
          />
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
    </div>
  );
}

export default Bio;
