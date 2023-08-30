import React from 'react'
import { Image } from 'antd';
import { List } from 'antd';
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import { useMediaQuery, useTheme } from "@mui/material";
import { Col, Row } from 'antd';


function ImageGallery({data}) {

  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div> 
       {isDownMD ? ( 
          <Image.PreviewGroup>
            <Row justify="center">
              <List size="large" pagination={{ positin:"bottom", align: "center", pageSize: 12 }} grid={{ xs: 1, sm: 2, md: 2, lg: 2}} dataSource={data} renderItem=
              {(item) =>( 
                

                <List.Item>                
                          <Image width={250} height={160} src={imageUrlBuilder(item.ThumbnailUrl)}  preview={{src: imageUrlBuilder(item.ImageUrl)}} />            
                </List.Item>
                          
              )}/> 
            </Row> 
        </Image.PreviewGroup>
          ):(  
            <Image.PreviewGroup>
            <List itemLayout="vertical" size="large" pagination={{ positin:"bottom", align: "center", pageSize: 12 }} grid={{ gutter: 18 ,column: 6 }}  dataSource={data} renderItem=
            {(item) =>( 
              <List.Item>                
                        <Image width={160} height={160} src={imageUrlBuilder(item.ThumbnailUrl)}  preview={{src: imageUrlBuilder(item.ImageUrl)}} />            
              </List.Item>           
            )}/> 
                     
          </Image.PreviewGroup>
        )}
        
        
    </div>
  )
}

export default ImageGallery