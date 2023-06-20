import React from 'react'
import { Image } from 'antd';
import { List } from 'antd';

const ImageList = [
  {ImageSrc:"images/Gallery-1.png"},
  {ImageSrc:"images/Gallery-2.png"},
  {ImageSrc:"images/Gallery-3.png"},
  {ImageSrc:"images/Gallery-4.png"},
  {ImageSrc:"images/Gallery-1.png"},
  {ImageSrc:"images/Gallery-2.png"},
  {ImageSrc:"images/Gallery-3.png"},
  {ImageSrc:"images/Gallery-4.png"},
  {ImageSrc:"images/Gallery-1.png"},
  {ImageSrc:"images/Gallery-2.png"},
  {ImageSrc:"images/Gallery-3.png"},
  {ImageSrc:"images/Gallery-4.png"},
  {ImageSrc:"images/Gallery-1.png"},
  {ImageSrc:"images/Gallery-2.png"},

  {ImageSrc:"images/Gallery-5.png"}

]


function ImageGallery() {
  return (
    <div> 
        <Image.PreviewGroup>
          <List itemLayout="vertical" size="large" pagination={{ positin:"bottom", align: "center", pageSize: 12 }} grid={{ gutter: 18 ,column: 6 }}  dataSource={ImageList} renderItem={(item) => (
            <List.Item>                
                      <Image width={160} height={160} src={item.ImageSrc}/>            
            </List.Item>           
          )}/>          
        </Image.PreviewGroup>
    </div>
  )
}

export default ImageGallery