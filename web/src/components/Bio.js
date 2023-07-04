import React from 'react'
import { Col, Row } from 'antd';
import { Typography} from 'antd';
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";

const { Title, Paragraph, Text, Link } = Typography;

const textStyle = {
  fontFamily: "Raleway",
  fontWeight: 500,
  height: "100%",
  paddingLeft: "20%",
};



const titleStyle = {
  fontFamily: "Bacalisties",
  fontSize: 100,
  fontWeight: 100,
  paddingLeft: "10%",

};

const mainDivStyle = {
  paddingTop: "110px",
  paddingRight: "10%",
  paddingLeft: "10%",

}

const rightColStyle = {
  paddingTop: "110px",
  width: "60%",
}
function Bio({data}) {
  return (
  <div style={mainDivStyle}>
    <Row> 
      <Col className="gutter-row">
        <img height="840px" width="560px" style={{objectFit: "cover"}} src={imageUrlBuilder(data.ImageUrl)}/>
      </Col>
      <Col className="gutter-row" style={rightColStyle}>
        <Row>
          <Title level={1} style={titleStyle}>{data.Title}
          </Title>
        </Row>
        <Row>
           <Paragraph style={textStyle}>{data.Text}
          {/*<p>Mónica Molina stands out artistically thanks to her personal way of shaping the
                                      Mediterranean spirit through her voice and unique interpretation of her songs. Her
                                      elegance, her own style and unconditional commitment to quality have earned her
                                      great respect among the public and critics alike from the moment she released her first
                                      album (“Tu despedida”, Virgin Records, 1999).</p>

                                      <p>Mónica is the daughter of legendary singer Antonio Molina. She dedicated her early
                                      years to acting in movies, TV-series and theatre. After this period, she decided to
                                      develop a musical career, her true passion.</p>

                                      <p>This resulted in her first album (“Tu despedida ”, Virgin Records, 1999), which sold
                                      more than 50.000 copies (Gold Disc).</p>

                                      <p>The success continued with the presentation of her second album (“Vuela”, Virgin
                                      Records, 2001), selling more than 100.000 copies (Platinum Disc) and with her
                                      nomination for the Latin Grammy Awards (Best Female Interpretation) and for Best
                                      New Artist for the Spanish Music Awards (Premios de la Música).</p>

                                      <p>“Vuela” also meant the start of her career in Turkey. The album reached number 1 in
                                      the national charts and several of her songs have been great successes.</p>

                                      <p>In 2003, she released a third album (“De Cal y Arena”, Virgin Records), which further
                                      confirmed her reputation in the market. Some of her songs have been the main title
                                      theme of one of most popular Spanish TV series “Amar en tiempos Revueltos” (EMI-
                                      Music / Televisión Española) that continues to be broadcasted today.</p>

                                      <p>The fourth album (“A Vida”, EMI), was released in 2006, followed by “Autoretrato”
                                      (EMI, 2007), which includes the most representative songs of the first four albums
                                      (Platinum Disc in Turkey).</p>

                                      <p>In 2013 the album “Mar Blanca” (Sony Music) was released. This album contains
                                      versions of some her father’s songs from the 1950s and 1960s, adapted to Monica’s
                                      style.</p>

                                      <p>In 2016, she added new formats for her performances. This includes a symphonic
                                      concert, more “intimate” and jazz style formats (Trio, Quartet, Small Chamber
                                      Orchestra) with performances in Turkey, Spain, Mexico, and Italy among others.</p>

                                      <p>In 2023 Monica records “Mi Fortuna”, her 7th album, produced for the first time by
                                      herself.</p> */}
          </Paragraph>
        </Row>
      </Col>
    </Row>
  </div>
  )
}

export default Bio