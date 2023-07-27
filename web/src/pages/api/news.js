import logger from "@/helpers/logger";
import dbConnect from "@/mongoose/dbConnect";
import NewsModel from "@/mongoose/models/News";
import { v4 as uuidv4 } from "uuid";
import { deleteImage, saveImage } from "@/helpers/file";

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
      let news = await NewsModel.find().exec();
      return res.status(200).json(news);
    } else if (method === "POST") {
      const newGuid = uuidv4();
      console.log(res.body);
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
    logger.error(`Api News:${err}`);
    return res.status(500).json({ message: "Couldn't update", err: err });
  }
};

const directory = "news-photo";
const save = async (data, guid) => {
  const relativePath = await saveImage(data.ImageUrl, guid, directory);
  const model = new NewsModel({ _id: guid });
  model.Title = data.Title;
  model.ImageUrl = relativePath;
  model.Text = data.Text;
  await model.save();
  const res = { message: "Saved successful", data: model };
  return res;
};

const update = async (data) => {
  if (data.ImageUrl) {
    deleteImage(data._id, directory);
    await saveImage(data.ImageUrl, data._id, directory);
  }
  const model = { Title: data.Title, Text: data.Text };
  let updatedEntry = await DiscographyModel.findByIdAndUpdate(data._id, model, {
    new: true,
  });
  const res = { message: "Updated successful", data: updatedEntry };
  return res;
};

const remove = async (id) => {
  const res = await NewsModel.findByIdAndDelete(id);
  deleteImage(id, directory);
  return res;
};

export default handler;
