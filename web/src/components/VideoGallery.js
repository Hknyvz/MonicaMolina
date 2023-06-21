import React from 'react'
import { List } from 'antd';

const VideoList = [
    {Embed:"https://www.youtube.com/embed/kJxuPL0EEPA"},
    {Embed:"https://www.youtube.com/embed/N9U-vFMNPvw"},
    {Embed:"https://www.youtube.com/embed/5b6bxMyiXyw"},
    {Embed:"https://www.youtube.com/embed/_4gmrs_5ncU"},
    {Embed:"https://www.youtube.com/embed/nY4wtUayQJ0"},
    {Embed:"https://www.youtube.com/embed/ksFlSvO9yS8"},
    {Embed:"https://www.youtube.com/embed/yl5tSno_hWI"},
    {Embed:"https://www.youtube.com/embed/I9LxKbIXoBQ"},
    {Embed:"https://www.youtube.com/embed/7U0vGos0Mds"},
  
  ]
function VideoGallery() {
  return (
    <div>
          <List itemLayout="vertical" size="large" pagination={{ positin:"bottom", align: "center", pageSize: 8 }} grid={{ gutter: 18 ,column: 4 }}  dataSource={VideoList} renderItem={(item) => (
            <List.Item>                
                       <iframe width="330" height="200" src={item.Embed} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>            
            </List.Item>           
          )}/>          
    </div>
  )
}

export default VideoGallery