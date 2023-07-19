import React from 'react'
import { Col, Row } from 'antd';
import { Typography} from 'antd';
import { Image } from 'antd';
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;

const titleStyle = {
    paddingTop: 20,
    fontFamily: "Raleway",
    fontSize: 35,
    fontWeight: 300,  
};

const bodyStyle = {
    paddingTop: 110
}

const LowerArea = {
    padding:20,
    backgroundColor: "rgb(240, 240, 240)",
    width: 400,
    bottom: 0,
    boxShadow: "0px 0px 2px 0px rgb(200, 200, 200)",
}
const middleArea = {
    marginTop: 40,
    paddingBottom: 50,
    padding:20,
    backgroundColor: "white",
    width: 400,
    bottom: 0,
}

const container = {
    height:"100%"
}

const divStyle = {
    background: "linear-gradient(90deg, rgba(230,230,230,1) 0%, rgba(255,255,255,1) 100%)",

}

function Redirection({data}) {
  return (
    <div style={divStyle}>
        <Row justify="space-evenly" style={bodyStyle}>
            <Image width={556} height={572} src="../home-photo/1c508781-43e0-4dcd-ad1c-64189bwebpba0aba.webp"  preview="../home-photo/1c508781-43e0-4dcd-ad1c-64189bwebpba0aba.webp" />
        </Row>
        <Row justify="space-evenly">
            <Title style={titleStyle}>NEW ALBUM</Title>
        </Row>
        <Row justify="space-around" align="middle" style={container}>        
            <Row justify="space-around" align="middle" style={middleArea}>
                <Row justify="space-around" style={LowerArea} align="middle">
                    
                    <Link href="www.google.com">
                        <img src="../apple_music.svg" width="50px"/>
                    </Link>
                    <Link href="www.google.com">
                        <img src="../spotify.svg" width="50px"/>
                    </Link>            
                    <Link href="www.google.com">
                        <img src="../youtube.svg" width="50px"/>
                    </Link>
                </Row>
            </Row>
        </Row>
    </div>
  )
}

export default Redirection