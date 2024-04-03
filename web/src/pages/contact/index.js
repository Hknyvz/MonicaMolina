import React from "react";
import Contact from "src/components/Contact.js";

function index() {
  return (
    <div>
      <Contact />
    </div>
  );
}

export default index;

index.layout = "web";

export const getServerSideProps = async () => {
  try {
    const client = createClient();
    const res = await client.get("/home/carousel");
    const data = res.data;
    return { props: { data } };
  } catch (error) {
    logger.error(`AdminHome:${error}`);
  }
};
