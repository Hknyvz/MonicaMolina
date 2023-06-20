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

const save = async (data, guid) => {
  const relativePath = saveImage(data.ImageUrl, guid);
  const model = new CarouselModel({ _id: guid });
  model.Order = data.Order;
  model.ImageUrl = relativePath;
  model.ImageText = data.ImageText;
  await model.save();
  const res = { message: "Saved successful", data: model };
  return res;
};

const update = async (data) => {
  const model = { Order: data.Order, ImageText: data.ImageText };
  let updatedEntry = await CarouselModel.findByIdAndUpdate(data.Id, model, {
    new: true,
  });
  const res = { message: "Updated successful", data: updatedEntry };
  return res;
};

const remove = async (id) => {
  const res = await CarouselModel.findByIdAndDelete(id);
  deleteImage(id);
  return res;
};

const handler = async (req, res) => {
  await dbConnect("Carousel");
  const method = req.method;
  try {
    if (method === "GET") {
      let carousels = await CarouselModel.find();
      return res.status(200).json(carousels);
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

export default handler;
