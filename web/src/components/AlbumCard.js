import React from 'react'
import { Col, Row } from 'antd';
import { Typography} from 'antd';
import { useState } from "react";

const { Title, Paragraph, Text, Link } = Typography;

const titleStyle = {

    fontFamily: "Raleway",
    fontSize: 24,
    fontWeight: 500,
    paddingTop: 20,
    marginBottom: 0
  
};

const textStyle = {

    fontFamily: "Raleway",
    fontSize: 18,
    fontWeight: 500,
    paddingTop: 0,
    color: "grey",
  
};


function AlbumCard({coverImage, title, date,ItunesLink,SpotifyLink,YoutubeLink}) {

    const [x,setX] = useState(0);

    function HandleMouseEnter () {
        setX(75);
    }
    function HandleMouseLeave () {
        setX(0);
    }

    const cover = 
    {
        height: 200,
        width: 200,
        backgroundColor: "rgba(204, 204, 204)",
        zIndex: 1,
        position: "absolute",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.30)",
        marginRight: x,
        
    }
    const disc = 
    {
        height: 200,
        width: 200,
        marginLeft: x,

    }
    const links = {
        backgroundColor:'hsl(11, 0%, 100%, 0.5)',
        paddingTop: 5
    }
console.log("YoutubeLink: " + YoutubeLink);
  return (

    <div onMouseEnter={HandleMouseEnter} onMouseLeave={HandleMouseLeave}>
        <Col>
            <Row justify="space-evenly">
                <div style={cover}>
                    <img src={coverImage} width="100%" height="100%" />
                    <div style={{position: "absolute", bottom: "0px", width:"100%",}}>
                    <Row justify="space-around" style={links} align="middle">
                        {ItunesLink === null || ItunesLink === "" ? "" :
                        <Link href={ItunesLink}>
                            <img src="../apple_musicBlack.svg" width="30px"/>
                        </Link>
                        }
                        {SpotifyLink === null || SpotifyLink === "" ? "" 
                        :  
                        <Link href={SpotifyLink}>
                            <img src="../spotifyBlack.svg" width="30px"/>
                        </Link>           
                        }
                        {YoutubeLink === null || YoutubeLink === "" ? ""
                        :  
                        <Link href={YoutubeLink}>
                            <img src="../youtubeBlack.svg" width="30px"/>
                        </Link>     
                        }
                     </Row>
                    </div>                    
                </div>
                <div style={disc}>
                    <img src={"images/disc.png"} width="100%" height="100%"/> 
                </div>
            </Row>
            <Row justify="space-evenly">
                <Title style={titleStyle}>{title}</Title>
            </Row>
            <Row justify="space-evenly">
                <Text style={textStyle}>({date})</Text>
            </Row>
        </Col>   
    </div>
  )
}

export default AlbumCard