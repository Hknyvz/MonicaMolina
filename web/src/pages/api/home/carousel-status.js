import { deleteImage, saveImage } from "@/helpers/file";
import logger from "@/helpers/logger";
import dbConnect from "@/mongoose/dbConnect";
import CarouselModel from "@/mongoose/models/Carousel";

const handler = async (req, res) => {
  await dbConnect("Monica");
  const method = req.method;
  try {
    if (method === "PUT") {
      const response = await update(req.body);
      return res.status(200).json(response);
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (err) {
    logger.error(`Api Carousel:${err}`);
    return res.status(500).json({ message: "Couldn't save file", err: err });
  }
};
const update = async (data) => {
  let updatedEntry = await CarouselModel.findByIdAndUpdate(
    data._id,
    { HaveDetail: data.HaveDetail },
    {
      new: true,
    }
  );

  const res = { message: "Updated successful", data: updatedEntry };
  return res;
};

export default handler;
