import React from 'react'
import AlbumCard from 'src/components/AlbumCard.js'
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import { Col, Row } from 'antd';
import { Typography} from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Album = [
    {coverImage:"images/albumCover5.jpg", title:"Mar Blanca", date:"2012"},
    {coverImage:"images/albumCover6.jpg", title:"Autorretrato", date:"2007"},
    {coverImage:"images/albumCover1.jpg", title:"A Vida", date:"2006"},
    {coverImage:"images/albumCover4.jpg", title:"De Cal Y Arena", date:"2003"},
    {coverImage:"images/albumCover3.jpg", title:"Vuela", date:"2001"},
    {coverImage:"images/albumCover2.jpg", title:"Tu Despedida", date:"1999"}
]

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

function Disco({data}) {
  return (
    <div width="100%">
        <Row justify="space-evenly" style={bodyStyle}>
            <Title level={1} style={titleStyle}>Music Albums</Title>
        </Row>
        <Row justify="space-evenly">
            <Paragraph style={textStyle}>Check out my newest albums.</Paragraph>
        </Row>
        <Row justify="space-evenly" style={bodyStyle}>
            {data.map((item) => 
            <AlbumCard coverImage={imageUrlBuilder(item.ImageUrl)} title={item.Name} date={item.Year}/>
            )}            
        </Row>
    </div>
  )
}

export default Disco