import React from "react";
import AlbumCard from "src/components/AlbumCard.js";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import { Col, Row } from "antd";
import { Typography } from "antd";
import { useMediaQuery, useTheme } from "@mui/material";

const { Title, Paragraph, Text, Link } = Typography;

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
  paddingTop: 150,
};
const bodyStyleSmall = {
  paddingTop: 50,
};
function Disco({ data }) {
  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div width="100%">
      {isDownMD ? (
        <div>
          <Row justify="space-evenly" style={bodyStyleSmall}>
            {data.map((item) => (
              <AlbumCard
                key={item.Year}
                coverImage={imageUrlBuilder(item.ImageUrl)}
                title={item.Name}
                date={item.Year}
                ItunesLink={item.ItunesLink}
                SpotifyLink={item.SpotifyLink}
                YoutubeLink={item.YoutubeLink}
              />
            ))}
          </Row>
        </div>
      ) : (
        <div>
          <Row justify="space-evenly" style={bodyStyle}>
            {data.map((item) => (
              <AlbumCard
                key={item.Year}
                coverImage={imageUrlBuilder(item.ImageUrl)}
                title={item.Name}
                date={item.Year}
                ItunesLink={item.ItunesLink}
                SpotifyLink={item.SpotifyLink}
                YoutubeLink={item.YoutubeLink}
              />
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default Disco;
