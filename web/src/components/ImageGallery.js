import React from 'react'
import { Image } from 'antd';
import { List } from 'antd';
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";


function ImageGallery({data}) {
  return (
    <div> 
        <Image.PreviewGroup>
          <List itemLayout="vertical" size="large" pagination={{ positin:"bottom", align: "center", pageSize: 12 }} grid={{ gutter: 18 ,column: 6 }}  dataSource={data} renderItem=
          {(item) =>( 
            <List.Item>                
                      <Image width={160} height={160} src={imageUrlBuilder(item.ThumbnailUrl)}  preview={{src: imageUrlBuilder(item.ImageUrl)}} />            
            </List.Item>           
          )}/> 
                   
        </Image.PreviewGroup>
    </div>
  )
}

export default ImageGallery