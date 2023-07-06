import React from 'react'
import { List } from 'antd';


function VideoGallery({data}) {
  return (
    <div>
          <List itemLayout="vertical" size="large" pagination={{ position:"bottom", align: "center", pageSize: 8 }} grid={{ gutter: 18 ,column: 4 }}  dataSource={data} renderItem={(item) => (
            <List.Item>                
                       <iframe width="330" height="200" src={item.VideoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>            
            </List.Item>           
          )}/>          
    </div>
  )
}

export default VideoGallery

