import { Carousel } from 'antd';
import React from 'react';
import testPic from 'public/images/testPic.jpg';
import monicaS1 from 'public/images/monicaS1.jpg';
import Image from 'next/image'


const contentStyle = 
{
  position: "relative",
  width: "100%",
  height: "500px",
};

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "0",
  backgroundSize: "cover",
  backgroundPosition: "center",
};




function MainCarousel({slides}) {

  const imageStyle = {
    ...slideStyles,
    //backgroundImage: `url(${slides[currentIndex].url})`,
    backgroundImage: `url(images/monicaS1.jpg)`,

  };
  return (

    <div style={contentStyle}>
        <Carousel>
          <div>
            <img src="images/testPic.jpg"/>
          </div>
          <div>
            <img src="images/monicaS1.jpg"/>
          </div>
        </Carousel>
    </div>

  )
}

export default MainCarousel