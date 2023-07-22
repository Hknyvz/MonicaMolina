import logger from "@/helpers/logger";
import { useRouter } from "next/router";
import React from "react";
import Redirection from "@/components/Redirection"

function CarouselDetail({ data }) {
  //   const router = useRouter();
  return (
    <div>
      <p style={{color: "black"}}> Post: {data} </p>
      <p style={{color: "black"}}> Title: {data.DetailTitle}</p>
      {/* <Redirection data={data}/> */}
    </div>
  );
}

export default CarouselDetail;

export const getServerSideProps = async (context) => {
  try {
    
    const { carouselId } = context.params;
    const data = carouselId;
    return { props: { data } };
  } catch (error) {
    logger.error(`AdminHome:${error}`);
  }
};

// export const getServerSideProps = async () => {
//   try {
//     const client = createClient();
//     const res = await client.get("/home/carousel");
//     const data = res.data;
//     return { props: { data } };
//   } catch (error) {
//     logger.error(`AdminHome:${error}`);
//   }
// };