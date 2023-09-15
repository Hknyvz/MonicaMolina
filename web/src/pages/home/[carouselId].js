import logger from "@/helpers/logger";
import React from "react";
import Redirection from "@/components/Redirection";
import { createClient } from "@/pages/api/client";
import Header from "@/components/Header";

function CarouselDetail({ data }) {
  //   const router = useRouter();
  return (
    <div>
      <Header></Header>
      <Redirection data={data} />
    </div>
  );
}

export default CarouselDetail;

export const getServerSideProps = async (context) => {
  try {
    const client = createClient();
    const { carouselId } = context.params;
    const res = await fetch(
      `http://www.monicamolina.com/api/home/carousel-detail?id=${carouselId}`
    );
    const datalist = await res.json();
    const [data] = datalist;

    return { props: { data } };
  } catch (error) {
    logger.error(`AdminHome:${error}`);
  }
};
