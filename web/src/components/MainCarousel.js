import { Carousel } from 'antd';
import React from 'react';
import { useRef } from 'react';
import Link from 'next/link'




const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "0",
  backgroundSize: "cover",
  backgroundPosition: "center",
};




function MainCarousel({slides}) {

    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    
    const contentStyle = 
    {
      position: "relative",
      width: windowSize.current[0],
      height: windowSize.current[1]-86,
    };
    const carouselStyle = 
    {
      width: windowSize.current[0],
      height: windowSize.current[1]-86,
    };

  const imageStyle = {
    ...slideStyles,
    //backgroundImage: `url(${slides[currentIndex].url})`,
    backgroundImage: `url(images/monicaS1.jpg)`,
  };

  const imageStyles = 
  {
    width: windowSize.current[0],
    height: windowSize.current[1]-86,
    objectFit: "cover"
  }

  return (

    <div style={contentStyle}>
        <Carousel style={carouselStyle} autoplay>
          <div>
            <Link href="https://www.google.com">
                <img style={imageStyles} src="images/slider1.jpg"/>
            </Link>
          </div>
          <div>
            <Link href="https://www.google.com">
                <img style={imageStyles} src="images/slider2.jpg"/>
            </Link>
            </div>
            <div>
            <Link href="https://www.google.com">
                <img style={imageStyles} src="images/slider3.jpg"/>
            </Link>
          </div>
        </Carousel>
    </div>

  )
}

export default MainCarousel