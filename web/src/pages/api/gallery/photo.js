import { deleteImage, saveImage } from "@/helpers/file";
import logger from "@/helpers/logger";
import dbConnect from "@/mongoose/dbConnect";
import GalleryPhotoModel from "@/mongoose/models/GalleryPhoto";
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
      let galleryPhoto = await GalleryPhotoModel.find().exec();
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

const directory = "gallery-photo";
const thumnailDirectory = "thumnail-gallery-photo";
const save = async (data, guid) => {
  const relativePath = await saveImage(data.ImageUrl, guid, directory);
  const thumbnailRelativePath = await saveImage(
    data.ThumbnailUrl,
    guid,
    thumnailDirectory
  );
  const model = new GalleryPhotoModel({ _id: guid });
  model.Order = data.Order;
  model.ImageUrl = relativePath;
  model.ThumbnailUrl = thumbnailRelativePath;
  await model.save();
  const res = { message: "Saved successful", data: model };
  return res;
};

const update = async (data) => {
  if (data.ImageUrl) {
    deleteImage(data.Id, directory);
    await saveImage(data.ImageUrl, data.Id, directory);
  }
  if (data.ThumbnailUrl) {
    deleteImage(data.Id, thumnailDirectory);
    await saveImage(data.ThumbnailUrl, data.Id, thumnailDirectory);
  }
  const model = { Order: data.Order };
  let updatedEntry = await GalleryPhotoModel.findByIdAndUpdate(data.Id, model, {
    new: true,
  });
  const res = { message: "Updated successful", data: updatedEntry };
  return res;
};

const remove = async (id) => {
  const res = await GalleryPhotoModel.findByIdAndDelete(id);
  deleteImage(id, directory);
  deleteImage(id, thumnailDirectory);
  return res;
};

export default handler;
