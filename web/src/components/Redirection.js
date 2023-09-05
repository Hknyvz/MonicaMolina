import React from 'react'
import { Col, Row } from 'antd';
import { Typography} from 'antd';
import { Image } from 'antd';
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import Link from "next/link";
import { useMediaQuery, useTheme } from "@mui/material";

const { Title, Paragraph, Text } = Typography;

const titleStyle = {
    paddingTop: 20,
    fontFamily: "Raleway",
    fontSize: 35,
    fontWeight: 300,  
};

const bodyStyle = {
    paddingTop: 80
}

const bodyStyleSmall = {
    paddingTop: 80
}
const LowerArea = {
    padding:15,
    backgroundColor: "rgb(240, 240, 240)",
    width: 300,
    boxShadow: "0px 0px 2px 0px rgb(200, 200, 200)",
}
const middleArea = {
    marginTop: 10,
    paddingBottom: 50,
    padding:15,
    backgroundColor: "white",
    width: 300,
}

const container = {
    // borderStyle: "dotted",
    position: "absolute",
    bottom: "0px",
    width:"100%",

}

const smallContainer = {
    // borderStyle: "dotted",
    width:"100%",

}

const divStyle = {
    background: "linear-gradient(90deg, rgba(230,230,230,1) 0%, rgba(255,255,255,1) 100%)",
    top:"0px",
    bottom:"0px",
    zIndex: 0,
    position: "absolute",
    width:"100%",
    paddingTop:80,

}

function Redirection({data}) {
    const theme = useTheme();
    const isDownMD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
        {isDownMD ? ( 
            <div>
                <Row justify="space-evenly" style={bodyStyleSmall}>
                    <Image width={278} height={286} src={imageUrlBuilder(data.DetailImageUrl)} />
                </Row>
                <Row justify="center" style={{paddingRight:"15%", paddingLeft:"15%",marginBottom: 10}}>
                    <Row> 
                        <Title style={titleStyle}>{data.DetailTitle}</Title> 
                    </Row>                    
                </Row>
                <Row justify="space-around" align="middle" style={smallContainer}>        
                    <Row justify="space-around" align="middle" style={middleArea}>
                        <Row justify="space-around" style={LowerArea} align="middle">
                            {data.ItunesLink === undefined ? "" :
                            <Link href={data.ItunesLink}>
                                <img src="../apple_music.svg" width="30px"/>
                            </Link>
                            }
                            {data.SpotifyLink === undefined ? "" 
                            :  
                            <Link href={data.SpotifyLink}>
                                <img src="../spotify.svg" width="30px"/>
                            </Link>           
                            }
                            {data.YoutubeLink === undefined ? ""
                            :  
                            <Link href={data.YoutubeLink}>
                                <img src="../youtube.svg" width="30px"/>
                            </Link>     
                            }
                        </Row>
                    </Row>
                </Row>
            </div>
          ):(  
            <div style={{divStyle}}>
                <Row justify="space-evenly" style={bodyStyle}>
                    <Image width={556} height={572} src={imageUrlBuilder(data.DetailImageUrl)} />
                </Row>
                <Row justify="space-evenly" style={{paddingBottom:100}}>
                    <Title style={titleStyle}>{data.DetailTitle}</Title>
                </Row>
                <Row justify="space-around" align="middle" style={container}>        
                    <Row justify="space-around" align="middle" style={middleArea}>
                        <Row justify="space-around" style={LowerArea} align="middle">
                            {data.ItunesLink === undefined ? "" :
                            <Link href={data.ItunesLink}>
                                <img src="../apple_music.svg" width="30px"/>
                            </Link>
                            }
                            {data.SpotifyLink === undefined ? "" 
                            :  
                            <Link href={data.SpotifyLink}>
                                <img src="../spotify.svg" width="30px"/>
                            </Link>           
                            }
                            {data.YoutubeLink === undefined ? ""
                            :  
                            <Link href={data.YoutubeLink}>
                                <img src="../youtube.svg" width="30px"/>
                            </Link>     
                            }
                        </Row>
                    </Row>
                </Row>
            </div>
        )}
        
    </div>
  )
}

export default Redirection