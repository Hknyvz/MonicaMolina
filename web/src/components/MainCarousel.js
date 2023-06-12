import { Carousel } from 'antd';
import React from 'react';
import testPic from 'public/static/images/testPic.jpg';
import monicaS1 from 'public/static/images/monicaS1.jpg';
import Image from 'next/image'


const contentStyle = {
    color: '#fff',
    background: '#364d79',
    width: "300px"
  };

const imageStyle = {
    width: "100%",
    maxHeight: "885px"
}



function MainCarousel() {
  return (
    <>

    <img src="static/images/testPic.jpg" width="500"/>
        <Carousel autoplay >
        <div style={contentStyle}>
            <Image src={testPic} style={imageStyle}/>
        </div>
        <div>
            <Image src={monicaS1} style={imageStyle}/>
        </div>
    </Carousel>
  </>
  )
}

export default MainCarousel