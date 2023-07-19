import { Carousel } from "antd";
import React from "react";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "0",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

function MainCarousel({ data }) {
  useEffect(() => {
    window.addEventListener("resize", () => {
      window.location.reload();
    });
  }, []);

  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const contentStyle = {
    position: "relative",
    width: windowSize.current[0],
    height: windowSize.current[1] - 86,
  };
  const carouselStyle = {
    width: windowSize.current[0],
    height: windowSize.current[1] - 86,
  };

  const imageStyles = {
    width: windowSize.current[0],
    height: windowSize.current[1] - 86,
    objectFit: "cover",
  };

  return (
    <div style={contentStyle}>
      <Carousel style={carouselStyle} autoplay>
        {data.map((item) => (
          <div>
            {/* <Link href={item.Link}> */}
            <Link href="/redirection">
              <img style={imageStyles} src={imageUrlBuilder(item.ImageUrl)} />
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default MainCarousel;
