import React from 'react'
import Header from 'src/components/Header.js'
import MainCarousel from 'src/components/MainCarousel.js'

const contentStyle = {
  width: "100%",
  height: "100%",
};

function index() {
  return (
      <div style={contentStyle}>
              <MainCarousel/>
      </div>
  )
}

export default index

index.layout = "web"