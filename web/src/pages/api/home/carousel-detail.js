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
    if (method === "GET") {
      const { id } = req.query;
      let carousels = await CarouselModel.find(
        { _id: id },
        {
          Order: 0,
          ImageUrl: 0,
          HaveDetail: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        }
      ).exec();
      return res.status(200).json(carousels.sort((a, b) => a.Order - b.Order));
    } else if (method === "PUT") {
      const response = await update(req.body);
      return res.status(200).json(response);
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (err) {
    logger.error(`Api Carousel:${err}`);
    return res.status(500).json({ message: "Couldn't save", err: err });
  }
};
const directory = "home-detail-photo";
const update = async (data) => {
  const model = {};
  if (data.DetailTitle) model.DetailTitle = data.DetailTitle;
  if (data.SpotifyLink || data.SpotifyLink == "")
    model.SpotifyLink = data.SpotifyLink;
  if (data.YoutubeLink || data.YoutubeLink == "")
    model.YoutubeLink = data.YoutubeLink;
  if (data.ItunesLink || data.YoutubeLink == "")
    model.ItunesLink = data.ItunesLink;

  if (data.DetailImageUrl) {
    deleteImage(data._id, directory);
    model.DetailImageUrl = await saveImage(
      data.DetailImageUrl,
      data._id,
      directory
    );
  }

  let updatedEntry = await CarouselModel.findByIdAndUpdate(data._id, model, {
    new: true,
  });
  const res = { message: "Updated successful", data: updatedEntry };
  return res;
};

export default handler;
