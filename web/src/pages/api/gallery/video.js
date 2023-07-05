import logger from "@/helpers/logger";
import dbConnect from "@/mongoose/dbConnect";
import GalleryVideoModel from "@/mongoose/models/GalleryVideo";
import { v4 as uuidv4 } from "uuid";

const handler = async (req, res) => {
  await dbConnect("Monica");
  const method = req.method;
  try {
    if (method === "GET") {
      let galleryPhoto = await GalleryVideoModel.find().exec();
      return res
        .status(200)
        .json(galleryPhoto.sort((a, b) => a.Order - b.Order));
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
    logger.error(`Api GalleryPhoto:${err}`);
    return res.status(500).json({ message: "Couldn't save file", err: err });
  }
};

const save = async (data, guid) => {
  const model = new GalleryVideoModel({ _id: guid });
  model.Order = data.Order;
  model.VideoUrl = data.VideoUrl;
  await model.save();
  const res = { message: "Saved successful", data: model };
  return res;
};

const update = async (data) => {
  const model = { Order: data.Order, VideoUrl: data.VideoUrl };
  let updatedEntry = await GalleryVideoModel.findByIdAndUpdate(data.Id, model, {
    new: true,
  });
  const res = { message: "Updated successful", data: updatedEntry };
  return res;
};

const remove = async (id) => {
  const res = await GalleryVideoModel.findByIdAndDelete(id);
  return res;
};

export default handler;
