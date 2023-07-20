import logger from "@/helpers/logger";
import { useRouter } from "next/router";
import React from "react";

function CarouselDetail({ data }) {
  //   const router = useRouter();
  return <p>Post: {data}</p>;
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
