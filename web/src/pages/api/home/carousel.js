import { deleteImage, saveImage } from "@/helpers/file";
import logger from "@/helpers/logger";
import dbConnect from "@/mongoose/dbConnect";
import CarouselModel from "@/mongoose/models/Carousel";
import { v4 as uuidv4 } from "uuid";

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
      const { admin } = req.query;
      let projection;
      if (admin) projection = {};
      else projection = { Order: 1, ImageUrl: 1, HaveDetail: 1 };

      let carousels = await CarouselModel.find({}, projection).exec();
      return res.status(200).json(carousels.sort((a, b) => a.Order - b.Order));
    } else if (method === "POST") {
      const newGuid = uuidv4();
      const response = await save(req.body, newGuid);

      return res.status(201).json(response);
    } else if (method === "PUT") {
      const response = await update(req.body);

      return res.status(200).json(response);
    } else if (method === "DELETE") {
      const { id } = req.query;
      const response = await remove(id);
      return res.status(204).json(response);
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (err) {
    logger.error(`Api Carousel:${err}`);
    return res.status(500).json({ message: "Couldn't save file", err: err });
  }
};

const directory = "home-photo";
const mobileImageDirectory = "home-mobile-photo";
const save = async (data, guid) => {
  const imageRelativePath = await saveImage(data.ImageUrl, guid, directory);
  const mobileImageRelativePath = await saveImage(
    data.MobileImageUrl,
    guid,
    mobileImageDirectory
  );
  const model = new CarouselModel({ _id: guid });
  model.Order = data.Order;
  model.ImageUrl = imageRelativePath;
  model.MobileImageUrl = mobileImageRelativePath;
  model.Link = data.Link;
  await model.save();
  const res = { message: "Saved successful", data: model };
  return res;
};

const update = async (data) => {
  const model = { Order: data.Order };
  if (data.ImageUrl) {
    deleteImage(data._id, directory);
    model.ImageUrl = await saveImage(data.ImageUrl, data._id, directory);
  }
  if (data.MobileImageUrl) {
    deleteImage(data._id, mobileImageDirectory);
    model.MobileImageUrl = await saveImage(
      data.MobileImageUrl,
      data._id,
      mobileImageDirectory
    );
  }
  let updatedEntry = await CarouselModel.findByIdAndUpdate(data._id, model, {
    new: true,
  });
  const res = { message: "Updated successful", data: updatedEntry };
  return res;
};

const remove = async (id) => {
  const res = await CarouselModel.findByIdAndDelete(id);
  deleteImage(id, directory);
  return res;
};

export default handler;
