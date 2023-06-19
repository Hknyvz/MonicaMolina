import React from 'react'
import { Image } from 'antd';

function ImageGallery() {
  return (
    <> 
        <Image.PreviewGroup>
            <Image width={160} height={160}  src="images/Gallery-1.png" />
            <Image width={160} height={160}  src="images/Gallery-2.png" />
            <Image width={160} height={160}  src="images/Gallery-3.png" />
            <Image width={160} height={160}  src="images/Gallery-4.png" />
            <Image width={160} height={160}  src="images/Gallery-5.png" />

            <iframe width="350" height="250" src="https://www.youtube.com/embed/kJxuPL0EEPA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

        </Image.PreviewGroup>
    </>
  )
}

export default ImageGallery