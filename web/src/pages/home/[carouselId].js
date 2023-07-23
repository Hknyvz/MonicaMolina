import logger from "@/helpers/logger";
import React from "react";
import Redirection from "@/components/Redirection"
import { createClient } from "@/pages/api/client";
import Header from "@/components/Header"

function CarouselDetail({ data }) {
  //   const router = useRouter();
  return (
    <div>
      <Header></Header>
      <Redirection data={data}/>
    </div>
  );
}

export default CarouselDetail;

export const getServerSideProps = async (context) => {
  try {
    
    const client = createClient();
    const { carouselId } = context.params;
    const res = await client.get(`home/carousel-detail?id=${carouselId}`);
    const datalist = res.data;
    const [data] = datalist;

    return { props: { data } };
  } catch (error) {
    logger.error(`AdminHome:${error}`);
  }
};