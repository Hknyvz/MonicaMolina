import { deleteImage, saveImage } from "@/helpers/file";
import logger from "@/helpers/logger";
import dbConnect from "@/mongoose/dbConnect";
import CarouselModel from "@/mongoose/models/Carousel";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

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
const directory = "home-detail-photo";
const update = async (data) => {
  const model = {
    DetailTitle: data.DetailTitle,
    SPotifyLink: data.SpotifyLink,
    YoutubeLink: data.YoutubeLink,
    ItunesLink: data.ITunesLink,
  };
  if (data.DetailImageUrl) {
    deleteImage(data._id, directory);
    model.DetailImageUrl = await saveImage(
      data.DetailImageUrl,
      data._id,
      directory
    );
  }

  console.log(model, data._id);
  let updatedEntry = await CarouselModel.findByIdAndUpdate(data._id, model, {
    new: true,
  });
  const res = { message: "Updated successful", data: updatedEntry };
  return res;
};

export default handler;
