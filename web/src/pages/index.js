import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import MainCarousel from 'src/components/MainCarousel.js'


const contentStyle = {
  width: "100%",
  height: "100%",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Allison&family=Montserrat:wght@100&display=swap" rel="stylesheet"/>
      </Head>
      
      <div style={contentStyle}>
              <MainCarousel/>
      </div>
    </>
  );
}

Home.layout = "web";
