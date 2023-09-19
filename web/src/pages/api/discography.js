import { deleteImage, saveImage } from "@/helpers/file";
import logger from "@/helpers/logger";
import dbConnect from "@/mongoose/dbConnect";
import DiscographyModel from "@/mongoose/models/Discography";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

const handler = async (req, res) => {
  await dbConnect("Monica");
  const method = req.method;
  try {
    if (method === "GET") {
      let carousels = await DiscographyModel.find().exec();
      return res.status(200).json(carousels.sort((a, b) => b.Year - a.Year));
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
    logger.error(`Api Discography:${err}`);
    return res.status(500).json({ message: "Couldn't update", err: err });
  }
};

const directory = "discography-photo";
const save = async (data, guid) => {
  const relativePath = await saveImage(data.ImageUrl, guid, directory);
  const model = new DiscographyModel({ _id: guid });

  model.Year = data.Year;
  model.ImageUrl = relativePath;
  model.Name = data.Name;
  model.SpotifyLink = data.SpotifyLink;
  model.YoutubeLink = data.YoutubeLink;
  model.ItunesLink = data.ItunesLink;

  await model.save();
  const res = { message: "Saved successful", data: model };
  return res;
};

const update = async (data) => {
  if (data.ImageUrl) {
    deleteImage(data._id, directory);
    await saveImage(data.ImageUrl, data._id, directory);
  }
  const model = {};
  if (data.Year) model.Year = data.Year;
  if (data.Name) model.Name = data.Name;
  if (data.SpotifyLink || data.SpotifyLink == "")
    model.SpotifyLink = data.SpotifyLink;
  if (data.YoutubeLink || data.YoutubeLink == "")
    model.YoutubeLink = data.YoutubeLink;
  if (data.ItunesLink || data.YoutubeLink == "")
    model.ItunesLink = data.ItunesLink;

  let updatedEntry = await DiscographyModel.findByIdAndUpdate(data._id, model, {
    new: true,
  });
  const res = { message: "Updated successful", data: updatedEntry };
  return res;
};

const remove = async (id) => {
  const res = await DiscographyModel.findByIdAndDelete(id);
  deleteImage(id, directory);
  return res;
};

export default handler;
