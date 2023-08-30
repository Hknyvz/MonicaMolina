import React , { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { Typography} from 'antd';
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import { Image } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider, List, Skeleton } from 'antd';
import EditorRead from "./shared/EditorRead";
import { useMediaQuery, useTheme } from "@mui/material";

const { Title, Paragraph, Text, Link } = Typography;

const titleStyle = {
    fontFamily: "Montserrat",
    fontSize: 28,
    fontWeight: 500,
    paddingTop: 20, 
};
const textStyle = {
    fontFamily: "Montserrat",
    fontWeight: 500,
    fontSize: 24,
    paddingTop: 20, 

  };

const bodyStyle = {
    paddingTop: 110,
    height: "100%"
}
const MainRow = {
  marginLeft:"5%",
  marginRight: "%5",
  paddingBottom: 30,
  height: "100%"
}
const MainRowSmall = {
  height: "100%",
  paddingLeft:"5%",
  paddingRight: "%5",
  marginTop: "-60px",
  paddingBottom: 30,

}

function News() {
  
  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("md"));

  const [bigNews, setBigNews] = useState({Title:"",Text:"",ImageUrl:"", ThumbnailUrl:""});

  const [isFirst, setIsFirst ] = useState(true);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_WEPPATH_URL}/api/news`)
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body]);
        if(isFirst)
        { console.log("girdi");
          setBigNews({Title:body[0].Title,Text:body[0].Text,ImageUrl:body[0].ImageUrl, ThumbnailUrl:body[0].ThumbnailUrl});
        }
        setLoading(false);
        setIsFirst(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);

const newsChoice = (data) => {
  setBigNews({Title:data.Title,Text:data.Text,ImageUrl:data.ImageUrl, ThumbnailUrl:data.ThumbnailUrl});
}

  return (

    <div width="100%" style={bodyStyle}>
      {isDownMD ? ( 
            <Row justify="center" style={MainRowSmall}>
              <Row style={{width:"100%", paddingRight:"5%"}}>
                  <Image src={imageUrlBuilder(bigNews.ThumbnailUrl)} preview={{src: imageUrlBuilder(bigNews.ImageUrl)}} height="100%" width="100%" style={{objectFit: "cover"}}/> 
                    {/* 848px */}
              </Row>    
              <Row style={{paddingTop:10}}>                  
                  <Title style={titleStyle} >{bigNews.Title}</Title>
              </Row>    
              <Row style={{paddingTop:10, width:"100%", paddingRight:"5%"}}>
                  <Paragraph style={{overflow: "auto", height:220}}>
                    <EditorRead text={bigNews.Text}/>
                  </Paragraph>    
              </Row>   
              <Divider />   
              <Row style={{paddingTop:20, width:"100%", paddingRight: "5%"}}>
                <div id="scrollableDiv" style={{ height: 400, overflow: 'auto'}}>
                  <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 2}
                    loader={
                      <Skeleton
                        avatar
                        paragraph={{
                          rows: 1,
                        }}
                        active
                      />
                    }
                    endMessage={<Divider plain>End of the news</Divider>}
                    scrollableTarget="scrollableDiv"
                    style={{backgroundColor:'white'}}
                  >
                    <List
                      dataSource={data}
                      renderItem={(item) => (
                        <List.Item key={item._id} >
                          <Link onClick={() => newsChoice(item)}>
                            <Row style={{ margin: 5, backgroundColor:"white"}}>
                              <Col>                  
                                <Image src={imageUrlBuilder(item.ThumbnailUrl)} preview={{src: imageUrlBuilder(item.ImageUrl)}} height="190px" width="100%" style={{padding: 10,objectFit: "cover"}}/>
                              </Col>
                              <Col>
                                <Row>
                                  <Title style={textStyle} >{item.Title}</Title>
                                </Row>
                                <Row>
                                  <Paragraph ellipsis={{rows: 3,}} height="100%"><EditorRead text={item.Text}/></Paragraph>
                                </Row>
                                <Row>
                                  <Paragraph style={{color:"red"}}>Read More</Paragraph>
                                </Row>
                              </Col>
                            </Row>
                          </Link>
                        </List.Item>
                      )}
                    />
                  </InfiniteScroll>
                </div>
              </Row>
            </Row>
          ):(  
            <Row justify="start" style={MainRow} gutter={[12, 8]}>
            <Col flex="55%">
                  <Image src={imageUrlBuilder(bigNews.ThumbnailUrl)} preview={{src: imageUrlBuilder(bigNews.ImageUrl)}} height="400px" width="100%" style={{objectFit: "cover"}}/> 
                  {/* 848px */}
                  <Title style={titleStyle} >{bigNews.Title}</Title>
                  <Paragraph style={{overflow: "auto", height:220}}>
                    <EditorRead text={bigNews.Text}/>
                  </Paragraph>
            </Col>      
            <Col flex="1 1 300px">
              <div id="scrollableDiv" style={{ height: 400, overflow: 'auto', marginRight: 50,}}>
                <InfiniteScroll
                  dataLength={data.length}
                  next={loadMoreData}
                  hasMore={data.length < 2}
                  loader={
                    <Skeleton
                      avatar
                      paragraph={{
                        rows: 1,
                      }}
                      active
                    />
                  }
                  endMessage={<Divider plain>End of the news</Divider>}
                  scrollableTarget="scrollableDiv"
                  style={{backgroundColor:'white'}}
                >
                  <List
                    dataSource={data}
                    renderItem={(item) => (
                      <List.Item key={item._id} >
                        <Link onClick={() => newsChoice(item)}>
                          <Row style={{ margin: 5, backgroundColor:"white"}}>
                            <Col flex="0 1 200px">                  
                              <Image src={imageUrlBuilder(item.ThumbnailUrl)} preview={{src: imageUrlBuilder(item.ImageUrl)}} height="190px" width="190px" style={{padding: 20,objectFit: "cover"}}/>
                            </Col>
                            <Col flex="1 1 100px">
                              <Row>
                                <Title style={textStyle} >{item.Title}</Title>
                              </Row>
                              <Row>
                                <Paragraph ellipsis={{rows: 3,}} height="100%"><EditorRead text={item.Text}/></Paragraph>
                              </Row>
                              <Row>
                                <Paragraph style={{color:"red"}}>Read More</Paragraph>
                              </Row>
                            </Col>
                          </Row>
                        </Link>
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </div>
            </Col>
          </Row>
      )}

    </div>
  )
}

export default News