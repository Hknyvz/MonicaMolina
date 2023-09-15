import { Carousel } from "antd";
import React from "react";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import { useMediaQuery, useTheme } from "@mui/material";

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "0",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

function MainCarousel({ data, status }) {
  useEffect(() => {
    window.addEventListener("resize", () => {
      window.location.reload();
    });
  }, []);

  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const contentStyle = {
    position: "relative",
    width: windowSize.current[0],
    height: "100%",
    minHeight: 0,
  };
  const carouselStyle = {
    width: windowSize.current[0],
    height: windowSize.current[1] - 86,
  };
  const carouselStyleSmall = {
    width: windowSize.current[0],
    height: "100%",
  };

  const imageStyles = {
    width: windowSize.current[0],
    height: windowSize.current[1] - 86,
    objectFit: "cover",
  };
  const imageStylesSmall = {
    width: "100%",
    height: windowSize.current[1] - 132,
    objectFit: "cover",
  };

  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div style={contentStyle}>
      {isDownMD ? (
        <Carousel style={carouselStyleSmall} autoplay>
          {data.map((item) => (
            <div>
              {item.HaveDetail ? (
                <Link href={`http://www.monicamolina.com/api/home/${item._id}`}>
                  <img
                    style={imageStylesSmall}
                    src={imageUrlBuilder(item.MobileImageUrl)}
                  />
                </Link>
              ) : (
                <img
                  style={imageStylesSmall}
                  src={imageUrlBuilder(item.MobileImageUrl)}
                />
              )}
            </div>
          ))}
        </Carousel>
      ) : (
        <Carousel style={carouselStyle} autoplay>
          {data.map((item) => (
            <div>
              {item.HaveDetail ? (
                <Link href={`http://www.monicamolina.com/home/${item._id}`}>
                  <img
                    style={imageStyles}
                    src={imageUrlBuilder(item.ImageUrl)}
                  />
                </Link>
              ) : (
                <img style={imageStyles} src={imageUrlBuilder(item.ImageUrl)} />
              )}
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default MainCarousel;

// {isDownMD ? (

//   ):(

//    )}
